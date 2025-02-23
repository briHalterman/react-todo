// ~TodoContainer Component~
// - Manages the state for the todo list
// - Fetches and stores todos using Airtable API and localStorage
// - Handles adding and removing

// Import React hooks, styles, and components
import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList/TodoList';
import AddTodoForm from '../components/AddTodoForm/AddTodoForm';
import sortTodos from '../utils/sortTodos';
import globalStyles from '../GlobalStyles.module.css';
import styles from '../App.module.css';

// Define the shape of a Todo item
type Todo = {
  id: string;
  title: string;
};

// Define a list of todos
type Todos = Todo[];

const TodoContainer: React.FC = () => {
  // Local Storage Handling

  // Retrieve todos from localStorage
  const getTodos = () => {
    try {
      const savedTodos = localStorage.getItem('savedTodoList');
      return savedTodos ? (JSON.parse(savedTodos) as Todos) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // State Management

  // State to store the todo list, initialized from localStorage
  const [todoList, setTodoList] = useState<Todos>(getTodos);

  // Loading state to handle async data fetching
  const [isLoading, setIsLoading] = useState(true);

  // Sort direction: true = A-Z, false = Z-A
  const [isAscending, setIsAscending] = useState(true);

  // Fetching Data from Airtable

  // Fetch todos from Airtable
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_AIRTABLE_API_TOKEN
        }`,
      },
    };

    // Airtable API URL with sorting by title (ascending)
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

      // Define Airtable record structure
      type Record = {
        id: string;
        fields: {
          title: string;
        };
      };

      // Transform Airtable records into Todo objects
      const todos = data.records.map((todo: Record) => {
        const newTodo = {
          title: todo.fields.title,
          id: todo.id,
        };

        return newTodo;
      });

      setTodoList(sortTodos(todos, isAscending));
      setIsLoading(false);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  // Adding a New Todo

  // Send a new todo to Airtable
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

      // Transform response into a Todo object
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

  // Handle Add & Remove

  // Add a new todo by calling `postTodo` and updating state
  async function addTodo(newTodo: NewTodo) {
    const addedTodo = await postTodo(newTodo.title);

    if (addedTodo) {
      setTodoList([...todoList, addedTodo]);
    } else {
      console.log('Failed to add todo');
    }
  }

  // Delete todo from Airtable db
  const deleteTodo = async (id: string) => {
    // Construct URL with todo's id
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_AIRTABLE_API_TOKEN
        }`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Remove a todo by filtering it out of the list
  async function removeTodo(id: string) {
    const wasRemoved = await deleteTodo(id);

    if (wasRemoved) {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } else {
      console.log('Failed to remove item from database.');
    }
  }

  // Re-sort the todo list whenever `isAscending` changes
  useEffect(() => {
    setTodoList((prevTodos) => sortTodos(prevTodos, isAscending));
  }, [isAscending]);

  // Render todo container

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Todo List</h1>

      {/* Form to add a new todo */}
      <AddTodoForm onAddTodo={addTodo} />

      {/* Sort button to toggle A-Z or Z-A */}
      <div className={globalStyles.centeredButton}>
        <button
          className={styles.sortButton}
          onClick={() => setIsAscending(!isAscending)}
        >
          Sort
        </button>
      </div>

      {/* Show loading state or todo list */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </div>
  );
};

// Export component
export default TodoContainer;
