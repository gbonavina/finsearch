import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import GraficoHistorico from "../components/GraficoHistorico";
import Logo from "../components/Logo"; 
import dollar from "../assets/dollar.png";
import back from "../assets/back.png";
import arrowUp from "../assets/arrow_up.png";
import arrowDown from "../assets/arrow_down.png";

import "../styles/Ativo.css"; 

function Ativo() {
  const { ticker } = useParams();
  const [dadosAtivo, setDadosAtivo] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dashboard-api.up.railway.app/stock/last_value/${ticker}`)
      .then((response) => {
        console.log("Dados do ativo: ", response.data);
        setDadosAtivo(response.data);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do ativo: ", error);
      });
  }, [ticker]);

  // console.log(historicoSemanal);

  return (
    <div className="ativo-container">
      <div className="back-container">
        <Link to="/">
          <Logo className="back-logo" />
          <img src={back} alt="Voltar" className="back-arrow" />
        </Link>
      </div>

      <div className="ativo-header">
        <img src={dollar} alt="Ícone Ativo" />
        <h1>{ticker.toUpperCase()}</h1>
      </div>
      
      <div className="indicadores-container">
        <div className="indicador">
          <div className="indicador-header">COTAÇÃO</div>
          <div className="indicador-valor">
            <span>{dadosAtivo ? dadosAtivo.cotacao : "CARREGANDO..."}</span>
          </div>
        </div>
        <div className="indicador">
      <div className="indicador-header">VARIAÇÃO (12M)</div>
        <div className="indicador-valor">
          <span>
            {dadosAtivo ? `${dadosAtivo.variacao__12m_}` : "CARREGANDO..."}
          </span>
          {dadosAtivo && (() => {
            // Remove o % e converte vírgula para ponto
            const variacaoNum = parseFloat(dadosAtivo.variacao__12m_.replace("%", "").replace(",", "."));
            if (variacaoNum > 0) {
              return <img src={arrowUp} alt="Seta para cima" style={{ marginLeft: "5px" }} className="arrow-icon-up"/>;
            } else if (variacaoNum < 0) {
              return <img src={arrowDown} alt="Seta para baixo" style={{ marginLeft: "5px" }} className="arrow-icon-down"/>;
            } else {
              return null;
            }
          })()}
        </div>
      </div>

        <div className="indicador">
          <div className="indicador-header">P/L</div>
          <div className="indicador-valor">
            <span>{dadosAtivo ? dadosAtivo.p_l : "CARREGANDO..."}</span>
          </div>
        </div>
        <div className="indicador">
          <div className="indicador-header">P/VP</div>
          <div className="indicador-valor">
            <span>{dadosAtivo ? dadosAtivo.p_vp : "CARREGANDO..."}</span>
          </div>
        </div>
        <div className="indicador">
          <div className="indicador-header">DY</div>
          <div className="indicador-valor">
            <span>
              {dadosAtivo ? `${dadosAtivo.dividend_yield}` : "CARREGANDO..."}
            </span>
          </div>
        </div>
      </div>

      {/* Espaço para os Gráficos */}
      
      <GraficoHistorico ticker={ticker} />
      {/* <GraficoHistorico dados={dadosFiltrados} /> */}


    </div>
  );
}

export default Ativo;
