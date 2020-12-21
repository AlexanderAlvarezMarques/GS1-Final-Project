import React , { useEffect, useState } from 'react';
import PayTarjet from './PayTarjet'
import Paypal from './Paypal'
import { useParams } from 'react-router-dom';
import { auth, firestore } from "../firebaseConfig";

const ContratarSeguro = () => {

    // state para los campos del formulario
    const [data, setData] = useState({
      tipo : 'tarjeta',
    });
    

    //obtengo el id de la url
    const { id } = useParams()

    const {path} = useParams()
    console.log('path es ', path);
    

    const {tipo} = data
    const [error, actualizarError] = useState(false);

    // actualizar campos del formulario
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }


    return( 
        <>
            <h1>Contratar seguro</h1>
            <h2>Forma de pago:</h2>

            <div>

                <input
                    type="radio"
                    name="tipo"
                    value="tarjeta"
                    checked={tipo === "tarjeta"}
                    onChange={actualizarState}
                />
                Tarjeta
        
                <input
                    type="radio"
                    name="tipo"
                    value="paypal"
                    checked={tipo === "paypal"}
                    onChange={actualizarState}
                /> 
                Paypal
            </div>
            {tipo === 'tarjeta'  ? <PayTarjet idSeguro={id}/> : <Paypal  idSeguro={id}/>}
        </>
    )
};
export default ContratarSeguro ;