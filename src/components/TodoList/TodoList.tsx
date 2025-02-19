import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import styles from '../TodoList/TodoList.module.css';
import PropTypes from 'prop-types';

type Todo = {
  id: string;
  title: string;
};

type TodoListProps = {
  todoList: Todo[];
  onRemoveTodo: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todoList,
  onRemoveTodo,
}) => {
  return (
    <ul className={styles.todoList}>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
