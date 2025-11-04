import React from 'react';


interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string; 
  trend?: 'up' | 'down' | 'neutral'; 
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, unit, trend = 'neutral' }) => {
  
  
  let trendIcon = '';
  let trendColor = 'gray';
  if (trend === 'up') {
    trendIcon = '▲';
    trendColor = '#27ae60'; 
  } else if (trend === 'down') {
    trendIcon = '▼';
    trendColor = '#c0392b'; 
  }

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
      backgroundColor: 'white',
      width: '300px',
      minWidth: '250px'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#555', fontSize: '0.9em' }}>{title}</h4>
      <div style={{ fontSize: '2.5em', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', color: '#34495e' }}>
        {value} <span style={{fontSize: '0.5em', marginLeft: '5px', fontWeight: 'normal'}}>{unit}</span>
      </div>
      <div style={{ color: trendColor, marginTop: '5px', fontSize: '0.9em' }}>
        <span style={{ marginRight: '5px', fontWeight: 'bold' }}>{trendIcon}</span> 
        {trend === 'up' && 'Tendência de Aumento'}
        {trend === 'down' && 'Tendência de Queda'}
        {trend === 'neutral' && 'Estável (Última Semana)'}
      </div>
    </div>
  );
};

export default KpiCard;