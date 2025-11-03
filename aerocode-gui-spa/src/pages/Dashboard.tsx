import KpiCard from '../components/DataDisplay/KpiCard';
import ProductionChart from '../components/DataDisplay/ProductionChart';

const Dashboard = () => {
  return (
    <div>
      <h1 style={{fontSize: '2em', color: '#2c3e50'}}>✈️ Dashboard de Produção</h1>
      <p style={{marginBottom: '30px', color: '#666', fontSize: '1.1em'}}>Visão Geral e Indicadores Chave de Performance (KPIs) para a gestão da produção.</p>

      {/* Seção de Cards de KPIs */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        
        {/* KPI 1: Aeronaves Concluídas */}
        <KpiCard 
          title="Aeronaves Concluídas (Mês)" 
          value={32} 
          unit="unidades" 
          trend="up" 
        />
        
        {/* KPI 2: Taxa de Defeitos (Qualidade é crucial) */}
        <KpiCard 
          title="Taxa de Defeitos (Lotes Ativos)" 
          value={0.85} 
          unit="%" 
          trend="down" // Queda é bom para esta métrica
        />
        
        {/* KPI 3: Tempo Total de Produção */}
        <KpiCard 
          title="Tempo Médio por Lote" 
          value={150} 
          unit="hrs" 
          trend="neutral" 
        />

         {/* KPI 4: Próximo marco */}
        <KpiCard 
          title="Próximo Lote (Entrega)" 
          value={"Amanhã"} 
          unit={"14:00"} 
          trend="up" 
        />
      </div>

      {/* Seção de Gráfico */}
      <ProductionChart />
    </div>
  );
};

export default Dashboard;