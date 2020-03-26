import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import './panelSuperior.css';

export function PanelSuperior({ aplicarFiltro}){

    const [texto, setTexto ] = useState('');
    const [ pagina, setPagina ] = useState(1)
    const [ filtrar, setFiltrar ] = useState(false)

    useEffect(()=>{
        if(filtrar){
            aplicarFiltro(texto,pagina);
            setFiltrar(false);
        }
    },[filtrar, setFiltrar, aplicarFiltro])

    const filtrarDatos = (e) => {
        const filtro = e.target.value; 
        setTexto(filtro);   //set es una función asincrona por lo cual no se asegura de que se actualice inmediatamente la variable texto
        setFiltrar(true);
    }

    return (
            <div className="row">
                <div className="col-md-4">
                    <Link to="/jugadores/nuevo">
                        <Button className="btn-crud">Nuevo</Button>
                    </Link>
                    <Link to="/">
                        <Button className="btn-crud">Volver</Button>
                    </Link>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <input type="text" className="form-control col-md-12" value={texto} placeholder="Texto a buscar." onChange={e => filtrarDatos(e)} onKeyUp={e => filtrarDatos(e)}/>
                </div>
            </div>
        );
}


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({    
    aplicarFiltro(texto, pagina){
        dispatch({
            type: 'FILTRAR_GRILLA',
            texto,
            pagina
        })
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(PanelSuperior);