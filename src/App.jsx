import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  return (
    <div>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={setNewTodo} />

      <p>{newTodo}</p>

      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
