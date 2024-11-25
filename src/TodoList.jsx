import React from 'react';
import TodoListItem from './TodoListItem';

// let todoList = [
//   {
//     id: 1,
//     title: 'Complete Assignment',
//   },
//   {
//     id: 2,
//     title: 'Read Supplemental Materials',
//   },
//   {
//     id: 3,
//     title: 'Check Slack',
//   },
// ];

function TodoList(props) {
  return (
    <ul>
      {props.todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
