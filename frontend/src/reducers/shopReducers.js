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
  SHOP_DELETE_REQUEST,
  SHOP_DELETE_SUCCESS,
  SHOP_DELETE_FAIL,
} from '../constants/shopConstants';

function shopListReducer(state = { shops: [] }, action) {
  switch (action.type) {
    case SHOP_LIST_REQUEST:
      return { loading: true, shops: [] };
    case SHOP_LIST_SUCCESS:
      return { loading: false, shops: action.payload };
    case SHOP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function shopDetailsReducer(state = { shops: [] }, action) {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return { loading: true };
    case SHOP_DETAILS_SUCCESS:
      return { loading: false, shops: action.payload };
    case SHOP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function shopDeleteReducer(state = { shop: {} }, action) {
  switch (action.type) {
    case SHOP_DELETE_REQUEST:
      return { loading: true };
    case SHOP_DELETE_SUCCESS:
      return { loading: false, shop: action.payload, success: true };
    case SHOP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function shopSaveReducer(state = { shop: {} }, action) {
  switch (action.type) {
    case SHOP_SAVE_REQUEST:
      return { loading: true };
    case SHOP_SAVE_SUCCESS:
      return { loading: false, success: true, shop: action.payload };
    case SHOP_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export {
  shopListReducer,
  shopDetailsReducer,
  shopSaveReducer,
  shopDeleteReducer,
};
