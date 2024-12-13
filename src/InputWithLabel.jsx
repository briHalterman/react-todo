function InputWithLabel(props) {
  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        id="todoTitle"
        name="title"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
      ></input>
    </>
  );
}

export default InputWithLabel;
