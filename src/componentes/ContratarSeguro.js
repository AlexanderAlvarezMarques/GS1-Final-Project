import React , { useState } from 'react';
import PayTarjet from './PayTarjet'
import Paypal from './Paypal'
import { useParams } from 'react-router-dom';

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

    // actualizar campos del formulario
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }


    return( 
        <>
            <div class="container">
        
        <div class="claims">

          <h1 class="my-4">Mis reclamaciones</h1>

          <div class="titles">
            <div class="title-1">Asunto</div>
            <div class="title-2">Descripción</div>
          </div>

          <div class="claim">
            <h3 class="subject">Asunto 1</h3>
            <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus, justo vel euismod scelerisque, ex velit finibus enim, quis pretium felis quam vel lectus. Maecenas non facilisis urna, id posuere turpis.
            </div>
          </div>

          <div class="claim">
            <h3 class="subject">Asunto 2</h3>
            <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus, justo vel euismod scelerisque, ex velit finibus enim, quis pretium felis quam vel lectus. Maecenas non facilisis urna, id posuere turpis.
            </div>
          </div>

          <div class="claim">
            <h3 class="subject">Asunto 3</h3>
            <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus, justo vel euismod scelerisque, ex velit finibus enim, quis pretium felis quam vel lectus. Maecenas non facilisis urna, id posuere turpis.
            </div>
          </div>

        </div>

      </div>
        </>
    )
};
export default ContratarSeguro ;
