import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Autenticação
    
    if (username === 'admin' && password === '123') {
      
      // Armazena um token fictício no localStorage para simular o estado de "logado"
      localStorage.setItem('auth_token', 'simulated_token_123'); 
      
      alert('Login efetuado com sucesso!');
      
      
      navigate('/app/'); 
      
    } else {
      alert('Erro de login: Usuário ou Senha inválidos. Tente: engenheiro / aero123');
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f7f9',
  };

  const formBoxStyle: React.CSSProperties = {
    width: '400px',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  };
  
  const inputStyle: React.CSSProperties = {
    padding: '12px',
    marginBottom: '20px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ddd',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <div style={formBoxStyle}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '10px', fontSize: '2em' }}>
            Aerocode ✈️
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
            Acesso ao Sistema de Gestão de Produção
        </p>

        <form onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button 
            type="submit"
            style={{ 
              backgroundColor: '#3498db',
              color: 'white', 
              fontWeight: 'bold', 
              padding: '12px', 
              border: 'none', 
              borderRadius: '6px',
              width: '100%',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;