import { Routes, Route, Navigate } from 'react-router-dom'; // Importe Navigate
import Layout from './components/Layout/Layout';
import Login from './pages/Login'; // <--- Importação do Login
import Dashboard from './pages/Dashboard';
import ProductionManagement from './pages/ProductionManagement';
//import UserRegistration from './pages/UserRegistration';
import UserList from './pages/UserManagement';
import UserManagement from './pages/UserManagement'; // <--- Nova Importação
import AircraftCatalog from './pages/AircraftCatalog';


// Componente de guarda de rota para simular a proteção
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth_token'); // Verifica se há um token

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para o login
    return <Navigate to="/" replace />; 
  }
  return <>{children}</>; // Se estiver autenticado, renderiza o componente filho
};


function App() {
  return (
    <Routes>
      
      {/* 1. Rota de Login (Ponto de entrada) */}
      <Route path="/" element={<Login />} />
      
      {/* 2. Rota Protegida (Tudo que exige Login) */}
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
        <Route path="production" element={<ProductionManagement />} /> {/* /app/production */}
        <Route path="users/new" element={<UserManagement />} /> {/* /app/users/new */}
        
        {/* Rotas de Usuários */}
        <Route path="users" element={<UserList />} />          {/* <--- Nova Rota: /app/users */}

        {/* Rota para o novo Catálogo de Aeronaves */}
        <Route path="catalog/aircraft" element={<AircraftCatalog />} /> {/* <--- Nova Rota */}


        <Route path="*" element={<h1>Página Não Encontrada (404)</h1>} />
      </Route>

      {/* Rota de fallback caso o usuário tente acessar algo fora do /app/ e não seja o / */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;