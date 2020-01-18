import React, { useEffect, useState } from 'react';
import api from './services/api'

// Components
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

// Importar folhas de estilo css
import './style/Global.css';
import './style/App.css';
import './style/Sidebar.css';
import './style/Main.css';

// Componente: Bloco isolado de HTML, CSS, e JS, o qual não interfere no restante da aplicação   
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelo componente (Lembrar: Imutabilidade)

function App(){
  const [devs, setDevs] = useState([])

  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs/findall');

      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data){
    //e.preventDefault();
    const response = await api.post('/devs', data)
    
    setDevs([...devs, response.data]);
  }
  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App;
