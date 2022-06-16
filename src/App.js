import { FiSearch} from 'react-icons/fi'
import './App.css'
import { useState } from 'react'
import api from './services/api'





function App() {

  const [input, setInput] =  useState("")
  const [cep, setCep] = useState({})

  async function localize() {
    if(input === "") {
      alert("digite um cep");
      return;
    }

    try {
      const response = await api.get(input + "/json");
      setCep(response.data)
      setInput("")
    } catch {
      alert("erro ao buscar CEP!")
      setInput("")
    }

    

   
  }

  

  return (
    <div className="container">
     <h1>LocalizeComCep</h1>
      <div className="boxInput">
        <input type="text" placeholder="Digite aqui o Cep..."
        value={input} onChange={(event) => setInput(event.target.value) }
        >
          
        </input>
        <button className="btnLocalize" onClick={localize}>
          <FiSearch size={25} color="gold"/>
        </button>
      </div>

      <main className="main">
        <h2 className="title">CEP: {cep.cep}</h2>

        <span className="info">Rua: {cep.logradouro}</span>
        <span className="info">Complemento: {cep.complemento}</span>
        <span className="info">Bairro: {cep.bairro}</span>
        <span className="info">Localidade: {cep.localidade} - {cep.uf}</span>
      </main>
    </div>
  );
}

export default App;
