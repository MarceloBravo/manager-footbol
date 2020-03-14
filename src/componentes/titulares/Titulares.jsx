import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import './titulares.css';

const Titulares = ({titulares, quitarTitular}) =>(
    <section>
        <h2>Titulares</h2>
        <div className="h-scroll cancha" >
                <img id="img-cancha" src='https://firebasestorage.googleapis.com/v0/b/entrenador-62f6b.appspot.com/o/cancha.jpg?alt=media&token=84d142a8-579e-483c-8c6d-a69256121123' alt='cancha-footbol' />
                <div className="titulares-controller">
                {                
                    titulares.map(t => 
                        <article className="titular" key={t.id}>
                            <img src={t.foto} alt={t.id}/>
                            <h4>{t.nombre}</h4>
                            <Button variant="danger" className="btn-eliminar" onClick={() => quitarTitular(t)}>X</Button>
                        </article>
                    )
                }
                </div>
            </div>
    </section>
);

const mapStateToProps = (state) => ({
    titulares: state.titulares
})

const mapDisPatchToProps = dispatch => ({
    quitarTitular(jugador){
        dispatch({
                type: 'ELIMINAR_TITULAR',
                jugador
        })
    }
})

export default connect(mapStateToProps, mapDisPatchToProps) (Titulares);