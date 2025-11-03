import { Link, useNavigate } from 'react-router-dom'; // 1. IMPORTAR useNavigate AQUI!

const Sidebar = () => {
    // 2. INICIALIZAR useNavigate AQUI!
    const navigate = useNavigate(); 
    
    // Função de Logout para simplificar o clique
    const handleLogout = () => {
        localStorage.removeItem('auth_token'); // Remove o token
        navigate('/'); // Redireciona para a rota de Login
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

                {/* BOTÃO ÚNICO: Gerenciar Funcionários */}
                <li style={{ marginBottom: '10px', marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
                    <Link to="/app/users">👥 Gerenciar Funcionários</Link> {/* <--- LINK ÚNICO */}
                </li>
                {/* Fim do Novo Grupo */}

                <li style={{ marginBottom: '10px' }}>
                    <Link to="/app/catalog/aircraft">🛩️ Catálogo de Aeronaves</Link> {/* <--- NOVO LINK */}
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <button 
                        onClick={handleLogout} // CHAMANDO A FUNÇÃO handleLogout
                        style={{ 
                            /* Estilos de botão simples para Logout */
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