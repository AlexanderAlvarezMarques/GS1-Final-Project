import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const Resultado = ({cotizacion}) => {

    
    return(
    (cotizacion === 0 ) ?
        <p> Añadir una marca, modelo,  año de matriculacion del vehiculo, antiguedad de carnet de conducir y plan para el seguro.</p>
        : (
            <div>
                <TransitionGroup
                component="span"
                className="resultado">
                    <CSSTransition
                        classNames="resultado"
                        key={cotizacion}
                        timeout={{ enter: 500, exit: 500}}
                    >
                        <h3> El total es <span>{cotizacion}</span> $ </h3>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    );

}
export default Resultado;
