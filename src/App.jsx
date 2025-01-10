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

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_AIRTABLE_API_TOKEN
        }`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      // console.log(data);

      const todos = data.records.map((todo) => {
        const newTodo = {
          title: todo.fields.title,
          id: todo.id,
        };

        return newTodo;
      });

      // console.log(todos);

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   const fetchTodos = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         data: {
  //           todoList:
  //             JSON.parse(localStorage.getItem('savedTodoList')) || [],
  //         },
  //       });
  //     }, 2000);
  //   });

  //   fetchTodos.then((result) => {
  //     setTodoList(result.data.todoList);
  //     setIsLoading(false);
  //   });
  // });

  useEffect(() => {
    fetchData();
  }, []);

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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
