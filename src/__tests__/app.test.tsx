import sortTodos from '../utils/sortTodos';

// Mock fetch globally
global.fetch = jest.fn();

// Unit Tests
// - Test sorting function ✓
// Todo: Test API logic

describe('sortTodos', () => {
  const testTodos = [
    { id: '1', title: 'Road to React Lesson' },
    { id: '2', title: 'Coding Assignment' },
    { id: '3', title: 'Mindset Assignment' },
  ];

  test('sorts todos in ascending order', () => {
    const sorted = sortTodos(testTodos, true);
    expect(sorted.map((todo) => todo.title)).toEqual([
      'Coding Assignment',
      'Mindset Assignment',
      'Road to React Lesson',
    ]);
  });

  test('sorts todos in descending order', () => {
    const sorted = sortTodos(testTodos, false);
    expect(sorted.map((todo) => todo.title)).toEqual([
      'Road to React Lesson',
      'Mindset Assignment',
      'Coding Assignment',
    ]);
  });
});

//  Component Tests
// - TodoList
// - AddTodoForm
// - TodoContainer
// - Input with Label



// Snapshot
