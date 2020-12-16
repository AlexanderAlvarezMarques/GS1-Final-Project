import React, { useState }  from 'react';
import { auth, firestore } from '../firebaseConfig';

const PayTarjet = ({cotizacion}) => {
    
     //state para los campos del formulario
     const [data, setData] = useState({
        numeroTarjeta : '',
        numeroSecreto : '',
        fechaCaducidad : '',
        
    });

    const pagoSeguro = {
        precio: cotizacion,
        fecha: new Date().getTime().toString(),
    }

    const {numeroSecreto,numeroTarjeta,fechaCaducidad} = data;
    // estado para validaciones
    const [error, actualizarError] = useState(false);

    // actualizar campos del formulario
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const Pagar = e => {
        e.preventDefault()
        console.log("pagar con tarjeta");

        if( numeroSecreto === null || numeroTarjeta === null || fechaCaducidad === null ){
            actualizarError(true);
            return;
        }
            actualizarError(false);

        //realizar pago en la base de datos

        if(auth.currentUser.uid != null ){
            firestore.collection('usuariosRgistrados').doc(auth.currentUser.uid).update({
                "pagos": [pagoSeguro]
            }).then(() => {
                console.info('se ha actualizado el pago');
                
              }).catch((e) => {
                console.error('Mal', e);
                
              })
        }else{
            console.log('no hay usuario ');
        }



    }
    
    return( 
    <>
    <h1>Pagar con tarjeta</h1>
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