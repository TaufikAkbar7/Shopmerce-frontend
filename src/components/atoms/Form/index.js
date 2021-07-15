import React from "react";
import { Form } from "react-bootstrap";

const FormCustom = ({ setCustom, name, placeholder, type }) => {
  return (
    <div>
      <Form.Group controlId="validationCustom">
        <Form.Label>{name}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          onChange={(e) => setCustom(e.target.value)}
        />
      </Form.Group>
    </div>
  );
};

export default FormCustom;