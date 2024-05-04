import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ParticleBg from "../../components/ParticleBg";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://nasa-api-2.onrender.com/api/auth/login",
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
      // Login successful, handle accordingly (e.g., redirect)
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <section className="background-image">
        <Container
          className="d-flex justify-content-center align-items-center h-100"
          style={{ paddingBottom: "100px", paddingTop: "50px" }}
        >
          <div className="login-form">
            <img
              src="../../public/images/logimage.png"
              alt="Login Image"
              className="imglogo mb-4"
            />
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
              <h2 className="text-center mb-4">Login Form</h2>
              <div className="form-group text-center">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    maxWidth: "400px",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                  required
                />
              </div>
              <div className="form-group text-center">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  style={{
                    maxWidth: "400px",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                style={{
                  maxWidth: "200px",
                  margin: "0 auto",
                }}
              >
                Login
              </Button>
              <p className="text-center mt-3">
                Don't have an account? <a href="/registry">Sign Up</a>
              </p>
            </Form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Login;
