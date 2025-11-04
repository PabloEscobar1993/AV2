import { Link, useNavigate } from 'react-router-dom'; // 

const Sidebar = () => {
    
    const navigate = useNavigate(); 
    
    
    const handleLogout = () => {
        localStorage.removeItem('auth_token'); 
        navigate('/'); 
    };

    return (
        <nav className="sidebar-nav">
            <h3 style={{ marginBottom: '30px', color: '#fff' }}>Menu Principal</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}>
                    <Link to="/app/">Dashboard</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <Link to="/app/production">Gestão de Produção</Link>
                </li>

                {/* BOTÃO Gerenciar Funcionários */}
                <li style={{ marginBottom: '10px', marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
                    <Link to="/app/users">👥 Gerenciar Funcionários</Link> 
                </li>
                

                <li style={{ marginBottom: '10px' }}>
                    <Link to="/app/catalog/aircraft">🛩️ Catálogo de Aeronaves</Link> 
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <button 
                        onClick={handleLogout} 
                        style={{ 
                            
                            backgroundColor: '#e74c3c', 
                            color: 'white', 
                            padding: '8px 15px',
                            width: '100%', 
                            textAlign: 'left',
                            border: 'none',
                            marginTop: '15px'
                        }}
                    >
                        Sair (Logout)
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;