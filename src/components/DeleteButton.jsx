import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteButton = ({ onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      onDelete();
    }
  };

  return (
    <Button variant="danger" size="sm" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteButton;
