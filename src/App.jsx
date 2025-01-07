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

  // const [todoList, setTodoList] = useState(getTodos);
  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList:
              JSON.parse(localStorage.getItem('savedTodoList')) || [],
          },
        });
      }, 2000);
    });

    fetchTodos.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  });

  useEffect(() => {
    if (isLoading == false) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
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
