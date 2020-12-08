import React, { useState } from 'react';
//import { Router, useHistory} from 'react-router-dom';
//import {auth, firestore} from '../firebaseConfig';

const PriceEstimate = () => {

    //para rediccionar
    //let history = useHistory();


    //state para los campos del formulario
    const [data, setData] = useState({
        marca : 'Ford',
        modelo : 'Focus',
        añoMatricula : 1997,
        antiguedadCarnet : 5
    });

    const {marca,modelo,añoMatricula,antiguedadCarnet} = data;
    // estado para validaciones
    const [error, actualizarError] = useState(false);

    // actualizar campos del formulario
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const getPriceEstimate = e =>{
        e.preventDefault()
        console.log("he apretado el boton");

        if( marca.trim() === '' || modelo.trim() === '' || añoMatricula.trim() === '' || antiguedadCarnet.trim() === ''){
            actualizarError(true);
            return;
        }
            actualizarError(false);

    }


    return( 
        <>
        <h1>Estimación de precio para tu coche</h1>

        <form
            onSubmit={getPriceEstimate}
        >
            <label>Marca</label>
            <input
                type="text"
                name="marca"
                onChange={actualizarState}
            />
            <label>Modelo</label>
            <input
                type="text"
                name="modelo"
                onChange={actualizarState}
            />
            <label>Año matriculación</label>
            <input
                type="number"
                name="añoMatricula"
                onChange={actualizarState}
            />
            <label>Antiguedad de carnet</label>
            <input
                type="number"
                name="antiguedadCarnet"
                onChange={actualizarState}
            />
            <button 
                type="submit"
            >Aceptar</button>
        </form>
        </>
    );
}
export default PriceEstimate ;