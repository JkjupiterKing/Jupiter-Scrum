import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidenav from '../Sidenav/Sidenav';
import "./Home.css";

const Home = () => {
    return (
        <Container className="home-container">
            <Sidenav />
            <Row className="w-100">
                <Col md={6} lg={4}>
                    <Card className="home-card">
                        <Card.Body>
                            <h2 className="text-center mb-4">Welcome!!</h2>
                            <p className="text-center">You are successfully logged in.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
