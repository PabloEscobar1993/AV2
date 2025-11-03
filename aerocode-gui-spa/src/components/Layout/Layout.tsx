import { Outlet } from 'react-router-dom';
import Header from '../Navigation/Header'; // Vamos criar em seguida
import Sidebar from '../Navigation/Sidebar'; // Vamos criar em seguida
import './Layout.css'; // Para estilos básicos (opcional)

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <Header />
        <main className="content">
          {/* O Outlet renderiza o componente de página correspondente à rota atual (Dashboard ou ProductionManagement) */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;