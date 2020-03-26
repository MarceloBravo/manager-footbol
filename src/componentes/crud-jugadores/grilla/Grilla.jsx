import React from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecord } from '../../../data/Data';
import { types } from '../../../reducers/types';
import './grilla.css';

function Grilla({datosGrid, activePag, paginar, cantRegistrosGrilla, eliminarRegistro, cargarDatosGrilla}){   
  
  const configPagination = () => {
    var pagButtons = [];
      for (let number = 1; number <= Math.ceil(cantRegistrosGrilla / 5); number++) {        //Math.ceil() retorna el número entero superior mas proximo a diferencia de Math.round que redondea al numero entero mmás proximo ya sea superior o inferior
        pagButtons.push(
          <Pagination.Item key={number} active={number === activePag} onClick={() => paginar(number) }>
            {number}
          </Pagination.Item>,
        );
    };
    return pagButtons;
  }

  const eliminar = key =>{
    if(window.confirm("¿Desea eliminar el registro?")){
      if(deleteRecord(key)) //Se efectúa la petición de eliminar el registro en firebase
      {
        eliminarRegistro(key);  //Elimina el registros desde el store de redux
        cargarDatosGrilla();  //Actualiza el contenido del array que contiene los datos a mostrar en la grilla
        alert("El registro ha sido eliminado");
      }else{
        alert("Ocurrio un error al intentar eliminar el registro");
      }
      
    }
  }

  return (
      <div>
        <br/>
        <div>
          <Pagination className="pagination-buttons">{configPagination()}</Pagination>
          <br />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Rut</th>
              <th>Nombre</th>
              <th>Foto</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {console.log(datosGrid)}
            {
              datosGrid.map(r => 
                <tr key={ r.key }>
                  <td className="col-id">{ r.id }</td>
                  <td className="col-nombre">{ r.nombre }</td>
                  <td className="col-foto">
                    <img src={ r.foto } alt={ r.id }/>
                  </td>
                  <td className="col-accion">
                    <Link to={"/jugadores/"+ r.key } params={{ reg: r }}>
                      <Button variant="success" className="edit-button">Editar</Button>
                    </Link>
                    <Button variant="danger" className="delete-button" onClick={() => eliminar(r.key)}>Eliminar</Button>
                  </td>
                </tr>              
              )
            }
          </tbody>
        </table>
      </div>
    );
}

const mapStateToProps = (state) => ({
  datosGrid: state.datosGrid,
  activePag: state.activePag,
  cantRegistrosGrilla: state.cantRegistrosGrilla
});

const mapDispatchToProps = (dispatch) => ({
  cargarDatosGrilla(){
    dispatch({
      type: types.OBTENER_DATOS_GRILLA,
      pagina: 1
    })
  },
  paginar(pagina){    
    dispatch({
      type: types.PAGINAR,
      pagina
    })
  },
  eliminarRegistro(key){
    dispatch({
      type: types.ELIMINAR_REGISTRO,
      key
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Grilla);