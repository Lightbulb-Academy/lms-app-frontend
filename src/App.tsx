import { Routes, Route } from "react-router";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>LMS APP</h1>
            <p>Coming Soon!!</p>
          </>
        }
      />
      <Route path="/register" element={<Register />} />
      {/* TODO: add route for login page */}
    </Routes>
  );
}

export default App;
