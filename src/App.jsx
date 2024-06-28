import { useState } from 'react'
import './App.css'
import { TodoProvider } from './Contexts'
import { useEffect } from 'react'
import { TodoForm, TodoItem } from './Components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../fontAwesome'
function App() {
  const [todos, setTodos] = useState([])
  const [mode, setMode] = useState(true)

  const addTodos = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updatedTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }
  const deletedTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => (prevTodo.id !== id)))
  }
  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((prevTods) => (
      prevTods.id === id ? { ...prevTods, checked: !prevTods.checked } : prevTods
    )))
  }
  // Get todos Data in localStorge
  useEffect(() => {
    const localstorgeTodo = JSON.parse(localStorage.getItem("todos"))
    if (localstorgeTodo && localstorgeTodo.length > 0) {
      setTodos(localstorgeTodo)
    }

  }, [])

  //Store todos data in loaclStorge

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  console.log("mode");
  return (
    <TodoProvider value={{ todos, addTodos, updatedTodo, deletedTodo, toggleTodo }}>
      <div className={`${(mode) ? 'bg-[#F4F4F6]' : 'bg-[#181B20]'} min-h-screen py-8`}>
        <div className={`w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 ${(mode) ? 'text-[#181B20]' : 'text-[#F4F4f6]'}`}>
          <div className='text-center'>
            <h1 className="text-2xl font-bold justify-center mb-8 mt-2 inline-flex">Manage Your Todos</h1>
            <span>{mode ?
              <FontAwesomeIcon
                icon={"sun"}
                className='px-3'
                style={{ fontSize: "1.5rem" }}
                onClick={() => setMode(!mode)} />
              : <FontAwesomeIcon
                className='px-3'
                icon={"moon"}
                style={{ fontSize: "1.5rem" }}
                onClick={() => setMode(!mode)} />}</span>
          </div>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((item) => (
              <div
                key={item.id}
                className='w-full'>
                <TodoItem todo={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider >
  )
}

export default App
