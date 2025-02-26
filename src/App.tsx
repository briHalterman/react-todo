// App.tsx
// - Main entry point for the Todo List app
// - Uses React Router for navigation

// Imports
import { Routes, Route } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import HomePage from './components/HomePage';

function App() {
  // Render the App
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todos" element={<TodoContainer />} />
    </Routes>
  );
}

export default App;
