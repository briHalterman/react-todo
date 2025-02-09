import React from 'react';
import styles from './TodoListItem.module.css';
import globalStyles from '../GlobalStyles.module.css';
import CheckIcon from '../check.svg?react';

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

export default TodoListItem;
