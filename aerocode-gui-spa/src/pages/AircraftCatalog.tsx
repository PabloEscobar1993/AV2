import React, { useState } from 'react';

// =========================================================
// 1. Tipos e Dados
// =========================================================

interface AircraftModel {
  code: string;
  name: string;
  capacity: number; 
  type: string;     
  registrationDate: string;
}

const mockAircrafts: AircraftModel[] = [
  { code: 'A001', name: 'F-18', capacity: 180, type: 'Militar', registrationDate: '2025-05-01' },
  { code: 'B-002', name: 'Bravo 700', capacity: 4, type: 'Carga(escobar)', registrationDate: '2025-06-15' },
  { code: 'C-003', name: 'Boeing 777', capacity: 350, type: 'Comercial', registrationDate: '2025-07-20' },
  { code: 'D-004', name: '14-Bis', capacity: 2, type: 'Treinamento', registrationDate: '2025-08-01' },
];

// =========================================================
// 2. Componente de Formulário de Cadastro de Aeronave
// =========================================================

interface AircraftFormProps {
    onNewAircraftAdded: (model: AircraftModel) => void;
}

const AircraftRegistrationForm: React.FC<AircraftFormProps> = ({ onNewAircraftAdded }) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [capacity, setCapacity] = useState<number>(0);
    const [type, setType] = useState('Comercial');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !code || capacity <= 0) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const newAircraft: AircraftModel = {
            code: code.toUpperCase(),
            name,
            capacity,
            type,
            registrationDate: new Date().toISOString().slice(0, 10),
        };
        
        // cadastro
        onNewAircraftAdded(newAircraft); 
        alert(`✅ Modelo "${newAircraft.name}" cadastrado com sucesso!`);
        
        
        setName('');
        setCode('');
        setCapacity(0);
        setType('Comercial');
    };
    
    const inputStyle: React.CSSProperties = { padding: '8px', margin: '5px 0 15px 0', width: '100%', borderRadius: '4px', border: '1px solid #ccc' };
    
    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '20px', color: '#34495e' }}>Adicionar Novo Modelo</h3>
            <form onSubmit={handleSubmit}>
                <label style={{ fontWeight: 'bold' }}>Nome do Modelo:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />

                <label style={{ fontWeight: 'bold' }}>Código Interno:</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} style={inputStyle} placeholder="Ex: X-001" required />
                
                <label style={{ fontWeight: 'bold' }}>Capacidade/Carga (Unidades):</label>
                <input type="number" value={capacity || ''} onChange={(e) => setCapacity(parseInt(e.target.value) || 0)} style={inputStyle} required min="1" />
                
                <label style={{ fontWeight: 'bold' }}>Tipo:</label>
                <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
                    <option value="Comercial">Comercial</option>
                    <option value="Carga">Carga</option>
                    <option value="Treinamento">Treinamento</option>
                </select>

                <button type="submit" style={{ backgroundColor: '#27ae60', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', marginTop: '10px' }}>
                    Cadastrar Modelo
                </button>
            </form>
        </div>
    );
};

// =========================================================
// 3. Componente Principal (AircraftCatalog)
// =========================================================

const AircraftCatalog: React.FC = () => {
    const [aircrafts, setAircrafts] = useState<AircraftModel[]>(mockAircrafts);
    
    const handleNewAircraftAdded = (newModel: AircraftModel) => {
        // Adiciona o novo modelo ao estado
        setAircrafts([newModel, ...aircrafts]);
    };
    
    return (
        <div>
            <h1 style={{fontSize: '2em', color: '#2c3e50', marginBottom: '10px'}}>🛩️ Catálogo de Modelos de Aeronaves</h1>
            <p style={{marginBottom: '30px', color: '#666', fontSize: '1.1em'}}>Gerencie os tipos de aeronaves que podem ser produzidas.</p>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                
                {/* COLUNA 1: Formulário de Cadastro */}
                <div style={{ flex: '0 0 400px' }}>
                    <AircraftRegistrationForm onNewAircraftAdded={handleNewAircraftAdded} />
                </div>

                {/* COLUNA 2: Lista/Tabela de Modelos Existentes */}
                <div style={{ flex: '1' }}>
                    <h3 style={{ marginBottom: '20px', color: '#34495e' }}>Modelos Atuais ({aircrafts.length})</h3>
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f5f5f5' }}>
                                    <th style={{ padding: '15px' }}>Código</th>
                                    <th style={{ padding: '15px' }}>Nome do Modelo</th>
                                    <th style={{ padding: '15px' }}>Capacidade</th>
                                    <th style={{ padding: '15px' }}>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aircrafts.map((model) => (
                                    <tr key={model.code} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '15px', fontWeight: 'bold' }}>{model.code}</td>
                                        <td style={{ padding: '15px' }}>{model.name}</td>
                                        <td style={{ padding: '15px' }}>{model.capacity}</td>
                                        <td style={{ padding: '15px' }}>{model.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default AircraftCatalog;