import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("http://localhost:4000/users/login", {
      email,
      password,
    });
    console.log(data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("http://localhost:4000/users/register", {
      name,
      email,
      password,
    });
    console.log(data);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("cartItems");
  dispatch({ type: USER_LOGOUT_SUCCESS });
  // document.location.href = '/login';
};
