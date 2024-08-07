import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/home';
import FormLogin from './pages/Login/login';
import OpenOrders from './pages/order.tsx/openOrder';
import Products from './pages/Products/product';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/vendas" element={<OpenOrders />} />
      <Route path="/estoque" element={<Products/>} />
      <Route path="/login" element={<FormLogin />} />
    </Routes></>
  );
}

export default App;