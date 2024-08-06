import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any authentication tokens or user data here
        // Navigate back to the login page
        navigate('/login');
    };

    return (
        <Container className="home-container">
            <Row className="w-100">
                <Col md={6} lg={4}>
                    <Card className="home-card">
                        <Card.Body>
                            <h2 className="text-center mb-4">Welcome Home!</h2>
                            <p className="text-center">You are successfully logged in.</p>
                            <div className="text-center mt-4">
                                <Button variant="primary" onClick={handleLogout}>Logout</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
