import React, { useState }  from 'react';
import { auth, firestore } from '../firebaseConfig';

const PayTarjet = (cotizacion) => {
    

    // state para el tipo de tarjeta
    const [tipoTarjeta, setTipoTarjeta] = useState({
        tarjeta : 'visa',
    });

     //state para los campos del formulario
     const [data, setData] = useState({
        numeroTarjeta : '',
        numeroSecreto : '',
        fechaCaducidad : '',
        
    });

    //state para el pago
    const pagoSeguro = {
        precio: cotizacion,
        fecha: new Date().getTime().toString(),
    }

    // estado para validaciones
    const [error, actualizarError] = useState(false);

    const {numeroSecreto,numeroTarjeta,fechaCaducidad} = data;
    const {tarjeta} = tipoTarjeta
  

    // actualizar los states
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
        setTipoTarjeta({
            ...tipoTarjeta,
            [e.target.name] : e.target.value
        })
    }

    const Pagar = e => {
        e.preventDefault()

        if( numeroSecreto === null || numeroTarjeta === null || fechaCaducidad === null ){
            actualizarError(true);
            return;
        }
             actualizarError(false);

        //realizar pago en la base de datos 
        if(auth.currentUser.uid != null ){
            firestore.collection('usuariosRgistrados').doc(auth.currentUser.uid).collection("pagos").doc("vehiculo").set(pagoSeguro);
            alert("se ha realizado el pago");
        }else{
            console.log('no hay usuario ');
        }

    }
    
    return( 
    <>
    <h1>Pagar con tarjeta</h1>

    <div>
        <label>Elegir tarjeta </label>
        <input
            type="radio"
            name="tarjeta"
            value="visa"
            checked={tarjeta === "visa"}
            onChange={actualizarState}
        /> 
        Visa

        <input
            type="radio"
            name="tarjeta"
            value="mastercard"
            checked={tarjeta === "mastercard"}
            onChange={actualizarState}
        />
        Mastercard
    </div>


    <form
        onSubmit={Pagar}
    >
        <label>Numero tarjeta</label>
        <input
            type="number"
            name="numeroTarjeta"
            value={numeroTarjeta}
            onChange={actualizarState}
        ></input>
        
        <label>Numero secreto</label>
        <input
            type="number"
            name="numeroSecreto"
            value={numeroSecreto}
            onChange={actualizarState}
        ></input>

        <label>Fecha caducidad</label>
        <input
            type="number"
            name="fechaCaducidad"
            value={fechaCaducidad}
            onChange={actualizarState}
        ></input>
        <button type="submit">Pagar</button>
    </form>
    </>
)};
export default PayTarjet ;