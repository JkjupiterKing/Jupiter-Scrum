import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { House, FileText, Briefcase, ExclamationCircle, Gear, Person, QuestionCircle, BoxArrowRight } from 'react-bootstrap-icons'; 
import './Sidenav.css';

const Sidenav = () => {
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault(); 
        // Clear user_id from local storage
        localStorage.removeItem('user_id');

        // Navigate back to the login page
        navigate('/login');
    };

    return (
        <div className="sidenav">
            <div className="sidenav-header">
                <h1 className="sidenav-title">Jupiter Scrum</h1>
            </div>
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/home" className="nav-link">
                    <House size={20} /> Home
                </Nav.Link>
                <Nav.Link as={Link} to="/your-work" className="nav-link">
                    <FileText size={20} /> Your Work
                </Nav.Link>
                <Nav.Link as={Link} to="/projects" className="nav-link">
                    <Briefcase size={20} /> Projects
                </Nav.Link>
                <Nav.Link as={Link} to="/issues" className="nav-link">
                    <ExclamationCircle size={20} /> Issues
                </Nav.Link>
                <Nav.Link as={Link} to="/settings" className="nav-link">
                    <Gear size={20} /> Settings
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-link">
                    <Person size={20} /> Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/help" className="nav-link">
                    <QuestionCircle size={20} /> Help
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="logout-link">
                    <BoxArrowRight size={20} id='logout-icon'/> Logout
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidenav;
