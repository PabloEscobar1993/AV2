import React, { useState } from 'react';
import UserRegistration from './UserRegistration'; 


// 1. Tipos e Dados 
type UserStatus = 'Ativo' | 'Inativo' | 'Suspenso';

interface User {
  id: number;
  username: string;
  fullName: string;
  role: string;
  status: UserStatus;
  registrationDate: string;
}

const mockUsers: User[] = [
  { id: 101, username: 'Gerson', fullName: 'Gerson Penha', role: 'Administrador de Sistema', status: 'Ativo', registrationDate: '2025-01-10' },
  { id: 102, username: 'Yago', fullName: 'Yago Pikachu', role: 'Engenheiro de Produção', status: 'Ativo', registrationDate: '2025-02-25' },
  { id: 103, username: 'Blade', fullName: 'Blade ', role: 'Engenheiro Aeronáutico', status: 'Ativo', registrationDate: '2025-03-01' },
  { id: 104, username: 'Constantine', fullName: 'John Constantine', role: 'Supervisor de Qualidade', status: 'Inativo', registrationDate: '2025-04-15' },
];

const getStatusColor = (status: UserStatus) => {
    switch (status) {
        case 'Ativo': return '#2ecc71'; 
        case 'Inativo': return '#e74c3c'; 
        case 'Suspenso': return '#f39c12'; 
        default: return '#95a5a6';
    }
};

// =========================================================
// 2. Sub-Componente: Visualização da Lista (Tabela)
// =========================================================


const UserListView: React.FC<{ users: User[], onRegisterClick: () => void }> = ({ users, onRegisterClick }) => {
    
    const handleEdit = (userId: number) => alert(`Simulando edição do usuário ID: ${userId}`);
    const handleDeactivate = (userId: number) => alert(`Simulando desativação do usuário ID: ${userId}`);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{fontSize: '2em', color: '#2c3e50', margin: 0}}>📋 Lista de Funcionários</h1>
                <button 
                    onClick={onRegisterClick}
                    style={{ 
                        backgroundColor: '#2980b9', 
                        color: 'white', 
                        fontWeight: 'bold', 
                        padding: '10px 20px', 
                        border: 'none',
                        borderRadius: '4px',
                    }}
                >
                    + Cadastrar Novo Funcionário
                </button>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f5f5f5' }}>
                            <th style={{ padding: '15px' }}>ID</th>
                            <th style={{ padding: '15px' }}>Usuário</th>
                            <th style={{ padding: '15px' }}>Nome Completo</th>
                            <th style={{ padding: '15px' }}>Função</th>
                            <th style={{ padding: '15px' }}>Status</th>
                            <th style={{ padding: '15px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '15px' }}>{user.id}</td>
                                <td style={{ padding: '15px', fontWeight: 'bold' }}>{user.username}</td>
                                <td style={{ padding: '15px' }}>{user.fullName}</td>
                                <td style={{ padding: '15px' }}>{user.role}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ color: getStatusColor(user.status), fontWeight: 'bold' }}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <button onClick={() => handleEdit(user.id)} style={{ padding: '8px', marginRight: '5px', backgroundColor: '#f1c40f', color: 'black', border: 'none', borderRadius: '4px' }}>Editar</button>
                                    <button onClick={() => handleDeactivate(user.id)} disabled={user.status !== 'Ativo'} style={{ padding: '8px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px' }}>Desativar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

// =========================================================
// 3. Componente de Gerenciamento Unificado (UserManagement)
// =========================================================

const UserManagement: React.FC = () => {
    
    const [view, setView] = useState<'list' | 'register'>('list');

    return (
        <div>
            {/* --------------------- VISÃO DE LISTA --------------------- */}
            {view === 'list' && (
                <UserListView 
                    users={mockUsers} 
                    onRegisterClick={() => setView('register')} 
                />
            )}
            
            {/* --------------------- VISÃO DE CADASTRO --------------------- */}
            {view === 'register' && (
                <div style={{maxWidth: '600px'}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h1 style={{fontSize: '2em', color: '#2c3e50', margin: 0}}>👥 Cadastro de Novo Funcionário</h1>
                        <button 
                            onClick={() => setView('list')}
                            style={{ 
                                backgroundColor: '#95a5a6', 
                                color: 'white', 
                                padding: '10px 20px', 
                                border: 'none',
                                borderRadius: '4px',
                            }}
                        >
                            ← Voltar para a Lista
                        </button>
                    </div>
                    {/* Renderiza o formulário de cadastro, passando o callback para retornar à lista */}
                    <UserRegistration onRegistrationSuccess={() => setView('list')} /> 
                </div>
            )}
        </div>
    );
};

export default UserManagement;