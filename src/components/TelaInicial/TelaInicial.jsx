import React from 'react';
import "./TelaInicial.css";

const TelaInicial = ({iniciarJogo}) => {
  return (
    <div className='inicio'>
        <h1>Palavra Secreta</h1>
        <p>Clique no botão para começar a jogar</p>
        <button onClick={iniciarJogo}>Começar o jogo</button>
    </div>
  )
}

export default TelaInicial