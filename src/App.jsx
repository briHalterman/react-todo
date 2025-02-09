// import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import TodoList from './components/TodoList/TodoList';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const getTodos = () => {
    try {
      return JSON.parse(localStorage.getItem('savedTodoList')) || [];
    } catch (error) {
      console.log(error);
    }
  };

  const [todoList, setTodoList] = useState(getTodos);

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

  const postTodo = async (todo) => {
    const airtableData = {
      fields: {
        title: todo,
      },
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_AIRTABLE_API_TOKEN
        }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(airtableData),
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has occured: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      console.log(response);

      const newTodo = {
        title: dataResponse.fields.title,
        id: dataResponse.id,
      };

      return newTodo;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading == false) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  async function addTodo(newTodo) {
    const addedTodo = await postTodo(newTodo.title);
    setTodoList([...todoList, addedTodo]);
    // console.log(newTodo.title);
  }

  function removeTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.container}>
              <h1 className={styles.heading}>Todo List</h1>

              <AddTodoForm onAddTodo={addTodo} />

              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList
                  todoList={todoList}
                  onRemoveTodo={removeTodo}
                />
              )}
            </div>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
