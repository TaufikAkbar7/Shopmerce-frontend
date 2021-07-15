import React, { useEffect } from "react";
import { createOrder } from "../../config/redux/actions/orderActions";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_CREATE_RESET } from "../../config/redux/constants/orderConstants";
import { CheckoutBar } from "../../components";
import { formatRupiah } from "../../config/functional";
import "./style.css";

const PlaceOrder = () => {
  const history = useHistory();
  const orderItem = useSelector((state) => state.orderCreate);
  const { order, success } = orderItem;
  const cart = useSelector((state) => state.cart);
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  const JmlHargaProduct = (item) => {
    const jml = item.qty * item.price;
    const hasilConvert = formatRupiah(jml);
    return hasilConvert;
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    dispatch({ type: ORDER_CREATE_RESET });
  }, [dispatch, order, history, success]);

  return (
    <div>
      <CheckoutBar step1 step2 step3 />
      <Container>
        <Row>
          <Col md={8}>
            <ul>
              <li>
                <Col className="custom mt-2" style={{ padding: "1rem" }}>
                  <h4 className="text-center">Shipping</h4>
                  <p style={{ paddingLeft: '1.5rem' }}>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Address: </strong> {cart.shippingAddress.address},{" "}
                    {cart.shippingAddress.phone}, {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postal_code},{" "}
                  </p>
                </Col>
              </li>
              <li className="mt-4">
                <Col className="custom">
                  <h4 className="text-center" style={{ paddingTop: "15px" }}>
                    Order Items
                  </h4>
                  <ul>
                    {cart.cartItems.map((item) => (
                      <li key={item.name}>
                        <Row>
                          <Col md={3}>
                            <img
                              alt="small"
                              src={`http://localhost:4000/${item.image}`}
                              className="small-pic"
                            />
                          </Col>
                          <Col md={4}>
                            <Link to={`/detail-product/${item._id}`}></Link>
                            {item.name}
                          </Col>
                          <Col>
                            {item.qty} x {formatRupiah(item.price)} = Rp.{" "}
                            {JmlHargaProduct(item)}
                          </Col>
                        </Row>
                      </li>
                    ))}
                  </ul>
                </Col>
              </li>
            </ul>
          </Col>
          <Col>
            <Card className="custom">
              <ul>
                <li className="text-center mt-3">
                  <h4>Order Summary</h4>
                </li>
                <li className="mt-4">
                  <div className="row-custom">
                    <div>Items</div>
                    <div>Rp. {formatRupiah(cart.itemsPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className="row-custom">
                    <div>Tax</div>
                    <div>Rp. {formatRupiah(cart.taxPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className="row-custom">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>Rp. {formatRupiah(cart.totalPrice)}</strong>
                    </div>
                  </div>
                </li>
              </ul>
              <Button
                className="mt-4"
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
              >
                PlaceOrder
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlaceOrder;
