import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [todos, setTodos] = useState([]);
  const [inputTodos, setinputTodos] = useState("");
  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const addTodos = () => {
    setTodos([{ title: inputTodos, completed: false }, ...todos]);
    setinputTodos("");
  };
  const setCompleted = (index) => {
    setTodos(
      todos.map((todo, toDoIndex) => {
        return toDoIndex === index
          ? { ...todo, completed: !todo.completed }
          : todo;
      })
    );
  };
  const deleteTodo = (index) => {
    setTodos(
      todos.filter((todo, toDoIndex) => {
        return toDoIndex !== index;
      })
    );
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);
  return (
    <div className="App">
      <h1 className="head">To Do List</h1>
      <input
        type="text"
        placeholder="add task"
        onChange={(e) => setinputTodos(e.target.value)}
        value={inputTodos}
      />
      <button
        disabled={inputTodos.length === 0}
        className="addtask"
        onClick={addTodos}
      >
        {" "}
        +{" "}
      </button>
      <button className="save" onClick={saveTodos}>
        Save todos
      </button>

      <ol>
        {todos.map((todo, index) => {
          return (
            <li>
              <input
                type="checkbox"
                className="inputbox"
                checked={todo.completed}
                onClick={() => setCompleted(index)}
              />
              {todo.title}
              <button className="delete" onClick={() => deleteTodo(index)}>
                delete
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default App;
