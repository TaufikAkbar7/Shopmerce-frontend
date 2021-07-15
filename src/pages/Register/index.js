import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Text, Title, FormCustom, Loading } from "../../components";
import { register } from "../../config/redux/actions/userActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, user } = userRegister;
  const dispatch = useDispatch();
  toast.configure();

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(`Password and confirm password are not match`, {
        position: toast.POSITION.TOP_CENTER,
        draggable: true,
        autoClose: 3000,
        hideProgressBar: true,
      });
    } else if (user) {
      toast.info(`Register success`, {
        position: toast.POSITION.TOP_CENTER,
        draggable: true,
        autoClose: 3000,
        hideProgressBar: true,
      });
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div style={{ background: "#f6f6f6", height: "max-content" }}>
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
      ) : (
        <Container className="p-5">
          <Row className="justify-content-center p-3">
            <Col
              md={6}
              className="p-5"
              style={{
                borderRadius: "10px",
                background: "#fff",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.5)",
              }}
            >
              <Form onSubmit={onSubmit}>
                <Title text="Register" className="text-center" />
                <FormCustom
                  setCustom={setName}
                  placeholder="tes32"
                  type="text"
                  name="Name"
                />
                <FormCustom
                  setCustom={setEmail}
                  placeholder="tes@gmail.com"
                  type="email"
                  name="Email"
                />
                <FormCustom
                  setCustom={setPassword}
                  placeholder="password"
                  type="password"
                  name="Password"
                />
                <FormCustom
                  setCustom={setConfirmPassword}
                  placeholder="confirm password"
                  type="password"
                  name="Confirm Password"
                />
                <Button
                  variant="dark"
                  style={{ fontWeight: "bold" }}
                  type="submit"
                >
                  Register
                </Button>
              </Form>
              <div className="justify-content-center mt-3">
                <Text name=" Already have an account?" />
                <Link to="/login">Login</Link>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Register;
