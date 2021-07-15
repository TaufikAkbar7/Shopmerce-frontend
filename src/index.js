import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import { Provider } from "react-redux";
import store from "./config/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
