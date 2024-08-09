import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import Sidenav from '../Sidenav/Sidenav';
import CreateIssueButton from '../CreateIssueButton/CreateIssueButton'; 
import "./Home.css";

const Home = () => {
    return (
        <Container className="home-container">
            <Sidenav />
            <div className="icon-container">
                <CreateIssueButton />
                <Button variant="text" className="ms-2">
                    <Bell size={24} />
                </Button>
            </div>
        </Container>
    );
};

export default Home;
