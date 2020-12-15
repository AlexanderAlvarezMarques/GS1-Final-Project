import React, { useState } from 'react';
import {obtenerDiferenciaYear} from '../Helper'
import {calcularMarca} from '../Helper'
import {obtenerPlan} from '../Helper'
import Spinner from './Spinner'
import Resultado from './Resultado'
import Resumen from './Resumen'
//import { Router, useHistory} from 'react-router-dom';
//import {auth, firestore} from '../firebaseConfig';

const PriceEstimate = () => {

    //para rediccionar
    //let history = useHistory();

    const [resumen, guardarResumen] = useState({
        cotizacion: 0,
        datos: {
            marca : 'Ford',
            modelo : 'Focus',
            year : 1997,
            antiguedadCarnet : 5,
            plan : 'basico'
        }
      });

    const [cargando, guardarCargando] = useState(false);
    
    const {cotizacion, datos} = resumen;

    //state para los campos del formulario
    const [data, setData] = useState({
        marca : 'Ford',
        modelo : 'Focus',
        year : 1997,
        antiguedadCarnet : 5,
        plan : 'basico'
    });

    const {marca,modelo,year,antiguedadCarnet,plan} = data;
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

        if( marca.trim() === '' || modelo.trim() === '' || year === null || antiguedadCarnet === null || plan.trim() === ''){
            actualizarError(true);
            return;
        }
            actualizarError(false);

        
            let resultado = 2000;
            const diferencia = obtenerDiferenciaYear(year);
            resultado-= ((diferencia*3)*resultado)/ 100;
    
            resultado = calcularMarca(marca) * resultado; 
    
            const incrementoPlan = obtenerPlan(plan);
            resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
            console.log(resultado)
            guardarCargando(true);
    
            setTimeout(()=>{
    
                guardarCargando(false);
    
                guardarResumen({
                    cotizacion: Number(resultado),
                    datos
                });
            },3000);
            
    }


    return( 
        <>
        <h1>Estimación de precio para tu coche</h1>

        <form
            onSubmit={getPriceEstimate}
        >
            <label>Marca</label>
            <select
                name="marca"
                value= {marca}
                onChange={actualizarState}
            >
                <option value="">-- Seleccione --</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Ford">Ford</option>
                <option value="Audi">Audi</option>
                <option value="Toyota">Toyota</option>
                <option value="Hyundai">Hyundai</option>
            </select>
                
            
            <label>Modelo</label>
            <select
                name="modelo"
                value= {modelo}
                onChange={actualizarState}
            >
                <option value="">-- Seleccione --</option>
                <option value="Berlina">Berlina</option>
                <option value="Focus">Focus</option>
                <option value="A3">A3</option>
                <option value="Yaris">Yaris</option>
                <option value="Tucson">Tucson</option>
            </select>

            <label>Año matriculación</label>
            <input
                type="number"
                name="year"
                value={year}
                onChange={actualizarState}
            />

            <label>Antiguedad de carnet</label>
            <input
                type="number"
                name="antiguedadCarnet"
                value={antiguedadCarnet}
                onChange={actualizarState}
            />
            <div>
                <label>Plan</label>
                <input
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={actualizarState}
                /> 
                Básico

                <input
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={actualizarState}
                />
                Completo
            </div>
            <button 
                type="submit"
            >Aceptar</button>
        </form>
        <div>
        { cargando ? <Spinner/> : null }
        
        <Resumen datos={datos}/>
         
         { !cargando ? 
          <Resultado cotizacion={cotizacion}/>
         : null }
        </div>
        
        </>
    );
}
export default PriceEstimate ;