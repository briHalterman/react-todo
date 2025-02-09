import React, { useRef, useEffect } from 'react';
import styles from './InputWithLabel.module.css';
import PropTypes from 'prop-types';

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

InputWithLabel.propTypes = {
  children: PropTypes.node.isRequired,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  isFocused: PropTypes.bool,
};

export default InputWithLabel;
