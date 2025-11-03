import React, { useState } from 'react';

// =========================================================
// 1. Definição de Propriedades
// =========================================================

interface UserRegistrationProps {
    // Função chamada após o cadastro bem-sucedido para notificar o componente pai
    onRegistrationSuccess: () => void; 
}

// =========================================================
// 2. Componente de Cadastro
// =========================================================

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegistrationSuccess }) => {
  // Estados para capturar os dados do formulário
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('engenheiro_producao'); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Erro: Usuário e Senha são obrigatórios.');
      return;
    }

    // SIMULAÇÃO: Aqui os dados seriam enviados para o Back-end/API
    console.log({ username, password, role });

    alert(`✅ Funcionário "${username}" (Função: ${role}) cadastrado com sucesso!`);

    // Chamar o callback para retornar à lista
    onRegistrationSuccess();
    
    // Limpar o formulário (opcional, já que a view irá mudar, mas boa prática)
    setUsername('');
    setPassword('');
    setRole('engenheiro_producao');
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    marginBottom: '20px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      {/* O H1 e a descrição da página de cadastro foram movidos para o UserManagement.tsx */}

      <form onSubmit={handleSubmit}>
        
        {/* Campo Usuário/Login */}
        <div>
          <label htmlFor="username" style={labelStyle}>Usuário (Login)</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            placeholder="Ex: joao.silva"
            required
          />
        </div>

        {/* Campo Senha */}
        <div>
          <label htmlFor="password" style={labelStyle}>Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="Mínimo 8 caracteres"
            required
          />
        </div>

        {/* Campo Função/Perfil de Acesso */}
        <div>
          <label htmlFor="role" style={labelStyle}>Função/Perfil</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          >
            <option value="engenheiro_producao">Engenheiro de Produção</option>
            <option value="engenheiro_aeronautico">Engenheiro Aeronáutico</option>
            <option value="administrador">Administrador de Sistema</option>
            <option value="supervisor_qualidade">Supervisor de Qualidade</option>
          </select>
        </div>

        {/* Botão de Submissão */}
        <button 
          type="submit"
          style={{ 
            backgroundColor: '#2ecc71', // Verde
            color: 'white', 
            fontWeight: 'bold', 
            padding: '12px 20px', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Cadastrar Funcionário
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;