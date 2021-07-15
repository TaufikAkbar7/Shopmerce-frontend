import React, { useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CustomCard, Title, Loading } from "../../components";
import {
  getAllDiscovery,
  listProducts,
} from "../../config/redux/actions/productActions";


const Home = () => {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    order = "newest",
    page = 1,
    perPage = 16
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;
  const productDiscoveryList = useSelector(
    (state) => state.productDiscoveryList
  );
  const { products: productsDiscovery, loading: loadingProduct } = productDiscoveryList;
 
  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        order,
        page,
        perPage
      })
    );
    dispatch(getAllDiscovery());
  }, [dispatch, name, category, min, max, order, page, perPage]);

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
      ) : loadingProduct ? (
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
      ) : (
        <Container>
          <Carousel className="mt-4">
            {productsDiscovery.map((item) => (
              <Carousel.Item key={item.name}>
                <img
                  className="d-block w-100 img"
                  src={`http://localhost:4000/${item.image}`}
                  alt={item.name}
                  style={{ height: "500px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Container>
            <div className="mt-5">
              <Title text="Our Products!" />
            </div>

            <CustomCard products={products} md={4}/>
          </Container>
        </Container>
      )}
    </div>
  );
};

export default Home;
