import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_POPULAR_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_FILTER_LIST_REQUEST,
  PRODUCT_FILTER_LIST_SUCCESS,
  PRODUCT_DISCOVERY_LIST_REQUEST,
  PRODUCT_DISCOVERY_LIST_SUCCESS,
} from "../constants/productConstants";

const initialStateProduct = {
  loading: false,
  products: [],
};

const initialStateDetail = {
  loading: false,
  product: {},
};

const initialStateProductPopular = {
  popularProducts: [],
  loading: false,
};

const initialStateCategoryProduct = {
  categoryProducts: [],
  loading: false,
};

const initialStateFilterProduct = {
  page: 0,
  pages: 0,
  products: [],
};

export const productListReducer = (state = initialStateProduct, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const popularProductListReducer = (
  state = initialStateProductPopular,
  action
) => {
  switch (action.type) {
    case PRODUCT_POPULAR_SUCCESS:
      return {
        ...state,
        popularProducts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const filterProductReducer = (
  state = initialStateFilterProduct,
  action
) => {
  switch (action.type) {
    case PRODUCT_FILTER_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_FILTER_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    default:
      return state;
  }
};

export const categoryProductListReducer = (
  state = initialStateCategoryProduct,
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryProducts: action.payload,
      };
    default:
      return state;
  }
};

export const detailProductReducer = (state = initialStateDetail, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getAllProductDiscoveryReducer = (state = initialStateProduct, action) => {
  switch (action.type) {
    case PRODUCT_DISCOVERY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_DISCOVERY_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    default:
      return state;
  }
};
