import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <p className={styles.paragraph}>
        Stay organized and boost your productivity with this simple
        and intuitive Todo List application. Easily add, sort, and
        manage your tasks with a clean and responsive design. Built
        with React and TypeScript, it showcases modern web development
        practices while offering a seamless user experience. Start
        organizing your tasks today and take control of your to-do
        list!
      </p>
    </div>
  );
}

export default HomePage;
