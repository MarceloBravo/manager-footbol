import { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from './firebase.js';
import { types } from '../reducers/types';

function Data({inicializarData}){
    
    useEffect(()=>{            
            let fdb = firebase.database().ref('jugadores');             
            fdb.on('value', (snapshot) => {
                let datos = snapshot.val();
                var data = [];
                for(let i in datos){
                    data.push( {key:i, id: datos[i].id, nombre: datos[i].nombre, foto: datos[i].foto})
                }
                inicializarData(data);
            });
        },[inicializarData] //Importante: agregar la función inicializarData o de lo contrario se generará un error de redenderizando
    );

    
    return ("");
}

export async function find(id){
    return await fetch(`https://entrenador-62f6b.firebaseio.com/jugadores/${id}.json`)
                .then(res => res.json())
                .then(data => {
                    return {key: id, id: data.id, nombre: data.nombre, foto: data.foto};
                })
                .catch(error => {
                    return error.message;
                });
};


export async function deleteRecord(id){
    return await firebase.database().ref('jugadores/' + id).remove()
                .then(
                    function(){
                        return true;
                    },
                    function(err){
                        return false;
                    }
                );
};


export async function insertRecord(record){
    let fbDb = firebase.database().ref('jugadores');
    let newKey = fbDb.push().key;
    return await fbDb.child(newKey).set({id: record.id, nombre: record.nombre, foto: record.foto})  //No es necesario ingresar el registro manualmente en el store ya que se actualiza automáticamente ya que firebase es una base de datos en tiempo real poor lo cual notifica al programa del cambio
        .then(res => {
            return true;
        })
        .catch(error => {
            return false;
        });
    
    //return await fbDb.child(newKey).set({id: record.id, nombre: record.nombre, foto: record.foto},   //No es necesario ingresar el registro manualmente en el store ya que se actualiza automáticamente ya que firebase es una base de datos en tiempo real poor lo cual notifica al programa del cambio
    //    function(error){
    //        return error === null;  //Sólo en caso de error la variable error serán diferente a null
    //    }
    //);
}

export async function updateRecord(record){
    let fbDb = firebase.database().ref('jugadores/' + record.key); //Para que la promesa no debuelva un undefined se debe seleccionar el egistro y luego línea aparte y con la referencia al registro, efectuar el update
    return await fbDb.update({id: record.id, nombre: record.nombre, foto: record.foto})  //Actualiza el registro en firebase   
    //A diferencia de la instrucción set, la instrucción update se debe trabajar con la construcción .then .catch de lo contrario debuelve un undefined
    .then(res => {
            return true
        }
    )
    .catch(error => {
        return false
    });
}


const mapStateToProps = (state) => ({ })


const mapDispatchToProps = distpatch => ({    
    inicializarData(jugadores){
        distpatch({
            type: types.INICIALIZAR_DATA,
            jugadores
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Data)
