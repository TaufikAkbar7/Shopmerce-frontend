import React from "react";
import { Button } from "react-bootstrap";
const CustomBtn = ({ name, onClick, variant, product, ...rest }) => {
  return (
    <div>
      <Button variant={variant} onClick={() => onClick(product.name)} {...rest}>
        {name}
      </Button>
    </div>
  );
};

export default CustomBtn;
