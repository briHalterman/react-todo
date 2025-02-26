// AddTodoForm Compoonent
// - Adds new todos to list
// - Incl. text input and submit button

// Import React state, InputWithLabel component, styles, svg & prop validation
import { useState } from 'react'; // For handling input
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import styles from './AddTodoForm.module.css';
import globalStyles from '../../GlobalStyles.module.css';
import PropTypes from 'prop-types';
import AddIcon from '../../assets/add.svg?react';

// Define Types for Props

type Todo = {
  id: number;
  title: string;
};

type AddTodoFormProps = {
  onAddTodo: (newTodo: Todo) => void;
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  // Manage Input State

  // store what the user types
  const [todoTitle, setTodoTitle] = useState('');

  // Handle Input Changes

  // Update todoTitle whenever the user types
  function handleTitleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  // Handle Form Submission

  // Create new todo object and call onAddTodo(newTodo)
  function handleAddTodo(event: React.FormEvent<HTMLFormElement>) {
    // Prevent page reload
    event.preventDefault();

    const newTodo = {
      title: todoTitle,
      id: Date.now(), // placeholder for unique number generation, in the future you should not use this
    };

    // Pass the new todo to the parent component
    onAddTodo(newTodo);

    // Clear input after adding
    setTodoTitle('');
  }

  // Render the Form

  return (
    <form onSubmit={handleAddTodo} className={styles.newTodoForm}>
      {/* Use InputWithLabel to handle the text input */}
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
        isFocused={true} // Auto focus on input field
      >
        Title
      </InputWithLabel>
      {/* Submit button with "Add" icon triggers handleAddTodo */}
      <button
        type="submit"
        className={`${globalStyles.button} ${styles.AddTodoButton}`}
      >
        <AddIcon height="18px" width="18px" />
      </button>
    </form>
  );
};

// PropTypes Validation

// Ensure onAddTodo is a required function
AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

// Export component
export default AddTodoForm;
