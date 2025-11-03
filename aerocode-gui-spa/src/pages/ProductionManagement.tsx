import React, { useState } from 'react';
import ProductionTimeline, { type ProductionStep } from '../components/WorkFlow/ProductionTimeline'; 

// =========================================================
// 1. Tipos e Mock Data (Base)
// =========================================================

type ProductionStatus = 'Aguardando' | 'Em Produção' | 'Pausado' | 'Concluído' | 'Defeito';

interface Batch {
  id: string;
  model: string;
  quantity: number;
  startDate: string;
  estimatedCompletion: string;
  status: ProductionStatus;
}

// Mocks de Lotes e Workflow (Mantidos)
const mockBatches: Batch[] = [
  { id: 'LOT-A45-001', model: 'AeroCode X-Jet', quantity: 5, startDate: '2025-10-01', estimatedCompletion: '2025-11-15', status: 'Em Produção' },
  { id: 'LOT-A45-002', model: 'AeroCode X-Jet', quantity: 3, startDate: '2025-10-15', estimatedCompletion: '2025-12-05', status: 'Aguardando' },
  { id: 'LOT-B22-010', model: 'Bravo II Light', quantity: 12, startDate: '2025-09-20', estimatedCompletion: '2025-10-30', status: 'Em Produção' },
  { id: 'LOT-C30-005', model: 'Cruiser 300', quantity: 8, startDate: '2025-08-01', estimatedCompletion: '2025-09-30', status: 'Concluído' },
  { id: 'LOT-D15-003', model: 'Delta 15 Trainer', quantity: 10, startDate: '2025-10-25', estimatedCompletion: '2025-12-20', status: 'Pausado' },
];

const mockTimelineSteps: ProductionStep[] = [ 
    { name: 'Montagem da Fuselagem', expectedDurationDays: 15, status: 'Concluída', startDate: '2025-10-01', endDate: '2025-10-15' },
    { name: 'Instalação das Asas', expectedDurationDays: 10, status: 'Concluída', startDate: '2025-10-16', endDate: '2025-10-26' },
    { name: 'Instalação de Motores', expectedDurationDays: 5, status: 'Em Andamento', startDate: '2025-10-27', endDate: null },
    { name: 'Sistemas Eletrônicos', expectedDurationDays: 8, status: 'Pendente', startDate: null, endDate: null },
    { name: 'Pintura e Acabamento', expectedDurationDays: 7, status: 'Pendente', startDate: null, endDate: null },
    { name: 'Testes de Voo', expectedDurationDays: 4, status: 'Pendente', startDate: null, endDate: null },
];

const statusColors: Record<ProductionStatus, string> = {
  'Aguardando': '#f39c12', 
  'Em Produção': '#3498db', 
  'Pausado': '#e74c3c',    
  'Concluído': '#2ecc71',  
  'Defeito': '#95a5a6',    
};

// Mocks de Modelos de Aeronaves (para o formulário)
const mockAircraftModels = [
    { name: 'AeroCode X-Jet', code: 'AC-XJ', type: 'Comercial' },
    { name: 'Bravo II Light', code: 'B-II-L', type: 'Treinamento' },
    { name: 'Cruiser 300', code: 'C-300', type: 'Carga' },
    { name: 'Falcon Fighter', code: 'FF-22', type: 'Militar' },
];


// =========================================================
// 2. Componente da Tabela (ProductionTable) - Mantido
// =========================================================

