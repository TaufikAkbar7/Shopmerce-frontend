import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CustomNavbar } from "../../components";
import Cart from "../Cart";
import DetailProduct from "../DetailProduct";
import Home from "../Home";
import Search from "../Search";
import Shipping from "../shipping";
import Placeorder from "../PlaceOrder";
import OrderScreen from "../Order";
import OrderHistory from "../OrderHistory";

const MainApp = () => {
  

  return (
    <div>
      <Router>
        <CustomNavbar />
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/detail-product/:id" component={DetailProduct}/>
          <Route path="/cart" component={Cart} exact/>
          <Route path="/search/name/:name?" component={Search} exact/>
          <Route path="/search/category/:category" component={Search} exact/>
          <Route path="/shipping" component={Shipping}/>
          <Route path="/placeorder" component={Placeorder}/>
          <Route path="/order/:id" component={OrderScreen}/>
          <Route path="/order-history" component={OrderHistory}/>
          <Route
            path="/search/category/:category/name/:name"
            component={Search}
            exact
          />
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/order/:order/page/:page/perPage/:perPage"
            component={Search}
            exact
          />
        </Switch>
      </Router>
    </div>
  );
};

export default MainApp;
