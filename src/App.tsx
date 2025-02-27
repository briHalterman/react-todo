// App.tsx
// - Main entry point for the Todo List app
// - Uses React Router for navigation

// Imports
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TodoContainer from './components/TodoContainer/TodoContainer';
import HomePage from './HomePage/HomePage';
import Footer from './components/Footer/Footer';

function App() {
  // Render the App
  return (
    <div id="root">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todos" element={<TodoContainer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
