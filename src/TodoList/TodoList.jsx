import React from 'react';
// import TodoListItem from './TodoListItem';
import TodoListItem from '../TodoListItem/TodoListItem';
import styles from '../TodoList/TodoList.module.css';

function TodoList({ todoList, onRemoveTodo }) {
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
}

export default TodoList;
