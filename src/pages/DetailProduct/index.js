import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Text, CustomBtn, Loading } from "../../components";
import { getDetailProduct } from "../../config/redux/actions/productActions";
import { toast } from "react-toastify";
import { addCartProduct } from "../../config/redux/actions/cartActions";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { formatRupiah } from "../../config/functional";

const DetailProduct = (props) => {
  const dispatch = useDispatch();
  const detailProduct = useSelector((state) => state.detailProduct);
  const { product, loading } = detailProduct;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const id = props.match.params.id;
  const [qty, setQty] = useState(1);
  // const [isLoading, setIsLoading] = useState(true)
  toast.configure();

  useEffect(() => {
    dispatch(getDetailProduct(id));
  }, [id, dispatch]);

  const handleOnClick = (name) => {
    if (user) {
      toast.success(`Added ${name} to Cart!`, {
        position: toast.POSITION.TOP_CENTER,
        draggable: true,
        autoClose: 3000,
        hideProgressBar: true,
      });
      dispatch(addCartProduct(id, qty));
    } else {
      toast.error(`You must login!`, {
        position: toast.POSITION.TOP_CENTER,
        draggable: true,
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };
  const onMinus = () => {
    setQty(qty <= 1 ? 1 : qty - 1);
  };
  const onPlus = () => {
    setQty((qty) => (1 ? qty + 1 : 0));
  };

  console.log(product)

  return (
    <div>
      {loading ? (
        <Container>
          <Row
            className="justify-content-center"
            style={{ paddingTop: "15rem" }}
          >
            <Col xs={1}>
              <Loading />
            </Col>
          </Row>
        </Container>
      ) : product ? (
        <div>
          <Container>
            <Row className="mt-5">
              <Col>
                <img
                  src={`http://localhost:4000/${product.image}`}
                  alt="thubnail"
                  style={{
                    objectFit: "contain",
                    width: "450px",
                    height: "500px",
                    borderRadius: "15px",
                  }}
                />
              </Col>
              <Col style={{ fontFamily: "Open Sans, sans serif"}}>
                <Text
                  className="ml-1"
                  style={{ fontWeight: "500", letterSpacing: "1px" }}
                  name={product.kategori}
                />
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "40px",
                    letterSpacing: "1.5px",
                  }}
                  name={product.name}
                />
                <h5 style={{ fontWeight: "500", fontSize: "30px" }}>
                  {product.harga ? (
                    <p>Rp. {formatRupiah(product.harga)}</p>
                  ) : ( 
                    <p>Not Found!</p>
                  )}
                </h5>
                <Text style={{ marginTop: "20px" }} name="Description:" />
                <Text name={product.detail} style={{ letterSpacing: "1px" }} />
                <div className="mt-3">
                  <p>qty:</p>
                </div>
                <Row className="text-center">
                  <Col>
                    <FiMinusCircle
                      onClick={() => onMinus()}
                      style={{
                        cursor: "pointer",
                        fontSize: "25px",
                      }}
                    />
                  </Col>
                  <Col sm={1} style={{ paddingTop: '17px'  }}>
                    <p>{qty}</p>
                  </Col>
                  <Col>
                    <FiPlusCircle
                      onClick={() => onPlus()}
                      style={{
                        cursor: "pointer",
                        fontSize: "25px",
                      }}
                    />
                  </Col>
                </Row>
                <div style={{position: "relative", left: "38%", display: "inline-block"}}>
                <CustomBtn
                  name="+ CART"
                  onClick={handleOnClick}
                  product={product}
                  variant="dark"
                  style={{ fontWeight: "bold", padding: '5px 45px 5px 40px' }}
                />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <p>error</p>
      )}
    </div>
  );
};

export default DetailProduct;
