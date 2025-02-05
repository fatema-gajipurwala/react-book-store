import {
  SHOP_LIST_REQUEST,
  SHOP_LIST_SUCCESS,
  SHOP_LIST_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_DETAILS_FAIL,
  SHOP_SAVE_REQUEST,
  SHOP_SAVE_SUCCESS,
  SHOP_SAVE_FAIL,
  SHOP_DELETE_SUCCESS,
  SHOP_DELETE_FAIL,
  SHOP_DELETE_REQUEST,
} from '../constants/shopConstants';
import axios from 'axios';
import Axios from 'axios';

const listShops = (
  category = '',
  searchKeyword = '',
  sortOrder = ''
) => async (dispatch) => {
  try {
    dispatch({ type: SHOP_LIST_REQUEST });
    const { data } = await axios.get(
      '/api/shops?category=' +
        category +
        '&searchKeyword=' +
        searchKeyword +
        '&sortOrder=' +
        sortOrder
    );
    dispatch({ type: SHOP_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHOP_LIST_FAIL, payload: error.message });
  }
};

const saveShop = (shop) => async (dispatch, getState) => {
  try {
      console.log("Shop Saving...")
    dispatch({ type: SHOP_SAVE_REQUEST});
    const {
      userSignin: { userInfo },
    } = getState();
    if (!shop._id) {
      const { data } = await Axios.post('/api/shops', shop, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: SHOP_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/shops/' + shop._id,
        shop,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: SHOP_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SHOP_SAVE_FAIL, payload: error.message });
  }
};

const detailsShop = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: SHOP_DETAILS_REQUEST, payload: shopId });
    const { data } = await axios.get('/api/shops/' + shopId);
    dispatch({ type: SHOP_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHOP_DETAILS_FAIL, payload: error.message });
  }
};

const deleteShop = (shopId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: SHOP_DELETE_REQUEST, payload: shopId });
    const { data } = await axios.delete('/api/shops/' + shopId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: SHOP_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: SHOP_DELETE_FAIL, payload: error.message });
  }
};

export {
  listShops,
  detailsShop,
  saveShop,
  deleteShop,
};
