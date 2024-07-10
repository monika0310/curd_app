import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import './App.css'; // Assuming you have CSS for styling

const App = () => {
  const initialFormState = { id: null, name: '', age: '', phone: '', email: '' };
  const [students, setStudents] = useState([
    { id: 1, name: 'John', age: '30', phone: '1234567890', email: 'john.d@example.com' },
    { id: 2, name: 'Jane', age: '25', phone: '9876543210', email: 'jane.s@example.com' }
  ]);
  const [currentStudent, setCurrentStudent] = useState(initialFormState);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStudent(initialFormState);
    setErrors({});
  };

  const handleShowModal = () => setShowModal(true);

  const handleAddStudent = (student) => {
    const existingStudentIndex = students.findIndex(s => s.name.trim() === student.name.trim() && s.age === student.age);
    if (existingStudentIndex !== -1) {
      // Student already exists, update the existing entry
      const updatedStudents = [...students];
      updatedStudents[existingStudentIndex] = { ...student, id: students[existingStudentIndex].id };
      setStudents(updatedStudents);
      setCurrentStudent(student); // Set currentStudent to updated student
    } else {
      // Student does not exist, add as new entry
      const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
      const newStudent = { id: newId, ...student };
      setStudents([...students, newStudent]);
      setCurrentStudent(newStudent); // Set currentStudent to newly added student
    }
    handleCloseModal();
  };

  const handleEditStudent = (student) => {
    setStudents(students.map(s => (s.id === student.id ? student : s)));
    setCurrentStudent(student); // Update currentStudent to edited student
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
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  );
};

export default App;
