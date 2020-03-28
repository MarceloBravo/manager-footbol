import { createStore } from 'redux';
import { types } from './types';

const defaultRecord = {key: null, id: '', nombre: '', foto:'' };

const INITIAL_STATE = {
    jugadores: [], 
    titulares: [],
    suplentes: [],
    datos: [],
    datosGrid: [],
    activePag: 1,
    textoFiltro: '',
    cantRegistrosGrilla: 0,
    selectedRecord: defaultRecord,
}

const reducerEntrenador = (state  = INITIAL_STATE, action) => {
    let desde = 1;
    let data = [];
    let cantReg = 0;

    switch(action.type){
        case types.INICIALIZAR_DATA:

            var arrRegNuevos = action.jugadores.map( (v,k) => {if(!Object.keys(state.datos).includes(k.toString())){ return v } }).filter(i => i !== undefined) //Obtiene los nuevos registros y los ingresa a la matris de datos siempre y cuando en registro no s encuentre ingresado previamente (Evitamos registros duplicados)
            cantReg = state.jugadores.length + arrRegNuevos.length;
            console.log(arrRegNuevos);
            
            return {
                ...state,
                jugadores: state.jugadores.concat(arrRegNuevos),  //Se agregaran al store sólo los elementos que lleguen por el action y que no se encuentren en el store, para ello se realizaron los siguientes filtros
                datos: state.datos.concat(arrRegNuevos),
                cantRegistrosGrilla: cantReg
            }

        case types.AGREGAR_TITULAR:
            return {
                ...state,
                jugadores: state.jugadores.filter(j => j.key !== action.jugador.key),
                titulares: state.titulares.concat(action.jugador)
            }

        case types.ELIMINAR_TITULAR:
            return {
                ...state,
                titulares: state.titulares.filter(t => t.key !== action.jugador.key),
                jugadores: state.jugadores.concat(action.jugador)
            }

        case types.AGREGAR_SUPLENTE:
            return {
                ...state,
                suplentes: state.suplentes.concat(action.jugador),
                jugadores: state.jugadores.filter(j => j.key !== action.jugador.key)
            }

        case types.ELIMINAR_SUPLENTE:
            return {
                ...state,
                suplentes: state.suplentes.filter(s => s.key !== action.jugador.key),
                jugadores: state.jugadores.concat(action.jugador)
            }

        case types.OBTENER_DATOS_GRILLA:
            desde = state.activePag * 5 -5;
            //cantReg = state.datos.length;
            return {
                ...state,
                datosGrid: state.datos.slice(desde, desde + 5)
                //cantRegistrosGrilla: cantReg
            }

        case types.FILTRAR_GRILLA:
            desde = (action.pagina * 5 - 5)
            data = state.datos.filter(j => j.nombre.toLowerCase().includes(action.texto.toLowerCase()) || j.id.toLowerCase().includes(action.texto.toLowerCase()));            
            return {
                ...state,                
                datosGrid: data.slice(desde, desde + 5),
                cantRegistrosGrilla: data.length,
                textoFiltro: action.texto
            }

        case types.PAGINAR:
            desde = (action.pagina * 5 - 5);
            
            if(state.textoFiltro !== ""){
                data = state.datos.filter(j => j.nombre.toLowerCase().includes(state.textoFiltro.toLowerCase()) || j.id.toLowerCase().includes(action.texto.toLowerCase()));
            }else{
                data = state.datos;
            }
            return {
                ...state,
                datosGrid: data.slice(desde, (desde + 5)),
                activePag: action.pagina
            }
            
        case types.EDITAR_REGISTRO: //Selecciona desde sl store el registro a ser editado
            return {
                ...state,
                selectedRecord: state.data.filter( j => j.key === action.key )
            }
        case types.INSERTAR_REGISTRO:   //Ingresa un nuevo registro en el store
            console.log('NUEVO...', action.jugador);
            return {
                ...state,
                datos: state.datos.concat(action.jugador)
            }
        case types.ACTUALIZAR_REGISTRO: //Actualiza el registros en el store
            return {
                ...state,
                datos: state.datos.map(j=> j.key === action.jugador.key ? action.jugador  : j)                
            }

        case types.ELIMINAR_REGISTRO:   //Elimina un registro del store
            desde = (action.pagina * 5 - 5);     
            if(state.textoFiltro !== ""){
                data = state.datos.filter(j => j.nombre.toLowerCase().includes(state.textoFiltro.toLowerCase()) || j.id.toLowerCase().includes(action.texto.toLowerCase()));
            }else{
                data = state.datos;
            }
            return {
                ...state,
                datos: data.filter(j => j.key !== action.key),
                datosGrid: data.slice(desde, (desde + 5)),
                jugadores: state.jugadores.filter( j => j.key !== action.key)
            }
        default:
            return state;
        }
};


export default createStore(reducerEntrenador);