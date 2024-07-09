import React from 'react';
import { Table, Button } from 'react-bootstrap';
import DeleteButton from './DeleteButton';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Student List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => onEdit(student)}>
                  Edit
                </Button>{' '}
                <DeleteButton onDelete={() => onDelete(student.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;
