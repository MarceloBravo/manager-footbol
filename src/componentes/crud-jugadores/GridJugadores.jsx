import React from 'react';
import Grilla from './grilla/Grilla';
import PanelSuperior from './panelSuperior/PanelSuperior';
import './crudJugadores.css'


export default function GridJugadores(){
    return (
        <div className="container-crud-jugadores">
            <h2>Mantenedor de Jugadores</h2>
            <PanelSuperior />
            <Grilla />
        </div>
    );
}