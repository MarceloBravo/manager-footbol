import validaRut from './validaRut';

export const validaciones = (datos) =>{
    const errors = {};
    if(!datos.rut){
        errors.rut = "El rut es obligatorio.";

    }else if(!validaRut(datos.rut)){
        errors.rut = "El rut no es valido.";
    }

    if(!datos.nombre){
        errors.nombre = "El nombre es obligatorio.";
    }

    if(!datos.foto){
        errors.foto = "La foto es obligatoria.";
    }

    return errors;
}