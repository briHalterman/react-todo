import React, { useRef, useEffect } from 'react';
import styles from './InputWithLabel.module.css';

function InputWithLabel({
  children,
  todoTitle,
  handleTitleChange,
  isFocused,
}) {
  const inputRef = useRef();

  useEffect(() => {
    // console.log(inputRef.current);
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      <label htmlFor="todoTitle" className={styles.label}>
        {children}
      </label>
      <input
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
        className={styles.input}
      ></input>
    </>
  );
}

export default InputWithLabel;
