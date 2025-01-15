import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CreateProduct from './pages/CreateProduct';
import ProductsList from './pages/ProductsList';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';


function App() {
  return (
    <Router>
       <Navbar/>
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateProduct />} />
          <Route path="products" element={<ProductsList />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
