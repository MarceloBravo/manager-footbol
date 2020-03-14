import { createStore } from 'redux';

const INITIAL_STATE = {
    jugadores: [], 
    titulares: [],
    suplentes: [],
    datos: []
}

const reducerEntrenador = (state  = INITIAL_STATE, action) => {
    switch(action.type){
        case 'INICIALIZAR_DATA':
            var arrRegNuevos = action.jugadores.filter(
                ajf => action.jugadores.map(aj => {return aj.id})   //Se retorna un array con los ID's de los elementos recibidos por el action
                    .filter(aId => 
                        !state.datos.map(sj => {return sj.id})  //Se obtiene un array con los ID's de los elementos almacenados en el state que contiene los datos de todos los registros
                        .includes(aId)    //Se evalúa si el ID existente en la variable aId existe en el array de los elementos del store
                    )   //El filtro dejara sólo los elementos que no cumplan con la condición de la línea anterior (Ver el signo de exclamación 2 líneas arriba)
                    .includes(ajf.id)   //Del action jugadores sólo quedaran los elementos que cuyo ID este incluido en el array resultante de los filtros anteriores
                    );

            return {
                ...state,
                jugadores: state.jugadores.concat(arrRegNuevos),  //Se agregaran al store sólo los elementos que lleguen por el action y que no se encuentren en el store, para ello se realizaron los siguientes filtros
                datos: state.datos.concat(arrRegNuevos)
            }
        case 'AGREGAR_TITULAR':
            return {
                ...state,
                jugadores: state.jugadores.filter(j => j.id !== action.jugador.id),
                titulares: state.titulares.concat(action.jugador)
            }
        case 'ELIMINAR_TITULAR':
            return {
                ...state,
                titulares: state.titulares.filter(t => t.id !== action.jugador.id),
                jugadores: state.jugadores.concat(action.jugador)
            }
        case 'AGREGAR_SUPLENTE':
            return {
                ...state,
                suplentes: state.suplentes.concat(action.jugador),
                jugadores: state.jugadores.filter(j => j.id !== action.jugador.id)
            }
        case 'ELIMINAR_SUPLENTE':
            return {
                ...state,
                suplentes: state.suplentes.filter(s => s.id !== action.jugador.id),
                jugadores: state.jugadores.concat(action.jugador)
            }
        default:
            return state;    }
};


export default createStore(reducerEntrenador);