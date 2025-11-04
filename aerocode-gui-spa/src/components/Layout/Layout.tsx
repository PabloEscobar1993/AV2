import { Outlet } from 'react-router-dom';
import Header from '../Navigation/Header'; 
import Sidebar from '../Navigation/Sidebar'; 
import './Layout.css'; 

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <Header />
        <main className="content">
          
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;