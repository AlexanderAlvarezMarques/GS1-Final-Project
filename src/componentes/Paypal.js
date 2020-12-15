import React, { useState }  from 'react';

const Paypal = () => {
    

    //state para los campos del formulario
    const [data, setData] = useState({
        correo : '',
        contraseña : '',
    });


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



    return( 
    <>
    <h1>Pagar con Paypal</h1>
    <form>
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
    </form>
    </>
)};
export default Paypal ;