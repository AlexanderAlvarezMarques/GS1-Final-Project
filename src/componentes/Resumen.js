import React from 'react';


const Resumen = ({datos}) => {

    const {marca, year, plan, modelo, antiguedadCarnet} = datos;

    if(marca.trim() === '' || modelo.trim() === '' || year === null || antiguedadCarnet === null || plan.trim() === ''){
        return null
    }

    return(
        <div>
            <h2>Resumen de Cotización</h2> 
            <ul>
                <li>Marca: {marca}</li>
                <li>Modelo: {modelo}</li>
                <li>Año antiguedad: {year}</li>
                <li>Antiguedad de carnet: {antiguedadCarnet}</li>
                <li>Plan: {plan}</li>
            </ul>
        </div>
    );
    
}
export default Resumen;