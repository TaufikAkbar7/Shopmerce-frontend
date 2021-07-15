import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { formatRupiah } from "../../../config/functional/index";
import ReactPaginate from "react-paginate";
import "../../../pages/OrderHistory/style.css";
import "./style.css";

const CustomCard = ({ products, md, center }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const history = useHistory();
  const perPage = 6;
  const pagesVisited = pageNumber * perPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <Row md={md} className={center}>
        {products.slice(pagesVisited, pagesVisited + perPage).map((item) => (
          <div className="box" key={item._id}>
            <div className="slide-img">
              <img src={`http://localhost:4000/${item.image}`} alt="1" />
              <div className="overlay">
                <button
                  className="buy-btn"
                  onClick={() => history.push(`/detail-product/${item._id}`)}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="detail-box">
              <div className="type">
                <p>{item.name}</p>
                <span>{item.kategori}</span>
              </div>
              <p className="price">Rp. {formatRupiah(item.harga)}</p>
            </div>
          </div>
        ))}
      </Row>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(products.length / perPage)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default CustomCard;
