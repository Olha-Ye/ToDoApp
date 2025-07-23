
import React from 'react';

export default function ToDoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        id={`checkbox-${todo.id}`}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <label
        htmlFor={`checkbox-${todo.id}`}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </label>
      <button onClick={() => onDelete(todo.id)}>Löschen</button>
    </li>
  );
}