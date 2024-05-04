import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Registry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your backend API to register the user
      const response = await fetch(
        "https://nasa-api-2.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="background-image">
      <Container
        className="d-flex justify-content-center align-items-center h-100"
        style={{ paddingBottom: "100px", paddingTop: "50px" }}
      >
        <div className="login-form">
          <img
            src="../../public/images/logo2.png"
            alt="Login Image"
            className="img-fluid mb-4"
          />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-between align-items-center">
              <Col>
                <h2 className="text-center">Registration Form</h2>
              </Col>
              <Col xs="auto">
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    maxWidth: "100px",
                    background: "#008B8B",
                    transition: "background-color 0.3s ease",
                    ":hover": { background: "#006666" },
                  }}
                >
                  Register
                </Button>
              </Col>
            </Row>
            <Form.Group
              controlId="name"
              style={{
                textAlign: "center",
              }}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
                style={{
                  maxWidth: "500px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              />
            </Form.Group>
            <Form.Group
              controlId="email"
              style={{
                textAlign: "center",
              }}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  maxWidth: "500px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              />
            </Form.Group>
            <Form.Group
              controlId="password"
              style={{
                textAlign: "center",
              }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  maxWidth: "500px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              />
            </Form.Group>
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default Registry;
