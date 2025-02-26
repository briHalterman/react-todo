// App.tsx
// - Main entry point for the Todo List app
// - Uses React Router for navigation

// Imports
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TodoContainer from './components/TodoContainer';
import HomePage from './components/HomePage/HomePage';

function App() {
  // Render the App
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodoContainer />} />
      </Routes>
    </>
  );
}

export default App;
