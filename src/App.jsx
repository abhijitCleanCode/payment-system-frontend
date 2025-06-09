import { Route, Routes } from "react-router-dom";

// pages
import { Login } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
