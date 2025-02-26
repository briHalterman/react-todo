// sortTodos Utility Function
// - Sorts array of todos by title

// Define Todo Type

type Todo = {
  id: string;
  title: string;
};

// sortTodos Function

const sortTodos = (todos: Todo[], isAscending: boolean): Todo[] => {
  return [...todos].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return isAscending
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });
};

// Export component
export default sortTodos;
