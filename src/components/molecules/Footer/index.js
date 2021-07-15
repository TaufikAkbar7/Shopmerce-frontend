import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Brand } from "../..";

import "./footer.css";
const Footer = ({ mt }) => {
  return (
    <div className="footer" style={{ marginTop: mt }}>
      <Container>
        <Row>
          <Col className="text-center">
            <Brand color="#fff" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
