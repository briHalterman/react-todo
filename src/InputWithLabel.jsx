import React, { useRef, useEffect } from 'react';

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
      <label htmlFor="todoTitle">{children}</label>
      <input
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      ></input>
    </>
  );
}

export default InputWithLabel;
