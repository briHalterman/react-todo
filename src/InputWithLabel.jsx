import React from 'react';

function InputWithLabel(props) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (props.isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        id="todoTitle"
        name="title"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        // autoFocus
        ref={inputRef}
      ></input>
    </>
  );
}

export default InputWithLabel;
