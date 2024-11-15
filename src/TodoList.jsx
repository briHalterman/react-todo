import React from 'react';

let todoList = [
  {
    id: 1,
    title: 'Complete Assignment',
  },
  {
    id: 2,
    title: 'Read Supplemental Materials',
  },
  {
    id: 3,
    title: 'Check Slack',
  },
];

function TodoList() {
  return (
    <ul>
      {todoList.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}

export default TodoList;
