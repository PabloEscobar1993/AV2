import React from 'react';

const ProductionChart: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      backgroundColor: 'white',
      marginTop: '30px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Cronograma de Produção vs. Realizado (Últimos 6 Meses)</h4>
      <div style={{ 
        height: '350px', 
        backgroundColor: '#f9f9f9', 
        border: '1px dashed #ccc',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        color: '#999',
        fontSize: '1.2em'
      }}>
        [ aqui é uma área para Gráfico de Barras ou Linhas com dados de produção. ]
      </div>
    </div>
  );
};

export default ProductionChart;