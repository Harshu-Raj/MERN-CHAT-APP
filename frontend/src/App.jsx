import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
// import UserLogin from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Registration";
import Chat from "./components/chat/Chat";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Use 'element' instead of 'component' */}
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Chat />} />

      </Routes>

    </Router>
  );
}


export default App;
