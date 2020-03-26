import { createStore } from 'redux';

const INITIAL_STATE = {
    id:0,
    nombre: '',
    foto:''
}

const reducerCrudJugadores = (state = INITIAL_STATE, action) => {
    return state;
}


export default createStore(reducerCrudJugadores)
