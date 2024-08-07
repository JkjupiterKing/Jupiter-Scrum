import React, { useState } from 'react';
import { Modal, Button, Table, Dropdown, Form, Pagination } from 'react-bootstrap';
import Sidenav from '../Sidenav/Sidenav';
import { Search } from 'react-bootstrap-icons'; // Import Search icon from react-bootstrap-icons
import './Projects.css'; // Import your CSS file for specific styles

const Projects = () => {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([
        // Example project data
        { name: 'Project Alpha', key: 'ALPHA', type: 'Type A', lead: 'John Doe', url: 'http://example.com' },
        { name: 'Project Beta', key: 'BETA', type: 'Type B', lead: 'Jane Doe', url: 'http://example.com' },
        // Add more projects to test pagination
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleAddProject = () => {
        // Logic to add a project
        handleClose();
    };

    const handleDeleteProject = () => {
        // Logic to delete a project
    };

    // Pagination logic
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="app-container">
            <Sidenav />
            <div className="main-content">
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1>Projects</h1>
                    </div>
                    <div className="search-create-container d-flex align-items-center mb-3">
                        <div className="search-wrapper">
                            <Form.Control
                                type="text"
                                placeholder="Search projects"
                                className="search-bar"
                            />
                            <Search
                                size={15}
                                className="search-icon"
                            />
                        </div>
                        <Button variant="primary" onClick={handleShow}>
                            Create Project
                        </Button>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Key</th>
                                <th>Type</th>
                                <th>Lead</th>
                                <th>Project URL</th>
                                <th>More Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProjects.map((project, index) => (
                                <tr key={index}>
                                    <td>{project.name}</td>
                                    <td>{project.key}</td>
                                    <td>{project.type}</td>
                                    <td>{project.lead}</td>
                                    <td>
                                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                                            {project.url}
                                        </a>
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                ...
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={handleDeleteProject} className="text-danger">
                                                    Delete Project
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Pagination controls */}
                    <div className="pagination-container d-flex justify-content-center">
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {[...Array(totalPages).keys()].map(number => (
                                <Pagination.Item
                                    key={number + 1}
                                    active={number + 1 === currentPage}
                                    onClick={() => handlePageChange(number + 1)}
                                >
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </div>

                    {/* Modal for creating a project */}
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create New Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter project name" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Key</Form.Label>
                                    <Form.Control type="text" placeholder="Enter project key" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control type="text" placeholder="Enter project type" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lead</Form.Label>
                                    <Form.Control type="text" placeholder="Enter project lead" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Project URL</Form.Label>
                                    <Form.Control type="url" placeholder="Enter project URL" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddProject}>
                                Add Project
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Projects;
