import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="flex gap-4 p-4 bg-gray-200">
      <Link to="/todos">Todos</Link>
      <Link to="/add-todo">Add Todo</Link>
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
