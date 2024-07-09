import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

const App = () => {
  const initialFormState = { id: null, name: '', age: '', phone: '', email: '' };
  const [students, setStudents] = useState([
    { id: 1, name: 'John ', age: '30', phone: '1234567890', email: 'john.d@example.com' },
    { id: 2, name: 'Jane ', age: '25', phone: '9876543210', email: 'jane.s@example.com' }
  ]);
  const [currentStudent, setCurrentStudent] = useState(initialFormState);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStudent(initialFormState);
  };

  const handleShowModal = () => setShowModal(true);

  const handleAddStudent = (student) => {
    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    setStudents([...students, { id: newId, ...student }]);
    handleCloseModal();
  };

  const handleEditStudent = (student) => {
    setStudents(students.map(s => (s.id === student.id ? student : s)));
    handleCloseModal();
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEdit = (student) => {
    setCurrentStudent({ ...student });
    handleShowModal();
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <button className="btn btn-primary mb-3" onClick={handleShowModal}>
        Add Student
      </button>

      <StudentList students={students} onEdit={handleEdit} onDelete={handleDeleteStudent} />

      <StudentForm
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={currentStudent.id ? handleEditStudent : handleAddStudent}
        initialData={currentStudent}
      />
    </div>
  );
};

export default App;
