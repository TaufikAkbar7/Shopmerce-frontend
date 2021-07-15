import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  productListReducer,
  categoryProductListReducer,
  popularProductListReducer,
  detailProductReducer,
  filterProductReducer,
  getAllProductDiscoveryReducer,
} from "./reducers/productReducers";
import { loginReducer, registerReducer } from "./reducers/userReducers";
import { searchReducer } from "./reducers/searchReducers";
import {
  orderCreateReducer,
  detailOrderReducer,
  listOrderReducer,
  payOrderReducer,
} from "./reducers/orderReducers";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shipping")
      ? JSON.parse(localStorage.getItem("shipping"))
      : {},
  },
  userLogin: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  popularProductList: popularProductListReducer,
  categoryList: categoryProductListReducer,
  detailProduct: detailProductReducer,
  searchProduct: searchReducer,
  filterProduct: filterProductReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  orderCreate: orderCreateReducer,
  orderDetail: detailOrderReducer,
  orderList: listOrderReducer,
  productDiscoveryList: getAllProductDiscoveryReducer,
  orderPay: payOrderReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
