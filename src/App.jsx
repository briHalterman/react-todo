import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  // const [count, setCount] = useState(0)
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

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
