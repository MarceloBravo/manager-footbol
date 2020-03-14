import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import './suplentes.css';

function Suplentes({suplentes, eliminarSuplente}){
    return (
        <section>
            <h2>Suplentes</h2>
            <div className="h-scroll suplente-hscroll">
                <div className="suplentes-container">
                {
                    suplentes.map(s => 
                        <article className="suplente" key={s.id}>
                            <img src={s.foto} alt={s.id} className=""/>
                            <h4>{s.nombre}</h4>
                            
                                <Button variant="danger" className="btn-eliminar" onClick={() => eliminarSuplente(s) }>X</Button>
                            
                        </article>
                    )
                }

                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    suplentes: state.suplentes
})

const mapDistpachToProps = dispatch => ({
    eliminarSuplente(jugador){
        dispatch({
            type: 'ELIMINAR_SUPLENTE',
            jugador
        })
    }
})

export default connect(mapStateToProps, mapDistpachToProps) (Suplentes);