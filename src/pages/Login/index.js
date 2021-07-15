import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { Text, Title, FormCustom, Loading } from "../../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../config/redux/actions/userActions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, user } = userLogin;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const btnLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (user) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, user]);

  return (
    <div style={{ background: "#f6f6f6", height: "100%" }}>
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
              <Form onSubmit={btnLogin}>
                <Title text="Login in to Shopmerce" className="text-center" />
                <FormCustom
                  setCustom={setEmail}
                  placeholder="tes@gmail.com"
                  type="email"
                  name="Email"
                />
                <FormCustom
                  setCustom={setPassword}
                  type="password"
                  placeholder="Password"
                  name="Password"
                />
                <Button variant="dark" type="submit">
                  Login
                </Button>
              </Form>
              <div className="justify-content-center mt-3">
                <Text name="New customer?" />
                <Link to="/register">Create your account</Link>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Login;
