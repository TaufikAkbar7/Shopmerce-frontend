import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { CheckoutBar, FormCustom, Title, } from "../../components";
import { saveShippingAddress } from "../../config/redux/actions/cartActions";

const Shipping = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [city, setCity] = useState("");
  const [kodepos, setKodepos] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({
      fullName: fullName,
      address: address,
      phone: phone,
      city: city,
      postal_code: kodepos
    }))
    history.push("/placeorder");
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <CheckoutBar step1 step2 />
      <Title text="Shipping Address" className="text-center" />
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <Form onSubmit={onSubmit}>
              <FormCustom setCustom={setFullName} name="Full Name" type="text" placeholder="Budi Hartanto"/>
              <FormCustom setCustom={setAddress} name="Address" type="text" placeholder="jl. Damai gg. Regalia rt 15 rw 04 no. 55"/>
              <FormCustom setCustom={setPhone} name="Phone Number" type="number" placeholder="08121321111" />
              <FormCustom setCustom={setCity} name="City" type="text" placeholder="Jakarta Timur"/>
              <FormCustom setCustom={setKodepos} name="Postal Code" type="number" placeholder="13650"/>
              <Button variant="dark" type="submit">
                Continue
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shipping;
