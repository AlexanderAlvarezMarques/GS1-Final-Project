import React , { Fragment, useState } from 'react';
import PayTarjet from './PayTarjet'
import Paypal from './Paypal'
import { useParams } from 'react-router-dom';

const ContratarSeguro = () => {

    // state para los campos del formulario
    const [data, setData] = useState({
      tipo : 'tarjeta'
    });
    
    //obtengo el id de la url
    const { id } = useParams()

    const {path} = useParams()
    console.log('path es ', path);
    

    const {tipo} = data;

    // actualizar campos del formulario
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }


    return( 
        <Fragment>
            
            <div class="contract_insuarance py-2">
                <h3>Forma de pago:</h3>
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
                    class="ml-2"
                /> 
                Paypal
                
                <hr/>

                {tipo === 'tarjeta'  ? <PayTarjet idSeguro={id}/> : <Paypal  idSeguro={id}/>}
            </div>
        </Fragment>
    )
};
export default ContratarSeguro ;