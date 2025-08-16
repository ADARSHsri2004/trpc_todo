import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// pages
import Login from "./pages/Auth/SignIn";
import Register from "./pages/Auth/SignUp";
import TodoList from "./pages/Todos/TodoList";
import CreateTodo from "./pages/Todos/CreateTodo";
import TodoById from "./pages/Todos/TodoById";
import UpdateTodo from "./pages/Todos/UpdateTodo";
import DeleteTodo from "./pages/Todos/DeleteTodo";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private */}
        {token ? (
          <>
            <Route
              path="/todos"
              element={
                <>
                  <Navbar />
                  <TodoList />
                </>
              }
            />
            <Route
              path="/add-todo"
              element={
                <>
                  <Navbar />
                  <CreateTodo />
                </>
              }
            />
            <Route
              path="/update-todo"
              element={
                <>
                  <Navbar />
                  <UpdateTodo />
                </>
              }
            />
            <Route
              path="/delete-todo"
              element={
                <>
                  <Navbar />
                  <DeleteTodo />
                </>
              }
            />
            <Route
              path="/todo/:id"
              element={
                <>
                  <Navbar />
                  <TodoById />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/todos" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/register" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

