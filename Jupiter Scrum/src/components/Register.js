
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Register.css'; // Import the CSS file

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // Add your registration logic here
        console.log('Register:', { email, password });
        setIsRegistered(true);
        // Redirect to the login page after successful registration
        navigate('/');
    };

    return (
        <Container className="register-container">
            <Row className="w-100">
                <Col md={6} lg={4}>
                    <Card className="register-card shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>
                            <Form onSubmit={handleSubmit} className="register-form">
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

                                <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="mt-3 w-100" id="register-btn">
                                    Register
                                </Button>
                            </Form>
                            {isRegistered && (
                                <div className="text-center mt-3">
                                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
