import React from 'react'
import "./TelaFim.css";

const TelaFim = ({reiniciarJogo, pontuacao}) => {
  return (
    <div>
        <h1>Fim de Jogo</h1>
        <h2>Sua pontuação foi: <span>{pontuacao}</span></h2>
        <button onClick={reiniciarJogo}>Resetar Jogo</button>
    </div>
  )
}

export default TelaFim