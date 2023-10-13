import { useCallback, useEffect, useState } from 'react';
import './App.css';
import TelaInicial from './components/TelaInicial/TelaInicial';
import {listaPalavras} from "./data/palavras";
import TelaJogo from './components/TelaJogo/TelaJogo';
import TelaFim from './components/TelaFim/TelaFim';

const estagio = [
  {id: 1, nome: "inicio"},
  {id: 2, nome: "jogo"},
  {id: 3, nome: "fim"},
]

const tentativa = 5;

function App() {
  const [estagioJogo, setEstagioJogo] = useState(estagio[0].nome);
  const [palavras] = useState(listaPalavras);
  const [palavraEscolhida, setPalavraEscolhida] = useState("");
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");
  const [letras, setLetras] = useState([]);
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(tentativa);
  const [pontuacao, setPontuacao] = useState(0);

  const escolhaCategoriaPalavra = useCallback (() => {
    const categorias = Object.keys(palavras);
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)];

    //console.log(categoria);

    const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)];

    //console.log(palavra);

    return {palavra, categoria};
  }, [palavras]);

 const iniciarJogo = useCallback (() => {
  limparEstadoLetras();
  const {palavra, categoria} = escolhaCategoriaPalavra();

  let palavraLetras = palavra.split("");

  palavraLetras = palavraLetras.map((l) => l.toLowerCase());

  //console.log(palavra, categoria);
  //console.log(palavraLetras);

  setPalavraEscolhida(palavra);
  setCategoriaEscolhida(categoria);
  setLetras(palavraLetras);
  setEstagioJogo(estagio[1].nome);
 }, [categoriaEscolhida]);

 const verificarLetra = (letra) => {
  const normalizeLetra = letra.toLowerCase();

  if(letrasAdivinhadas.includes(normalizeLetra) || letrasErradas.includes(normalizeLetra)) {
    return;
  }

  if(letras.includes(normalizeLetra)) {
    setLetrasAdivinhadas((atualLetrasAdivinhadas) => [
      ...atualLetrasAdivinhadas,
      normalizeLetra
    ]);
  } else {
    setLetrasErradas((atualLetrasErradas) => [
      ...atualLetrasErradas,
      normalizeLetra
    ]);
    setTentativas((atualTentativas) => atualTentativas -1);
  }
 };

const limparEstadoLetras = () => {
  setLetrasAdivinhadas([]);
  setLetrasErradas([]);
}

 useEffect(() => {
  if(tentativas <= 0) {
    limparEstadoLetras();

    setEstagioJogo(estagio[2].nome);
  }
 }, [tentativas])

 useEffect(() => {
  const letrasUnicas = [...new Set(letras)];

  if(letrasAdivinhadas.length === letrasUnicas.length) {
    setPontuacao((atualPontuacao) => atualPontuacao += 100);

    iniciarJogo();
  }

  //console.log(letrasUnicas);

 }, [letrasAdivinhadas, letras, iniciarJogo])

 const reiniciarJogo = () => {
  setPontuacao(0);
  setTentativas(tentativa);
  setEstagioJogo(estagio[0].nome);
 }

  return (
    <div className='App'>
      {estagioJogo === "inicio" && <TelaInicial iniciarJogo={iniciarJogo}/>}
      {estagioJogo === "jogo" && <TelaJogo 
        verificarLetra={verificarLetra} 
        palavraEscolhida={palavraEscolhida} 
        categoriaEscolhida={categoriaEscolhida} 
        letras={letras}
        letrasAdivinhadas={letrasAdivinhadas}
        letrasErradas={letrasErradas}
        tentativas={tentativas}
        pontuacao={pontuacao}
        />}
      {estagioJogo === "fim" && <TelaFim reiniciarJogo={reiniciarJogo} pontuacao={pontuacao}/>}
    </div>
  )
}

export default App