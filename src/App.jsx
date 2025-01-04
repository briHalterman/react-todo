// import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const getTodos = () => {
    try {
      return JSON.parse(localStorage.getItem('savedTodoList')) || [];
    } catch (error) {
      console.log(error);
    }
  };

  const [todoList, setTodoList] = useState(getTodos);

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={addTodo} />

      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
