import axios from "axios";
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DISCOVERY_LIST_REQUEST,
  PRODUCT_DISCOVERY_LIST_SUCCESS
} from "../constants/productConstants";

export const listProducts = ({ 
  name = "",
  category = "",
  order = "",
  min = 0,
  max = 0, 
  page = 1,
  perPage = 0
  }) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  
  try {
    const {
      data: { data },
    } = await axios.get(`http://localhost:4000/v1/products?name=${name}&category=${category}&min=${min}&max=${max}&order=${order}&page=${page}&perPage=${perPage}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getDetailProduct = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST });
  try {
    const {
      data: { data },
    } = await axios.get(`http://localhost:4000/v1/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getListCategoryProduct = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get("http://localhost:4000/v1/product/categories");
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllDiscovery = () => async (dispatch) => {
  dispatch({ type: PRODUCT_DISCOVERY_LIST_REQUEST });
  try{
    const { data: { products } } = await axios.get(`http://localhost:4000/discovery/`);
    dispatch({ type: PRODUCT_DISCOVERY_LIST_SUCCESS, payload: products });
    // console.log(data);
  }catch(error){
    console.log(error);
  }
}