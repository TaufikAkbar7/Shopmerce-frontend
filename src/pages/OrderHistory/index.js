import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Alert, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { formatRupiah } from "../../config/functional";
import { Loading } from "../../components";
import { listOrder } from "../../config/redux/actions/orderActions";
import ReactPaginate from "react-paginate";
import "./style.css";

const OrderHistory = (props) => {
  const headerTable = ["ID", "Date", "Total", "Paid", "Actions"];
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    dispatch(listOrder());
  }, [dispatch]);
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
      ) : error ? (
        <Alert>{error}</Alert>
      ) : orders ? (
        <Container>
          <Row>
            <Col className="text-center">
              <h2>Order History</h2>
              <Table striped bordered className="mt-4">
                <thead>
                  <tr>
                    {headerTable.map((item) => (
                      <th key={item}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map((item) => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.createdAt.substring(0, 10)}</td>
                        <td>Rp. {formatRupiah(item.totalPrice)}</td>
                        <td>{item.isPaid ? "Yes" : "No"}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() =>
                              props.history.push(`/order/${item._id}`)
                            }
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(orders.length / usersPerPage)}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Col>
          <h2 className="text-center">Order History</h2>
          {alert("kosong")}
        </Col>
      )}
    </div>
  );
};

export default OrderHistory;
