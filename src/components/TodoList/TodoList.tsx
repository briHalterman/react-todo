// TodoList Component
// - Receives a list of todos from App.tsx
// - Loops through todos and renders each one as a TodoList Item
// - Passes down onRemoveTodo function

// Imports: React,TodoListItem component, styles & runtime prop validation
import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import PropTypes from 'prop-types';
import styles from '../TodoList/TodoList.module.css';

// Define Types for Props

type Todo = {
  id: string;
  title: string;
};

type TodoListProps = {
  todoList: Todo[];
  onRemoveTodo: (id: string) => void;
};

// TodoList Component

const TodoList: React.FC<TodoListProps> = ({
  todoList,
  onRemoveTodo,
}) => {
  return (
    <ul className={styles.todoList}>
      {/* map over todo list array and return list item with id and title */}
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id} // Unique key for React rendering
          todo={todo} // Passes the todo object
          onRemoveTodo={onRemoveTodo} // Passes onRemoveTodo function
        />
      ))}
    </ul>
  );
};

// PropTypes Validation

// Ensure todoList is an array of objects, each with a required id and title
TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired, // Validate onRemoveTodo as required function
};

// Export component
export default TodoList;
