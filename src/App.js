import './App.css';
import Header from './MyComponents/Header';
import { AddTodo } from './MyComponents/AddTodo';
import Todos from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import About from './MyComponents/About';
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  let initTodo
  if (localStorage.getItem("todos") === null) {
    initTodo = []
  }
  else {
    initTodo =JSON.parse(localStorage.getItem("todos"))
  }

  const onDelete = (todo) => {
    console.log("I am onDelete", todo)

    setTodos(todos.filter((e) => {
      return e !== todo
    }))
    localStorage.getItem("todos")
  };

  const addTodo = (title, desc) => {
    console.log("I am adding this todo : ", title, desc)
    let sno
    if (todos.length !== 0) {
      sno = todos[todos.length - 1].sno + 1
    }
    else {
      sno = 1
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo])
    console.log(myTodo)

    localStorage.setItem("todos", JSON.stringify(todos))

  }
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
    <BrowserRouter>
      <Header title="Todos List" searchBar={false} />
      
    <Routes>
    <Route path="/" element={
    <>
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
    </>
    }>      
    </Route>
    <Route path="about" element={<About />} />
    </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
