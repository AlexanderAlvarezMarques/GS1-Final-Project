import React , { useState } from 'react';
import PayTarjet from './PayTarjet'
import Paypal from './Paypal'

const ContratarSeguro = () => {

    //comprobar que hay un usuario, si no lo hay ir a registrarse o loguearse

    //si esta registrado entonces llamar al componente de pago

    //luego guardar seguro en la base de datos del usuario

    //luego redireccionar a la pagina principal 



    // state para los campos del formulario
    const [data, setData] = useState({
      tipo : 'visa',
    });

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
            <h1>Contratar seguro: Forma de pago</h1>

            <div>
                <label>Pagar con tarjeta </label>
                <input
                    type="radio"
                    name="tipo"
                    value="visa"
                    checked={tipo === "visa"}
                    onChange={actualizarState}
                /> 
                Visa

                <input
                    type="radio"
                    name="tipo"
                    value="mastercard"
                    checked={tipo === "mastercard"}
                    onChange={actualizarState}
                />
                Mastercard
            </div>

            <div>
                <label>Pagar con paypal</label>
                <input
                    type="radio"
                    name="tipo"
                    value="paypal"
                    checked={tipo === "paypal"}
                    onChange={actualizarState}
                /> 
                Paypal
            </div>

            {tipo === 'visa' || tipo === 'mastercard' ? <PayTarjet /> : <Paypal />}

        </>
    )
};
export default ContratarSeguro ;