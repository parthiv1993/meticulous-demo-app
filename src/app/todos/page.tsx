// app/todos/page.tsx
'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function TodoPage() {
  const [todos, setTodos] = useState<Array<{ id: number; text: string; completed: boolean }>>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoaded, setIsLoaded] = useState(false); // Add this flag

  // Load from localStorage on mount (only once)
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
        setTodos([]);
      }
    }
    setIsLoaded(true); // Mark as loaded
  }, []);

  // Save to localStorage only after initial load and when todos change
  useEffect(() => {
    if (isLoaded) { // Only save after we've loaded from localStorage
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // ... rest of your component code remains the same
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{padding: 32, maxWidth: 600, margin: '0 auto'}}>
      <Link href="/" style={{color: '#007bff', textDecoration: 'none'}}>← Back to Home</Link>
      
      <h1 style={{color: '#333', marginBottom: 32}}>📝 Todo List</h1>
      
      <div style={{display: 'flex', marginBottom: 24}}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: 12,
            border: '2px solid #ddd',
            borderRadius: '8px 0 0 8px',
            fontSize: 16
          }}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '12px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            cursor: 'pointer'
          }}
        >
          ➕
        </button>
      </div>

      <div>
        {todos.length === 0 ? (
          <p style={{textAlign: 'center', color: '#666', fontStyle: 'italic'}}>
            No todos yet. Add one above! 🎯
          </p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 12,
                marginBottom: 8,
                background: todo.completed ? '#f8f9fa' : 'white',
                border: '1px solid #ddd',
                borderRadius: 8,
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{marginRight: 12}}
              />
              <span style={{flex: 1, color: todo.completed ? '#666' : '#333'}}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
      
      <p style={{marginTop: 24, color: '#666', textAlign: 'center'}}>
        Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}
      </p>
    </div>
  );
}
