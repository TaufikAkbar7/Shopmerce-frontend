import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

const initialStateUser = {
  loading: false,
  user: {},
  error: ''
};

export const loginReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, ...state, user: action.payload,  };
    case USER_LOGOUT_SUCCESS:
      return {};
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
};

export const registerReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload, };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
