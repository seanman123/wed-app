import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  );
}

export default App;
