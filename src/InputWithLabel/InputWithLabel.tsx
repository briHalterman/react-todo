import React, { useRef, useEffect } from 'react';
import styles from './InputWithLabel.module.css';

type InputWithLabelProps = {
  children: React.ReactNode;
  todoTitle: string;
  handleTitleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isFocused: boolean;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  children,
  todoTitle,
  handleTitleChange,
  isFocused,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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
};

export default InputWithLabel;
