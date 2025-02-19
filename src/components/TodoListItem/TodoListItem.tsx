import React from 'react';
import styles from './TodoListItem.module.css';
import globalStyles from '../../GlobalStyles.module.css';
import CheckIcon from '../../assets/check.svg?react';
import PropTypes from 'prop-types';

type Todo = {
  id: string;
  title: string;
};

type TodoListItemProps = {
  todo: Todo;
  onRemoveTodo: (id: string) => void;
};

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onRemoveTodo,
}) => {
  return (
    <li className={styles.ListItem}>
      <span className={styles.title}>{todo.title}</span>
      <button
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
        className={`${globalStyles.button} ${styles.RemoveTodoButton}`}
      >
        <CheckIcon height="18px" width="18px" />
      </button>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
