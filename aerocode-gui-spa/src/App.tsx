import { Routes, Route, Navigate } from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard';
import ProductionManagement from './pages/ProductionManagement';
import UserList from './pages/UserManagement';
import UserManagement from './pages/UserManagement'; 
import AircraftCatalog from './pages/AircraftCatalog';



const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth_token'); 

  if (!isAuthenticated) {
    
    return <Navigate to="/" replace />; 
  }
  return <>{children}</>; 
};


function App() {
  return (
    <Routes>
      
      {/* 1. Rota de Login  */}
      <Route path="/" element={<Login />} />
      
      {/* 2. Rota Protegida */}
      <Route 
        path="/app/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Rotas aninhadas que usam o Layout */}
        <Route index element={<Dashboard />} /> {/* /app/ */}
        <Route path="production" element={<ProductionManagement />} /> {}
        <Route path="users/new" element={<UserManagement />} /> {}
        
        {/* Rotas de Usuários */}
        <Route path="users" element={<UserList />} />          {}

        {/* Rota para Catálogo de Aeronaves */}
        <Route path="catalog/aircraft" element={<AircraftCatalog />} /> {}


        <Route path="*" element={<h1>Página Não Encontrada (404)</h1>} />
      </Route>

      {}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;