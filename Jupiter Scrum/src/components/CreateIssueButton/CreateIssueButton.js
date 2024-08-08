import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import './CreateIssueButton.css'; // Import the CSS file

// Mock function to simulate fetching project names
const fetchProjectNames = () => [
    'Project Alpha',
    'Project Beta',
    'Project Gamma'
];

const CreateIssueButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        projectName: '',
        issueType: '',
        status: '',
        summary: '',
        description: '',
        assignee: '',
        labels: '',
        parent: '',
        team: '',
        sprint: '',
        storyPointEstimate: '',
        reporter: '',
        attachment: '',
        linkedIssues: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setSuccessMessage(''); // Clear success message on close
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        // Basic validation example
        if (!formData.projectName) newErrors.projectName = 'Project Name is required.';
        if (!formData.issueType) newErrors.issueType = 'Issue Type is required.';
        // Add more validation as needed
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission (e.g., API call)
            setSuccessMessage('Issue created successfully!');
            handleClose();
            // Reset form
            setFormData({
                projectName: '',
                issueType: '',
                status: '',
                summary: '',
                description: '',
                assignee: '',
                labels: '',
                parent: '',
                team: '',
                sprint: '',
                storyPointEstimate: '',
                reporter: '',
                attachment: '',
                linkedIssues: ''
            });
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create
            </Button>

            {/* Create Issue Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Issue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formProjectName">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                as="select"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                isInvalid={!!errors.projectName}
                            >
                                <option value="">Select Project</option>
                                {fetchProjectNames().map((project, index) => (
                                    <option key={index} value={project}>{project}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.projectName}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formIssueType">
                            <Form.Label>Issue Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="issueType"
                                value={formData.issueType}
                                onChange={handleChange}
                                isInvalid={!!errors.issueType}
                            >
                                <option value="">Select Issue Type</option>
                                <option value="Epic">Epic</option>
                                <option value="Story">Story</option>
                                <option value="Task">Task</option>
                                <option value="Bug">Bug</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.issueType}</Form.Control.Feedback>
                        </Form.Group>
                    
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="">Select Status</option>
                                <option value="To do">To do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId="formSummary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                                type="text"
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                            />
                        </Form.Group>
                      
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="formAssignee">
                            <Form.Label>Assignee</Form.Label>
                            <Form.Control
                                type="text"
                                name="assignee"
                                value={formData.assignee}
                                onChange={handleChange}
                            />
                        </Form.Group>
                       
                        <Form.Group controlId="formLabels">
                            <Form.Label>Labels</Form.Label>
                            <Form.Control
                                type="text"
                                name="labels"
                                value={formData.labels}
                                onChange={handleChange}
                            />
                        </Form.Group>
                       
                        <Form.Group controlId="formParent">
                            <Form.Label>Parent</Form.Label>
                            <Form.Control
                                type="text"
                                name="parent"
                                value={formData.parent}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="formTeam">
                            <Form.Label>Team</Form.Label>
                            <Form.Control
                                type="text"
                                name="team"
                                value={formData.team}
                                onChange={handleChange}
                            />
                        </Form.Group>
                       
                        <Form.Group controlId="formSprint">
                            <Form.Label>Sprint</Form.Label>
                            <Form.Control
                                type="text"
                                name="sprint"
                                value={formData.sprint}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="formStoryPointEstimate">
                            <Form.Label>Story Point Estimate</Form.Label>
                            <Form.Control
                                type="number"
                                name="storyPointEstimate"
                                value={formData.storyPointEstimate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                       
                        <Form.Group controlId="formReporter">
                            <Form.Label>Reporter</Form.Label>
                            <Form.Control
                                type="text"
                                name="reporter"
                                value={formData.reporter}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="formAttachment">
                            <Form.Label>Attachment</Form.Label>
                            <Form.Control
                                type="file"
                                name="attachment"
                                onChange={(e) => setFormData({ ...formData, attachment: e.target.files[0] })}
                            />
                        </Form.Group>
                
                        <Form.Group controlId="formLinkedIssues">
                            <Form.Label>Linked Issues</Form.Label>
                            <Form.Control
                                type="text"
                                name="linkedIssues"
                                value={formData.linkedIssues}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit">Create</Button>
                        <Button variant="secondary" onClick={handleClose} className="ms-2">Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateIssueButton;
