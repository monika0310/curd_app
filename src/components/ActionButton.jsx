import React from 'react';
import Button from 'react-bootstrap/Button';

const ActionButton = ({ variant, onClick, children }) => {
  return (
    <Button variant={variant} onClick={onClick} className="mx-2">
      {children}
    </Button>
  );
};

export default ActionButton;
