import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', time: '' });

  useEffect(() => {
    // Fetch todos from the backend
    axios.get('/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTodo = () => {
    // Send a POST request to add a new todo
    axios.post('/api/todos', newTodo)
      .then(res => {
        console.log('New Todo:', res.data);
        setTodos([...todos, res.data]);
        setNewTodo({ title: '', description: '', time: '' });
      })
      .catch(err => console.error(err));
  };

  const updateTodo = (id) => {
    // Send a PUT request to update a todo
    axios.put(`/api/todos/${id}`, newTodo)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  const deleteTodo = (id) => {
    // Send a DELETE request to delete a todo
    axios.delete(`/api/todos/${id}`)
      .then(res => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.time}</td>
              <td>
                <button onClick={() => updateTodo(todo._id)}>Edit</button>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add Todo</h2>
        <label>Title: <input type="text" value={newTodo.title} onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })} /></label>
        <label>Description: <input type="text" value={newTodo.description} onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })} /></label>
        <label>Time: <input type="text" value={newTodo.time} onChange={(e) => setNewTodo({ ...newTodo, time: e.target.value })} /></label>
        <button onClick={addTodo}>Add</button>
      </div>
    </div>
  );
}

export default App;
