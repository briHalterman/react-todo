import React from 'react';
import styles from './TodoListItem.module.css';
import globalStyles from '../GlobalStyles.module.css';

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.ListItem}>
      <span style={{ width: '40%' }}>{todo.title}</span>
      <button
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
        className={`${globalStyles.button} ${styles.RemoveTodoButton}`}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
