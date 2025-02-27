# Todo List

## Project Overview
This is a simple and intuitive Todo List Application built with React, TypeScript, and Vite. The app allows users to add, remove, and sort tasks.

## Project Structure
```
react-todo/
├── public/
├── src/
│   ├── components/
│   │   ├── AddTodoForm/
│   │   │   ├── AddTodoForm.module.css
│   │   │   └── AddTodoForm.tsx
│   │   ├── Footer/
│   │   │   ├── Footer.module.css
│   │   │   └── Footer.tsx
│   │   ├── HomePage/
│   │   │   ├── HomePage.module.css
│   │   │   └── HomePage.tsx
│   │   ├── InputWithLabel/
│   │   │   ├── InputWithLabel.module.css
│   │   │   └── InputWithLabel.tsx
│   │   ├── Navbar/
│   │   │   ├── Navbar.module.css
│   │   │   └── Navbar.tsx
│   │   ├── TodoContainer/
│   │   │   ├── TodoContainer.module.css
│   │   │   └── TodoContainer.tsx
│   │   ├── TodoList/
│   │   │   ├── TodoList.module.css
│   │   │   └── TodoList.tsx
│   │   └── TodoListItem/
│   │       ├── TodoListItem.module.css
│   │       └── TodoListItem.tsx
│   ├── styles/
│   ├── utils/
│   ├── __tests__/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Installation & Setup

### Clone the repository
```
git clone https://github.com/briHalterman/react-todo.git
cd react-todo
```
### Install Dependencies
```
npm install
```
### Start the Development Server
```
npm run dev
```
### Visit the app in your browser
Navigate to http://localhost:5173/ to use the app.

## Planned Improvements
- Implement Update Todo Feature
- Implement Sorting by Date Created
- Compose Jest Component Tests