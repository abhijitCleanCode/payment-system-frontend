import { Route, Routes } from "react-router-dom";

// pages
import { AdminRegistration, Home, Login } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
