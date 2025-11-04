import React from 'react';



// Tipos definidos no Passo 1
export interface ProductionStep {
  name: string;
  expectedDurationDays: number;
  status: 'Pendente' | 'Em Andamento' | 'Concluída' | 'Atrasada';
  startDate: string | null;
  endDate: string | null;
}

interface ProductionTimelineProps {
  batchId: string;
  steps: ProductionStep[];
}

const getStatusColor = (status: ProductionStep['status']) => {
  switch (status) {
    case 'Concluída': return '#2ecc71'; 
    case 'Em Andamento': return '#3498db'; 
    case 'Atrasada': return '#e74c3c'; 
    case 'Pendente': return '#95a5a6'; 
    default: return '#ccc';
  }
};

const ProductionTimeline: React.FC<ProductionTimelineProps> = ({ batchId, steps }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        Workflow de Produção - Lote: {batchId}
      </h2>
      
      {steps.map((step, index) => (
        <div 
          key={index} 
          style={{ 
            display: 'flex', 
            marginBottom: '15px', 
            alignItems: 'flex-start' 
          }}
        >
          {/* Indicador de Status*/}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            marginRight: '15px' 
          }}>
            <div style={{ 
              width: '15px', 
              height: '15px', 
              borderRadius: '50%', 
              backgroundColor: getStatusColor(step.status), 
              border: '3px solid white',
              boxShadow: '0 0 0 2px ' + getStatusColor(step.status),
            }} />
            {/* Linha vertical  */}
            {index < steps.length - 1 && (
              <div style={{ 
                width: '2px', 
                height: '40px', 
                backgroundColor: (steps[index + 1].status === 'Pendente' && step.status !== 'Concluída') ? '#ccc' : getStatusColor(steps[index + 1].status),
                marginTop: '5px' 
              }} />
            )}
          </div>

          {/* Detalhes da Etapa */}
          <div style={{ flexGrow: 1, padding: '5px 0' }}>
            <h4 style={{ margin: '0 0 5px 0', color: getStatusColor(step.status) }}>
              {step.name} 
              {step.status === 'Em Andamento' && ' (Em Andamento)'}
            </h4>
            <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
              Duração Estimada: **{step.expectedDurationDays} dias**
            </p>
            {step.startDate && (
              <p style={{ margin: 0, fontSize: '0.85em', color: '#777' }}>
                Início: {step.startDate} | Fim Previsto: {step.endDate || 'TBD'}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductionTimeline;