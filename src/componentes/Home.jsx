import React from 'react';
import Jugadores from './jugadores/Jugadores';
import EquipoSeleccionado from './EquipoSeleccionados';
//import '/bootstrap/dist/css/bootstrap.min.css';
import Data from '../data/Data';



export default function Home() {
  return (
      <>
          <Data />
          <h1>FootManager</h1>
          <Jugadores />
          <EquipoSeleccionado />
      </>
    
  );
}
