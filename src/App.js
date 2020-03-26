import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './componentes/Home';
import GridJugadores from './componentes/crud-jugadores/GridJugadores';
import FormJugadores from './componentes/crud-jugadores/form/FormJugadores'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';  //Debe ir en éste archivo (App.js)

//Redux
import { Provider } from 'react-redux';
import store from './reducers/store';

function App() {
  return (
      <div className="App">
        <Provider store={store}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/jugadores' component={GridJugadores} />
            <Route exact path='/jugadores/:id' component={FormJugadores} />
          </Switch>
        </Provider>
      </div>
  );
}

export default App;
