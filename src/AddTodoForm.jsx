import { useState } from 'react';

function AddTodoForm(props) {
  const [todoTitle, setTodoTitle] = useState('');

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();

    const newTodo = {
      title: todoTitle,
      id: Date.now(),
      // placeholder for unique number generation, in the future you should not use this
    };

    props.onAddTodo(newTodo);

    setTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
