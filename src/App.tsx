import { Routes, Route, Navigate } from "react-router";
import Register from "./pages/register";
import AppLayout from "./layout/appLayout";
import Login from "./pages/login";
import { jwtDecode } from "jwt-decode";
import Books from "./pages/books";
import AddBook from "./pages/addBook";
import Members from "./pages/members";
import Transactions from "./pages/transactions";
import AddTransaction from "./pages/addTransaction";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  let decodedToken = null;
  try {
    decodedToken = token && jwtDecode(token);
    console.log({ decodedToken });
  } catch (err) {
    console.log(err);
  }

  // if token is valid, redirect to main app
  // if token is invalid, redirect to login
  return decodedToken ? <AppLayout /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoutes />}>
        {/* These routes is rendered by Outlet in AppLayout */}
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<AddBook />} />
        <Route path="/members" element={<Members />} />
        {/* <Route path="/add-member" element={<AddMembers />} /> */}
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
      </Route>
      <Route
        path="*"
        element={<p className="text-center">ERROR 404: Page not found!!</p>}
      />
    </Routes>
  );
}

export default App;