const ProductionTable: React.FC<{ batches: Batch[], onViewTimeline: (batchId: string) => void }> = ({ batches, onViewTimeline }) => {

    const handleAction = (batchId: string, action: string) => {
        alert(`Ação "${action}" solicitada para o Lote: ${batchId}`);
    };
    
    // Função para simular a busca pela etapa atual
    const getCurrentStepDisplay = (batchStatus: ProductionStatus): string => {
        if (batchStatus === 'Concluído') return 'Finalizado';
        if (batchStatus === 'Pausado') return 'Pausado';
        if (batchStatus === 'Aguardando') return 'Aguardando Início';
        
        const currentStep = mockTimelineSteps.find(step => step.status === 'Em Andamento');
        
        return currentStep ? currentStep.name : 'Início de Produção';
    };


    return (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '15px' }}>ID do Lote</th>
                        <th style={{ padding: '15px' }}>Modelo</th>
                        <th style={{ padding: '15px' }}>Quantidade</th>
                        <th style={{ padding: '15px' }}>Início</th>
                        <th style={{ padding: '15px' }}>Etapa Atual</th> 
                        <th style={{ padding: '15px' }}>Workflow</th> 
                        <th style={{ padding: '15px' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {batches.map((batch) => (
                        <tr key={batch.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '15px', fontWeight: 'bold' }}>{batch.id}</td>
                            <td style={{ padding: '15px' }}>{batch.model}</td>
                            <td style={{ padding: '15px' }}>{batch.quantity}</td>
                            <td style={{ padding: '15px' }}>{batch.startDate}</td>
                            {/* CÉLULA DA ETAPA ATUAL */}
                            <td style={{ padding: '15px' }}>
                                <span style={{ 
                                    color: statusColors[batch.status], 
                                    padding: '5px 0', 
                                    fontWeight: 'bold',
                                    fontSize: '0.95em'
                                }}>
                                    {getCurrentStepDisplay(batch.status)} 
                                </span>
                            </td>
                            {/* Célula do Workflow */}
                            <td style={{ padding: '15px' }}>
                                <button 
                                    onClick={() => onViewTimeline(batch.id)} 
                                    style={{ 
                                        padding: '8px 12px', 
                                        backgroundColor: '#16a085', 
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.9em'
                                    }}
                                >
                                    Ver Detalhes 
                                </button>
                            </td>
                            {/* Botões de Ação */}
                            <td style={{ padding: '15px' }}>
                                {batch.status !== 'Concluído' && (
                                    <>
                                        <button onClick={() => handleAction(batch.id, 'Iniciar/Pausar')} style={{ padding: '8px 12px', marginRight: '8px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}>
                                            {batch.status === 'Em Produção' ? 'Pausar' : 'Iniciar'}
                                        </button>
                                        <button onClick={() => handleAction(batch.id, 'Finalizar')} style={{ padding: '8px 12px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px' }}>
                                            Finalizar
                                        </button>
                                    </>
                                )}
                                {batch.status === 'Concluído' && <span style={{ color: '#2ecc71' }}>✅ Concluído</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


// =========================================================
// 3. Componente de Formulário de Novo Lote
// =========================================================

interface NewBatchFormData {
    model: string;
    quantity: number;
}

const NewBatchForm: React.FC<{ onClose: () => void, onBatchSubmit: (data: NewBatchFormData) => void }> = ({ onClose, onBatchSubmit }) => {
    const [selectedModel, setSelectedModel] = useState(mockAircraftModels[0].name);
    const [quantity, setQuantity] = useState(1);
    
    // Simulação dos campos adicionais solicitados pelo usuário, populados com base na seleção
    const currentModelDetails = mockAircraftModels.find(m => m.name === selectedModel);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (quantity <= 0) {
            alert("A quantidade deve ser maior que zero.");
            return;
        }

        onBatchSubmit({ model: selectedModel, quantity });
        onClose();
    };

    const inputStyle: React.CSSProperties = { padding: '8px', margin: '5px 0 15px 0', width: '100%', borderRadius: '4px', border: '1px solid #ccc' };
    const detailStyle: React.CSSProperties = { margin: '5px 0 15px 0', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Cadastrar Novo Lote de Produção</h2>

            {/* 1. SELEÇÃO DO MODELO (Nome do Modelo + Código Interno) */}
            <label style={{ fontWeight: 'bold' }}>1. Modelo de Aeronave (Nome/Código):</label>
            <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)} 
                style={inputStyle}
                required
            >
                {mockAircraftModels.map(model => (
                    <option key={model.code} value={model.name}>
                        {model.name} ({model.code})
                    </option>
                ))}
            </select>

            {/* Simulação dos campos Capacidade/Carga e Tipo (ReadOnly, provenientes do Catálogo) */}
            <div style={{ fontSize: '0.9em', color: '#555', marginBottom: '10px' }}>
                <p style={{ margin: '5px 0' }}>**Código Interno:** <strong style={{color: '#333'}}>{currentModelDetails?.code}</strong></p>
                <p style={{ margin: '5px 0' }}>**Tipo (Comercial/Militar):** <strong style={{color: '#333'}}>{currentModelDetails?.type}</strong></p>
                {/* Nota: A Capacidade/Carga seria um campo do Catálogo, omitido aqui por simplificação do mock, mas o campo de Tipo está presente. */}
            </div>

            {/* 2. QUANTIDADE (Propriedade do Lote) */}
            <label style={{ fontWeight: 'bold' }}>2. Quantidade de Aeronaves no Lote:</label>
            <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} 
                style={inputStyle} 
                min="1"
                required
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                <button type="button" onClick={onClose} style={{ padding: '10px 15px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Cancelar
                </button>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Criar Lote
                </button>
            </div>
        </form>
    );
};


// =========================================================
// 4. Componente Principal (Página) com Lógica de Modal
// =========================================================

const ProductionManagement: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para controlar os modais
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null); // Modal Workflow
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false); // Novo Modal Cadastro de Lote

  const filteredBatches = batches.filter(batch => 
    batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handler para abrir o Modal de Cadastro
  const handleNewBatch = () => {
      setIsRegistrationModalOpen(true);
  };
  
  const handleViewTimeline = (batchId: string) => {
      setSelectedBatchId(batchId);
  };
  
  // Handler de submissão do formulário de Novo Lote
  const handleBatchSubmit = (data: NewBatchFormData) => {
    // Simulação de geração de ID
    const newId = `LOT-X${Math.floor(Math.random() * 900 + 100)}`; // LOT-X + 3 dígitos
    
    // Cria o novo lote
    const newBatch: Batch = {
        id: newId,
        model: data.model,
        quantity: data.quantity,
        startDate: new Date().toISOString().slice(0, 10),
        estimatedCompletion: '2026-01-01', // Estimativa Mock
        status: 'Aguardando', // Inicia em Aguardando
    };

    // Adiciona ao topo da lista
    setBatches([newBatch, ...batches]);
    alert(`✅ Lote ${newBatch.id} (${newBatch.model}) cadastrado com sucesso e está na fila.`);
  };

  
  // Estilos do Modal (Utilizados para ambos)
  const modalOverlayStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
  };
  
  const modalContentStyle: React.CSSProperties = {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '90%',
      maxWidth: selectedBatchId ? '600px' : '500px', // Tamanho ajustável para cada modal
      maxHeight: '80%',
      overflowY: 'auto',
      position: 'relative',
  };


  return (
    <div>
      <h1 style={{fontSize: '2em', color: '#2c3e50', marginBottom: '10px'}}>⚙️ Gestão de Workflow de Produção</h1>
      <p style={{marginBottom: '30px', color: '#666', fontSize: '1.1em'}}>Gerencie os lotes de produção ativos, altere status e visualize o progresso.</p>

      {/* Barra de Ações e Filtros */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input
            type="text"
            placeholder="Buscar por Lote, Modelo ou Etapa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button 
            onClick={handleNewBatch} // Chamada para abrir o Modal de Cadastro
            style={{ 
                backgroundColor: '#2980b9', 
                color: 'white', 
                fontWeight: 'bold', 
                padding: '10px 20px', 
                border: 'none',
                borderRadius: '4px',
            }}
        >
            + Novo Lote de Produção
        </button>
      </div>

      {/* Tabela de Dados */}
      {filteredBatches.length > 0 ? (
          <ProductionTable batches={filteredBatches} onViewTimeline={handleViewTimeline} />
      ) : (
          <p>Nenhum lote encontrado com o termo de busca: "{searchTerm}".</p>
      )}
      
      {/* --------------------------- MODAL DE TIMELINE --------------------------- */}
      {selectedBatchId && (
        <div style={modalOverlayStyle} onClick={() => setSelectedBatchId(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={() => setSelectedBatchId(null)}
                style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1.5em', 
                    cursor: 'pointer' 
                }}
            >
                &times;
            </button>
            <ProductionTimeline 
                batchId={selectedBatchId} 
                steps={mockTimelineSteps} 
            />
          </div>
        </div>
      )}

      {/* --------------------------- MODAL DE CADASTRO DE LOTE --------------------------- */}
      {isRegistrationModalOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsRegistrationModalOpen(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={() => setIsRegistrationModalOpen(false)}
                style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1.5em', 
                    cursor: 'pointer' 
                }}
            >
                &times;
            </button>
            <NewBatchForm 
                onClose={() => setIsRegistrationModalOpen(false)}
                onBatchSubmit={handleBatchSubmit}
            />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ProductionManagement;