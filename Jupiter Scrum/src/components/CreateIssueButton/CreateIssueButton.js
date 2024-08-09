import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import './CreateIssueButton.css'; 

// Function to fetch project names from an API
const fetchProjectNamesFromAPI = async () => {
    try {
        const response = await fetch('http://localhost:8080/projects/all'); // Replace with your API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.map(project => project.name); 
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return [];
    }
};

// Function to fetch assignees from an API
const fetchAssigneesFromAPI = async () => {
    try {
        const response = await fetch('http://localhost:8080/users/all'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.map(assignee => assignee.firstName); 
    } catch (error) {
        console.error('Failed to fetch assignees:', error);
        return [];
    }
};

// Function to post new issue data to the API
const postIssueToAPI = async (issueData) => {
    try {
        const formData = new FormData();
        for (const key in issueData) {
            formData.append(key, issueData[key]);
        }
        
        const response = await fetch('http://localhost:8080/issues/addIssue', { 
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Failed to post issue:', error);
        throw error;
    }
};

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
        sprint: '',
        storyPointEstimate: '',
        reporter: '',
        attachment: '',
        linkedIssues: '',
        user_id: ''  // Adding userId to the form data
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [projectNames, setProjectNames] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const projects = await fetchProjectNamesFromAPI();
            setProjectNames(projects);
            const assigneesList = await fetchAssigneesFromAPI();
            setAssignees(assigneesList);
            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        // Retrieve user_id from localStorage and set it in formData
        const userId = localStorage.getItem('user_id');
        if (userId) {
            setFormData(prevData => ({
                ...prevData,
                user_id: userId
            }));
        }
    }, []);

    const handleShow = () => setShowModal(true);

    const handleClose = () => {
        setShowModal(false);
        setSuccessMessage(''); // Clear success message on close

        // Reset form data
        setFormData({
            projectName: '',
            issueType: '',
            status: '',
            summary: '',
            description: '',
            assignee: '',
            labels: '',
            parent: '',
            sprint: '',
            storyPointEstimate: '',
            reporter: '',
            attachment: '',
            linkedIssues: '',
            user_id: ''  // Reset userId as well
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.projectName) newErrors.projectName = 'Project Name is required.';
        if (!formData.issueType) newErrors.issueType = 'Issue Type is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await postIssueToAPI(formData);
                setSuccessMessage('Issue created successfully!');
                handleClose();
            } catch (error) {
                setSuccessMessage('Failed to create issue.');
            }
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
                    {loading ? (
                        <Alert variant="info">Loading data...</Alert>
                    ) : (
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
                                    {projectNames.map((projectName, index) => (
                                        <option key={index} value={projectName}>{projectName}</option>
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
                                    as="select"
                                    name="assignee"
                                    value={formData.assignee}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Assignee</option>
                                    {assignees.map((assignee, index) => (
                                        <option key={index} value={assignee}>{assignee}</option>
                                    ))}
                                </Form.Control>
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
                                    disabled={formData.issueType === 'Epic'} // Disable if issueType is 'Epic'
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
                            <br />
                            <Button variant="primary" type="submit">Create</Button>
                            <Button variant="secondary" onClick={handleClose} className="ms-2">Cancel</Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateIssueButton;
