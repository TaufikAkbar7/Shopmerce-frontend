import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ORDER_PAY_RESET } from "../../config/redux/constants/orderConstants";
import { CheckoutBar, Loading } from "../../components";
// import { payOrder } from "src/config/redux/actions/orderActions";
import { formatRupiah } from "../../config/functional";
import "./style.css";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(true);
  const [detailOrder, setDetailOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const orderPay = useSelector((state) => state.orderPay);
  const { error: errorPay, loading: loadingPay, success } = orderPay;
  const btnMidtrans = document.getElementById("pay-button");
  const clientKey = "SB-Mid-client-HOHTtnGgzHtEE4eH";

  const dispatch = useDispatch();
  toast.configure();

  const JmlHargaProduct = (item) => {
    const jml = item.qty * item.price;
    const hasilConvert = formatRupiah(jml);
    return hasilConvert;
  };

  const payOrder = async () => {
    try {
      const { data } = await axios.put(`http://localhost:4000/order/pay/${orderId}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderDetail = async () => {
    try {
      const {
        data: { order },
      } = await axios.get(`http://localhost:4000/order/${orderId}`);
      if (order) {
        setDetailOrder(order);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMidtrans = async () => {
    const { data } = await axios.post(
      `http://localhost:4000/order/midtrans/${orderId}`
    );
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);

    if (addMidtrans && btnMidtrans) {
      btnMidtrans.addEventListener("click", () => {
        window.snap.pay(`${data.transactionToken}`, {
          onSuccess: function (result) {
            toast.success(`Paid Success`, {
              position: toast.POSITION.TOP_CENTER,
              draggable: true,
              autoClose: 1000,
              hideProgressBar: true,
            });
            payOrder();
            console.log(result);
          },
          onPending: function (result) {
            toast.info(`Paid in procces`, {
              position: toast.POSITION.TOP_CENTER,
              draggable: true,
              autoClose: 1000,
              hideProgressBar: true,
            });
            payOrder();
            console.log(result);
          },
          onError: function (result) {
            toast.error(`Not Paid`, {
              position: toast.POSITION.TOP_CENTER,
              draggable: true,
              autoClose: 1000,
              hideProgressBar: true,
            });
            console.log(result);
          },
        });
      });
    }
  };

  useEffect(() => {
    //logic apakah user udah pay order atau belom
    if (
      !detailOrder ||
      success ||
      (detailOrder && detailOrder._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
    } else {
      if (!detailOrder.isPaid) {
        if (!window.midtrans) {
          addMidtrans();
        } else {
          setSdkReady(true);
        }
      }
    }
    getOrderDetail();
  }, [dispatch, orderId, btnMidtrans, success]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : detailOrder ? (
        <div>
          <CheckoutBar step1 step2 step3 step4 />
          <Container>
            <Row>
              <Col md={8}>
                <ul>
                  <li>
                    <Col className="custom" style={{ padding: "1rem" }}>
                      <h4 className="text-center">Shipping</h4>
                      <p style={{ paddingLeft: '1.5rem' }}>
                        <strong>Name:</strong>{" "}
                        {detailOrder.shippingAddress.fullName} <br />
                        <strong>Address: </strong>{" "}
                        {detailOrder.shippingAddress.address},{" "}
                        {detailOrder.shippingAddress.phone},{" "}
                        {detailOrder.shippingAddress.city},{" "}
                        {detailOrder.shippingAddress.postal_code},
                      </p>
                    </Col>
                  </li>
                  <li className="mt-4">
                    <Col className="custom">
                      <h4 className="text-center" style={{ paddingTop: "15px" }}>Order Items</h4>
                      <ul>
                        {detailOrder.orderItems.map((item) => (
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
                                {item.qty} x {formatRupiah(item.price)} = Rp. 
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
                    <Row>
                      <Col md={6} style={{ paddingTop: "1.5rem" }}>
                        <p> Order ID</p>
                        <p> Items</p>
                        <p> Tax</p>
                        <strong> Order Total</strong>
                      </Col>
                      <Col md={6}>
                        <p>{orderId}</p>
                        <p>Rp. {formatRupiah(detailOrder.itemsPrice)}</p>
                        <p>Rp. {formatRupiah(detailOrder.taxPrice)}</p>
                        <strong>Rp. {formatRupiah(detailOrder.totalPrice)}</strong>
                      </Col>
                    </Row>
                  </ul>
                  {!detailOrder.isPaid && (
                    <div>
                      {!sdkReady ? (
                        <Loading />
                      ) : (
                        <div>
                          {errorPay && <Alert>{errorPay}</Alert>}
                          {loadingPay && <Loading />}
                          <Button id="pay-button" style={{ width: "100%" }}>
                            Pay
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default OrderScreen;
