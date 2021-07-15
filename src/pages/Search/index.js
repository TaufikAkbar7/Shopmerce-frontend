import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomCard, Loading, Text } from "../../components";
import { Link, useParams } from "react-router-dom";
import {
  listProducts,
  getListCategoryProduct,
} from "../../config/redux/actions/productActions";
import { prices, orders } from "../../utils/data.js";
import { useDispatch, useSelector } from "react-redux";


const Search = () => {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    order = "newest",
    page = 1,
    perPage = 10
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;
  const categoryList = useSelector((state) => state.categoryList);
  const { categoryProducts } = categoryList;
  

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
    dispatch(getListCategoryProduct());
  }, [dispatch, name, category, min, max, order, page, perPage]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    const sortPage = filter.page || page;
    const sortPerPage = filter.perPage || perPage;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/page/${sortPage}/perPage/${sortPerPage}`;
  };

  return (
    <div>
      {loading ? (
        <Container>
          <Row className="mt-3 justify-content-center" style={{paddingTop: '15rem'}}>
            <Col xs={1}>
              <Loading />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col xs={2}>
              <div>
                <Text
                  name="All Categories"
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                />
                <ul>
                  {categoryProducts.map((item, i) => (
                    <li key={i}>
                      <Link to={getFilterUrl({ category: item })}>{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Text
                  name="Order"
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                />
                <ul>
                  {orders.map((item, i) => (
                    <li key={i}>
                      <Link to={getFilterUrl({ order: item.value })}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col>
              {products.length === 0 && <h1 className="text-center">No Product</h1>}

              <CustomCard
                products={products}
                md={3}
                center="justify-content-center"
              />

            </Col>
            <Col xs={2}>
              <div>
                <Text
                  name="relevance"
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                />
                <ul>
                  {prices.map((item, i) => (
                    <li key={i}>
                      <Link to={getFilterUrl({ min: item.min, max: item.max })}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Search;
