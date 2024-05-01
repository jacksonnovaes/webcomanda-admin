import './App.css';
import { Route, Routes } from 'react-router-dom';
import FormLogin from './pages/Login/login';
import Home from './pages/Home/home';

function App() {
  return (
  <Routes>
    <Route path="/" element={<FormLogin />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<FormLogin />} />
  </Routes>
  );
}

export default App;