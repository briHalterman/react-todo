function InputWithLabel(props) {
  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        id="todoTitle"
        name="title"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        autoFocus
      ></input>
    </>
  );
}

export default InputWithLabel;
