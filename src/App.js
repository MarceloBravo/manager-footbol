import React from 'react';
import './App.css';
import Jugadores from './componentes/jugadores/Jugadores';
import EquipoSeleccionado from './componentes/EquipoSeleccionados';
import 'bootstrap/dist/css/bootstrap.min.css';
import Data from './data/Data';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <Data />
          
            <h1>FootManager</h1>
            <Jugadores />
            <EquipoSeleccionado />
          
      </div>
    </Provider>
    
  );
}

export default App;
