// ~InputWithLabel Component~
// - Displays label & manages input field
// - Calls handleTitleChange to update todo title in AddTodoForm

// Imports: React hooks, styles, and prop validation
import React, { useRef, useEffect } from 'react';
import styles from './InputWithLabel.module.css';
import PropTypes from 'prop-types';

// Type Definitions

// Define expected props for InputWithLabel
type InputWithLabelProps = {
  children: React.ReactNode;
  todoTitle: string;
  handleTitleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isFocused: boolean;
};

// InputWithLabel Component

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  children,
  todoTitle,
  handleTitleChange,
  isFocused,
}) => {
  // Reference to input field
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      <label htmlFor="todoTitle" className={styles.label}>
        {children}
      </label>
      <input
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
        className={styles.input}
      ></input>
    </>
  );
};

// PropTypes Validation

// Ensure props match expected types
InputWithLabel.propTypes = {
  children:
    PropTypes.node as unknown as React.Validator<React.ReactNode>,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  isFocused: PropTypes.bool as unknown as React.Validator<boolean>,
};

// Export component
export default InputWithLabel;
