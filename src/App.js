import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Engines from './pages/Engines';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Reports from './pages/Reports';
import TableMonitoring from './pages/TableMonitoring';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/" />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/table" element={<TableMonitoring />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/machines" element={<Engines />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
    </Routes>
  );
};

export default App;
