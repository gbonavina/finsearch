import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
          background: "#333",
          padding: "10px",
          borderRadius: "5px",
          color: "#fff",
          fontSize: "14px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          fontFamily: 'Istok Web'
          
      }}>
        <p>📅 Data: <strong>{formatDate(payload[0].payload.date)}</strong></p>
        <p>💰 Fechamento: <strong>R$ {payload[0].value.toFixed(2)}</strong></p>
      </div>
    );
  }
  return null;
};

function GraficoCotacao({ ticker }) {
  const [anos, setAnos] = useState(5);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para carregar os dados do backend usando o ticker recebido
  const carregarDados = useCallback(async (periodo) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dashboard-api-l4m3.onrender.com/stock/daily/${ticker}?anos=${periodo}`);
      if (response.data && response.data.length > 0) {
        setDados(response.data);
      } else {
        setDados([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setDados([]);
    } finally {
      setLoading(false);
    }
  }, [ticker]); 

  useEffect(() => {
    carregarDados(anos);
  }, [anos, carregarDados]);

  const handlePeriodo = (periodo) => {
    setAnos(periodo);
  };

  // Lógica de cálculo do retorno do investimento
  const investimentoInicial = 1000;
  const valorInicial = dados.length > 0 ? dados[0].close : null;
  const valorFinal = dados.length > 0 ? dados[dados.length - 1].close : null;
  const retornoAproximado = valorInicial && valorFinal 
    ? (investimentoInicial * valorFinal / valorInicial).toFixed(2)
    : null;

  return (
    <div className="grafico-cotacao-container">
      {/* Cabeçalho com título e botões para seleção de período */}
      <div className="cabecalho-grafico">
        <h2>COTAÇÃO {ticker.toUpperCase()}</h2>
        <div className="controles">
          <button
            className={anos === 5 ? "btn-ativo" : "btn-inativo"}
            onClick={() => handlePeriodo(5)}
          >
            5 anos
          </button>
          <button
            className={anos === 10 ? "btn-ativo" : "btn-inativo"}
            onClick={() => handlePeriodo(10)}
          >
            10 anos
          </button>
        </div>
      </div>

      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div className="grafico-container">
          {dados.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={dados}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(tick) => tick.slice(0, 7)}
                  stroke="#ccc"
                />
                <YAxis stroke="#ccc" domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#C4A484" 
                  fill="#C4A484" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p>Nenhum dado para exibir.</p>
          )}
        </div>
      )}

      <div className="texto-investimento">
        {retornoAproximado ? (
          <p>
            Se você tivesse investido R$ {investimentoInicial.toLocaleString("pt-BR")} há {anos} anos, hoje teria aproximadamente R$ {Number(retornoAproximado).toLocaleString("pt-BR")}.
            (Desconsiderando dividendos reinvestidos.)
          </p>
        ) : (
          <p>Calculando retorno do investimento...</p>
        )}
      </div>
    </div>
  );
}

export default GraficoCotacao;
