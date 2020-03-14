import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import './jugadores.css';

function Jugadores({jugadores, agregarTitular, agregarSuplente}){    //IMPORTANTE: Los parametros deben estar entre parentesis de llave ya que no son props
    
    return (
        <section>
            <h2>Jugadores</h2>
            <div className="h-scroll jugador-hscroll">
                <div className="jugadores-container">
                {                
                    jugadores.map(j => (
                        <article className="jugador" key={ j.id }>
                            <img src={ j.foto } alt={ j.nombre }/>
                            <h4>{ j.nombre }</h4>
                            <ButtonToolbar>
                                <Button variant="success" onClick={() => agregarTitular(j) }>Titular</Button>
                                <Button variant="primary" onClick={() => agregarSuplente(j) }>Suplente</Button>
                            </ButtonToolbar>        
                        </article>
                        )
                    )
                }
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) =>({
    jugadores: state.jugadores
});

const mapDispatcToProps = (dispatch) =>({    
        agregarTitular(jugador){
            dispatch({
                type: 'AGREGAR_TITULAR',
                jugador
            })
        },

        agregarSuplente(jugador){
            dispatch({
                type: 'AGREGAR_SUPLENTE',
                jugador
            })
        }
})

export default connect(mapStateToProps, mapDispatcToProps)(Jugadores);