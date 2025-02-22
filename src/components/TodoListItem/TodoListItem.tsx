// TodoListItem Component
// - Displays a single todo item from the list
// - includes title and remove button

// Imports: styles, svg , and prop validation
import React from 'react';
import styles from './TodoListItem.module.css';
import globalStyles from '../../GlobalStyles.module.css';
import CheckIcon from '../../assets/check.svg?react';
import PropTypes from 'prop-types';

// Define Types for Props

type Todo = {
  id: string;
  title: string;
};

type TodoListItemProps = {
  todo: Todo;
  onRemoveTodo: (id: string) => void;
};

// TodoListItem Component

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onRemoveTodo,
}) => {
  return (
    <li className={styles.ListItem}>
      {/* Display todo title */}
      <span className={styles.title}>{todo.title}</span>
      <button
        type="button"
        onClick={() => onRemoveTodo(todo.id)} // Call remove function on click
        className={`${globalStyles.button} ${styles.RemoveTodoButton}`}
      >
        <CheckIcon height="18px" width="18px" />
      </button>
    </li>
  );
};

// PropTypes Validation

// Ensure the component is always passed a todo object with correct shape and valid onRemoveTodo function
TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

// Export component
export default TodoListItem;
