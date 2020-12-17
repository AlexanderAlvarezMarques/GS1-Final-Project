import React, { useState }  from 'react';
import { auth, firestore } from '../firebaseConfig';

const Paypal = ({cotizacion}) => {
    
   
    //state para los campos del formulario
    const [data, setData] = useState({
        correo : '',
        contraseña : '',
    });

    console.log("fecha: "+new Date().getTime());
    
    const pagoSeguro = {
        precio: cotizacion,
        fecha: new Date().getTime().toString(),
    }
        
    const {correo,contraseña} = data;
    // estado para validaciones
    const [error, actualizarError] = useState(false);

    // actualizar campos del formulario
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const pagar = e => {
        e.preventDefault();

        if(correo.trim() === '' || contraseña.trim() === '' ){
            actualizarError(true);
            return;
        }
        
        actualizarError(false);
        //realizar pago en la base de datos 
        if(auth.currentUser.uid != null ){
            firestore.collection('usuariosRgistrados').doc(auth.currentUser.uid).collection("pagos").doc("vehiculo").set(pagoSeguro);
            alert("Ha realizado su pago correctamente!")
        }else{
            console.log('no hay usuario ');
        }

    }

    return( 
    <>
    <h1>Pagar con Paypal</h1>
    <form
        onSubmit={pagar}
    >
        <label>Correo</label>
        <input
            type="text"
            name="correo"
            value={correo}
            onChange={actualizarState}
        ></input>

        <label>Contraseña</label>
        <input
            type="text"
            name="contraseña"
            value={contraseña}
            onChange={actualizarState}
        ></input>
        <button type="submit">Pagar</button>
    </form>
    </>
)};
export default Paypal ;