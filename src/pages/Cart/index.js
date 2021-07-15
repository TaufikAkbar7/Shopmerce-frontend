import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { CustomBtn, Text } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { removeCartProduct } from "../../config/redux/actions/cartActions";
import { Table } from "react-bootstrap";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import "./style.css";
import { useHistory } from "react-router";
import { formatRupiah } from "../../config/functional";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // const totalHarga = "$" +
  toast.configure();

  const totalHarga = (cartItems) => {
    let hasil = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    let hasilConvert = formatRupiah(hasil);
    return hasilConvert;
  };

  const JmlHargaProduct = (item) => {
    let hasil = cartItems.reduce(() => item.price * item.qty, 0);
    let hasilConvert = formatRupiah(hasil);
    return hasilConvert;
  };

  const handleDelete = (idProduct, name) => {
    toast.error(`Delete Product ${name}!`, {
      position: toast.POSITION.TOP_CENTER,
      draggable: true,
      autoClose: 3000,
      hideProgressBar: true,
    });
    dispatch(removeCartProduct(idProduct));
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <Col>
          <h3>Keranjang</h3>
          <Alert variant="dark">Keranjang kosong!</Alert>
        </Col>
      ) : (
        <div>
          <Container>
            <Text
              style={{
                marginLeft: "30rem",
                fontSize: "3rem",
                fontWeight: "bold",
              }}
              name="Your Bag"
            />
            <Row className="mt-4">
              <Col>
                <Table borderless>
                  <thead className="thead-custom">
                    <tr className="text-center">
                      <th>PRODUCT</th>
                      <th>PRICE</th>
                      <th>QUANTITY</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.name} className="tr-custom">
                        <td>
                          <IoMdCloseCircle
                            className="circle"
                            onClick={() =>
                              handleDelete(item.product, item.name)
                            }
                          />
                          <img
                            className="img-small ml-5"
                            src={`http://localhost:4000/${item.image}`}
                            alt={item.image}
                          />
                          <span className="text ml-3">{item.name}</span>
                        </td>
                        <td
                          className="text-center"
                          style={{ paddingTop: "45px" }}
                        >
                          Rp. {formatRupiah(item.price)}
                        </td>
                        <td
                          className="text-center"
                          style={{ paddingTop: "45px" }}
                        >
                          <span>{item.qty}</span>
                        </td>
                        <td
                          className="text-center"
                          style={{ paddingTop: "45px" }}
                        >
                          Rp. {JmlHargaProduct(item)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col md={{ span: 4, offset: 8 }}>
                <Row style={{ background: "#f6f6f6", padding: "10px" }}>
                  <Col md={4}>
                    <strong>Total</strong>
                  </Col>
                  <Col md={5}>
                    <strong>Rp. {totalHarga(cartItems)}</strong>
                  </Col>
                </Row>
                <br />
                <CustomBtn
                  name="CHECKOUT"
                  product={cartItems}
                  onClick={() => history.push("/shipping")}
                  variant="dark"
                  style={{ fontWeight: "bold" }}
                />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Cart;
