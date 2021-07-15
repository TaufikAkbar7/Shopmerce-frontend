import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addCartProduct = (id, qty) => async (dispatch, getState) => {
  const {
    data: { data },
  } = await axios.get(`http://localhost:4000/v1/product/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.harga,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCartProduct = (idProduct) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: idProduct });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shipping", JSON.stringify(data));
};