import { Navbar, Nav, Dropdown, FormControl, Container } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { Brand, Loading } from "../../../components";
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import { getListCategoryProduct } from "../../../config/redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../config/redux/actions/userActions";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  const [value, setValue] = useState("");
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categoryProducts } = categoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListCategoryProduct());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`/search/name/${value}`);
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      ref={ref}
    >
      {children}
      &#x25bc;
    </Link>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">{React.Children.toArray(children)}</ul>
        </div>
      );
    }
  );

  const CustomSearch = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to search..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyUp={handleSearch}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Nav.Link>
          <Brand color="#fff" />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ml-auto">
            {loading ? (
              <Loading />
            ) : (
              categoryProducts.map((item, i) => (
                <Nav.Item key={i}>
                  <Nav.Link
                    onClick={() => history.push(`/search/category/${item}`)}
                  >
                    {item}
                  </Nav.Link>
                </Nav.Item>
              ))
            )}
          </Nav>
          <Nav className="me-auto ml-auto">
            <Nav.Item style={{ marginRight: "15px", marginTop: "15px" }}>
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <BiSearch />
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomSearch}></Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            {user ? (
              <Nav.Item style={{ marginTop: "15px" }}>
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    {user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => history.push("/order-history")}
                    >
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="3"
                      href="#logout"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Nav.Link onClick={() => history.push(`/login`)}>
                  Login
                </Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item style={{ marginRight: "15px" }}>
              <Nav.Link
                className="mr-2 mb-2"
                onClick={() => history.push("/cart")}
              >
                <FiShoppingBag style={{ fontSize: "20px", marginTop: "8px" }} />
              </Nav.Link>
              {cartItems.length > 0 && (
                <span
                  className="badge"
                  style={{
                    background: "#f02020",
                    color: "#fff",
                    height: "20px",
                    fontSize: "12px",
                    position: "relative",
                    bottom: '52px',
                    left: '20px'
                  }}
                >
                  {cartItems.length}
                </span>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
