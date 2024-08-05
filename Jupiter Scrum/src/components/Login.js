
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Login.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your login logic here
        console.log('Login:', { email, password });
    };

    return (
        <Container className="login-container">
            <Row className="w-100">
                <Col md={6} lg={4}>
                    <Card className="login-card">
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form onSubmit={handleSubmit} className="login-form">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="mt-3 w-100" id="login-btn">
                                    Login
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <p>Don't have an account? <Link to="/register" id='Register-link'>Register here</Link></p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
