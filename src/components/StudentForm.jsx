import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const StudentForm = ({ show, handleClose, handleSubmit, initialData, errors, setErrors }) => {
  const [student, setStudent] = useState({ ...initialData });

  useEffect(() => {
    // Update local state only if initialData changes
    setStudent({ ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(student.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(student.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(student);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{student.id ? 'Edit Student' : 'save'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              placeholder="Enter phone"
              required
            />
            {errors.phone && <Form.Text className="text-danger">{errors.phone}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
            {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {student.id ? 'Update Student' : 'save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentForm;
