import { useEffect} from 'react';
import { connect } from 'react-redux';

function Data({jugadores, inicializarData}){

    
    useEffect(()=>{
            console.log('Consultando datos...');
            fetch('https://entrenador-62f6b.firebaseio.com/jugadores.json')
            .then(res => res.json())
            .then(data => {
                inicializarData(data);
                
            }).catch(error => {
                console.log(error);
            });
        }
    );

    return ("");
}

const mapStateToProps = (state) => ({
    jugadores: state.jugadores
})


const mapDispatchToProps = distpatch => ({    
    inicializarData(jugadores){
        console.log(jugadores)
        distpatch({
            type: 'INICIALIZAR_DATA',
            jugadores
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Data)
