import { useState, useEffect } from 'react';
import styles from './App.module.css';
import TodoList from './components/TodoList/TodoList';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import globalStyles from './GlobalStyles.module.css';

type Todo = {
  id: string;
  title: string;
};

type Todos = Todo[];

function App() {
  const getTodos = () => {
    try {
      const savedTodos = localStorage.getItem('savedTodoList');
      return savedTodos ? (JSON.parse(savedTodos) as Todos) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const [todoList, setTodoList] = useState<Todos>(getTodos);
  const [isLoading, setIsLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

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
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      data.records.sort((objectA: Record, objectB: Record) => {
        const titleA = objectA.fields.title.toLowerCase();
        const titleB = objectB.fields.title.toLowerCase();

        if (isAscending) {
          if (titleA < titleB) {
            return -1;
          }

          if (titleA == titleB) {
            return 0;
          }

          if (titleA > titleB) {
            return 1;
          }
        } else {
          if (titleA < titleB) {
            return 1;
          }

          if (titleA == titleB) {
            return 0;
          }

          if (titleA > titleB) {
            return -1;
          }
        }
      });

      type Record = {
        id: string;
        fields: {
          title: string;
        };
      };

      const todos = data.records.map((todo: Record) => {
        const newTodo = {
          title: todo.fields.title,
          id: todo.id,
        };

        return newTodo;
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const postTodo = async (todo: string) => {
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
      console.log((error as Error).message);
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

  type NewTodo = {
    title: string;
  };

  async function addTodo(newTodo: NewTodo) {
    const addedTodo = await postTodo(newTodo.title);

    if (addedTodo) {
      setTodoList([...todoList, addedTodo]);
    } else {
      console.log('Failed to add todo');
    }
  }

  function removeTodo(id: string) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  useEffect(() => {
    setTodoList((prevTodos) =>
      [...prevTodos].sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (isAscending) {
          return titleA < titleB ? -1 : titleA > titleB ? 1 : 0; // A-Z
        } else {
          return titleA > titleB ? -1 : titleA < titleB ? 1 : 0; // Z-A
        }
      })
    );
  }, [isAscending]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.container}>
              <h1 className={styles.heading}>Todo List</h1>

              <AddTodoForm onAddTodo={addTodo} />
              <div className={globalStyles.centeredButton}>
                <button
                  className={styles.sortButton}
                  onClick={() => setIsAscending(!isAscending)}
                >
                  Sort
                </button>
              </div>

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
