import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const Qty = ({
  onMinus,
  onPlus,
  counter,
  posisiMinus,
  posisiPlus,
  posisiCounter,
}) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={2}>
            <FiMinusCircle
              onClick={() => onMinus()}
              style={{
                cursor: "pointer",
                fontSize: "22px",
                left: posisiMinus,
                position: "relative",
              }}
            />
          </Col>
          <Col md={2} style={{ marginLeft: posisiCounter }}>
            <p>{counter}</p>
          </Col>
          <Col>
            <FiPlusCircle
              onClick={() => onPlus()}
              style={{
                cursor: "pointer",
                fontSize: "22px",
                left: posisiPlus,
                position: "relative",
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Qty;
