import axios from "axios";
import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_RESET_REQUEST, USER_RESET_SUCCESS,
  USER_RESET_FAIL
} from "../constants/userConstants";

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data });
  }
}
const resetUser = (email) => async (dispatch) => {
  dispatch({ type: USER_RESET_REQUEST, payload: { email } });
  try {
    const { data } = await Axios.post("/api/users/resetuser", { email });
    dispatch({ type: USER_RESET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_RESET_FAIL, payload: error.response.data });
  }
}
const registeract = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    //Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}

const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get(
      '/api/users'
    );
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.message });
  }
};

const saveUser = (user) => async (dispatch, getState) => {
  try {
      console.log("User Saving...")
   // dispatch({ type: SHOP_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!user._id) {
      const { data } = await Axios.post('/api/users', user, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: USER_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/users/' + user._id,
        user,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: USER_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: USER_SAVE_FAIL, payload: error.message });
  }
};

const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const { data } = await axios.delete('/api/users/' + userId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: error.message });
  }
};

export { resetUser, signin, registeract, logout, update, listUsers, deleteUser, saveUser };