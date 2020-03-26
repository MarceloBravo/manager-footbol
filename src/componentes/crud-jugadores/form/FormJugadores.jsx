import React, { useEffect, useState } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap'
import { useParams, Link, useHistory } from 'react-router-dom'
import { find, deleteRecord, insertRecord, updateRecord } from '../../../data/Data';
import { connect } from 'react-redux';
import { types } from '../../../reducers/types';
import './formJugadores.css';

function FromJugadores({datos, rdxInsertarRegistros, rdxActualizarRegistro, rdxEliminarRegistro, cargarDatosGrilla}){    
    const { id } = useParams();
    const [ key, setKey ] = useState(id === 'nuevo' ? '' : id );   //Recibiendo los parametros por url 
    const [ rut, setRut ] = useState('')
    const [ nombre, setNombre ] = useState('');
    const [ foto, setFoto ] = useState('');
    const [ findRecord, setFindRecord  ] = useState(true);
    let history = useHistory();

    useEffect(() =>{
        if(findRecord && id !== 'nuevo'){
            setFindRecord(false);
            buscarRegistro();
        }
    },[findRecord, id]);


    async function buscarRegistro(){
        var res = await find(id);
        if(typeof(res) !== 'string' ){
            setKey(res.key);
            setRut(res.id);
            setNombre(res.nombre);
            setFoto(res.foto);
        }else{
            alert(res);
        }
    }

    const grabar = (e) => {
        if(window.confirm("¿Desea grabar el registro?")){
           (id !== 'nuevo' ? actualizar() : insertar());
        }
    }
    
    async function insertar(){
        if(await insertRecord({id: rut, nombre: nombre, foto: foto})){
            cargarDatosGrilla();    //Actualiza el array con los datos a mostrar en la grilla
            alert("El registro ha sido ingresado.");            
            history.push("/jugadores"); //Requiere importar "useHistory" desde "react-router-dom" y asignarlo a una variable al principio de la función
        }else{
            alert("Ocurrio un error al intentar ingresar el registro.");
        }
    }
    
    async function actualizar(){
        if(await updateRecord({key: key, id: rut, nombre: nombre, foto: foto})){
            rdxActualizarRegistro({key: key, id: rut, nombre: nombre, foto: foto}); //Actualiza el registro en el store de redux
            cargarDatosGrilla();    //Actualiza la matriz con los datos a mostrar en la grilla
            alert("El registro ha sido actualizado");
            history.push("/jugadores")  //Requiere importar "useHitory" desde "react-router-dom" y asignarlo a una variable al principio de la función
        }else{
            alert("Ocurrio un error al intentar actualizar el registro.")
        }
    }


        
    function eliminar(){
        if(window.confirm("¿Desea eliminar el registro?")){
            if(deleteRecord(id)){
                rdxEliminarRegistro(id);    //Elimina el registro desde el store de redux
                cargarDatosGrilla();    //Actualiza el array que contiene los datos a mostrar en la grilla
                alert("El registro ha sido eliminado");
                history.push("/jugadores");    //Requiere importar "useHitory" desde "react-router-dom" y asignarlo a una variable al principio de la función
            }else{
                alert("Ocurrió un error al intentar eliminar el registro. ");
            }
        }
        
    }

    return(
        <div className="container-crud-jugadores">
            <h2>Mantenedor de Jugadores</h2>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Rut:
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="Ej. 12345678-9" value={rut} onChange={e =>setRut(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Nombre:
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Foto
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="Foto" value={foto} onChange={e => setFoto(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="button-group">
                    
                    <Button type="button" variant="success" className="btnGrabar" onClick={() =>grabar()}>Grabar</Button>
                    
                    <Button type="button" variant="danger" className="btnEliminar" onClick={() => eliminar() }>Eliminar</Button>
                    
                    <Link to="/jugadores">
                        <Button type="button" className="btnVolver" onClick={() => cargarDatosGrilla() }> Volver</Button>
                    </Link>
                    
                </Form.Group>
            </Form>
        </div>
    );
}

const mapsStateToProps = (state) => ({
    datos: state.datos
});

const mapsDispatchToProps = (dispatch) => ({
    rdxInsertarRegistros(jugador){
        dispatch({
            type: types.INSERTAR_REGISTRO,
            jugador
        })
    },
    rdxActualizarRegistro(jugador){
        dispatch({
            type: types.ACTUALIZAR_REGISTRO,
            jugador
        })
    },
    rdxEliminarRegistro(key){
        dispatch({
            type: types.ELIMINAR_REGISTRO,
            key
        })
    },
    cargarDatosGrilla(jugadores){
        dispatch({
            type: types.OBTENER_DATOS_GRILLA,
            jugadores
        })
    }
})

export default  connect(mapsStateToProps, mapsDispatchToProps)(FromJugadores);