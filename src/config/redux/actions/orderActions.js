import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  const {
    userLogin: { user },
  } = getState();
  try {
    const { data } = await axios.post(
      "http://localhost:4000/order/createOrder",
      order,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.saveOrder });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userLogin: { user },
  } = getState();
  try {
    const { data: { order } } = await axios.get(`http://localhost:4000/order/${orderId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: order });
    // console.log(order);
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userLogin: { user },
  } = getState();
  try {
    const { data } = await axios.get(`http://localhost:4000/order/mine`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data.order });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: ORDER_MINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST });
  const {
    userLogin: { user },
  } = getState();
  try {
    const { data } = axios.put(`http://localhost:4000/order/pay/${orderId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data.updateOrder });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(orderId);
  }
};
