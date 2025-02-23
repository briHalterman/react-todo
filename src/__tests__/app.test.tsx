import sortTodos from '../utils/sortTodos';

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
});

