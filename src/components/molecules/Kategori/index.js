import React from "react";
import { Card, Row } from "react-bootstrap";

const CardCategory = ({ category }) => {
  return (
    <Row md={3} className="justify-content-center">
      {category.map((item) => (
        <div key={item._id}>
          <Card style={{ width: "15rem", margin: "0.5rem", cursor: "pointer", borderRadius: '15%'}}>
            <Card.Img
              variant="top"
              src={`http://localhost:4000/${item.image}`}
              style={{ objectFit: "cover", height: "250px", width: "250px", borderRadius: '15%' }}
            />
          </Card>
          <h3 style={{marginLeft: '50px'}}>{item.name}</h3>
        </div>
      ))}
    </Row>
  );
};

export default CardCategory;
