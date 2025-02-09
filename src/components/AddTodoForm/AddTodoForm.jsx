import { useState } from 'react';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import styles from './AddTodoForm.module.css';
import globalStyles from '../../GlobalStyles.module.css';

import AddIcon from '../../assets/add.svg?react';

function AddTodoForm({ onAddTodo }) {
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

    onAddTodo(newTodo);

    setTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo} className={styles.newTodoForm}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
        isFocused={true}
        // label="Title"
      >
        Title
      </InputWithLabel>
      <button
        type="submit"
        className={`${globalStyles.button} ${styles.AddTodoButton}`}
      >
        <AddIcon height="18px" width="18px" />
      </button>
    </form>
  );
}

export default AddTodoForm;
