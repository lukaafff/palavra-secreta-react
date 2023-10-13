import React, { useState, useRef } from 'react'
import "./TelaJogo.css";

    const TelaJogo = ({verificarLetra, palavraEscolhida, categoriaEscolhida, letras, letrasAdivinhadas, letrasErradas, tentativas, pontuacao}) => {
  
    const [letra, setLetra] = useState("");
    const LetraInputRef = useRef(null);

    const handeleSubimit = (e) => {
        e.preventDefault();
        verificarLetra(letra);

        setLetra("");

        LetraInputRef.current.focus();
    }

    return (
    <div className="jogo">
        <p className="pontos">
            <span>Pontuação: {pontuacao}</span>
        </p>
        <h1>Adivinhe a palavra:</h1>
        <h3 className="dica">
            Dica sobre a palavra: <span>{categoriaEscolhida}</span>
        </h3>
        <p>Você ainda tem {tentativas} tentativas</p>
        <div className="palavraContainer">
            {letras.map((letras, i) => 
                letrasAdivinhadas.includes(letras) ? (
                    <span key={i} className='letra'>{letras}</span>
                ) : (
                    <span key={i} className='quadradoBranco'></span>
                )
            )}
        </div>
        <div className="letraContainer">
            <p>Tente adivinhar uma letra da palavra</p>
            <form onSubmit={handeleSubimit}>
                <input 
                type="text" 
                name='letra' 
                maxLength="1" 
                required 
                onChange={(e) => setLetra(e.target.value)} 
                value={letra}
                ref={LetraInputRef}
                />
                <button>Jogar</button>
            </form>
        </div>
        <div className="letrasErradasContainer">
            <p>Letras já utilizadas:</p>
            {letrasErradas.map((letras, i) => 
                <span key={i}>{letras}, </span>
            )}
        </div>
    </div>
  )
}

export default TelaJogo