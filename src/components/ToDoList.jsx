
import React, { useReducer, useState } from 'react';
import ToDoItem from './ToDoItem';

const initialState = [];

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.payload,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function ToDoList() {
  const [input, setInput] = useState('');
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    dispatch({ type: 'ADD_TODO', payload: trimmed });
    setInput('');
  }

  function handleToggle(id) {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }

  function handleDelete(id) {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }

  return (
    <div>
      <h1>Todo-Liste</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Neues ToDo"
        />
        <button type="submit">Hinzufügen</button>
      </form>
      <ul>
        {todos.map(todo => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}