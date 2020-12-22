import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { useHistory } from "react-router-dom";


const PayTarjet = ({ resumen, idSeguro }) => {

    let history = useHistory();

    console.log('id seguro desde PayTarjet: ' + idSeguro);
    const [precio, setPrecioSeguro] = useState(0);
    const [datosSeguroPagePrincipal, setDatosSeguroPagePrincipal] = useState();
    // console.log('resumen ',resumen);
    // console.log('cotizacion de resumen ', resumen.cotizacion);
    // console.log('cotizacion de datos ', resumen.datos);



    useEffect(() => {
        const docRef = firestore.collection("seguros").doc(idSeguro)
        docRef.get().then(function (doc) {
            var docs = []
            if (doc.exists) {
                console.log("Precio:", doc.data().Precio);
                console.log('datos ', doc.data());

                setPrecioSeguro(doc.data().Precio)
                docs.push({ ...doc.data(), id: doc.id })
                setDatosSeguroPagePrincipal(docs)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }, [])


    // state para el tipo de tarjeta
    const [tipoTarjeta, setTipoTarjeta] = useState({
        tarjeta: 'visa',
    });

    //state para los campos del formulario
    const [data, setData] = useState({
        numeroTarjeta: '',
        numeroSecreto: '',
        fechaCaducidad: '',
    });


    var price = 0
    var datos = {}
    try {
        price = (resumen.cotizacion != null ? resumen.cotizacion : precio)
        datos = resumen.datos
    } catch {
        price = precio
        datos = datosSeguroPagePrincipal
    }

    //const price = (resumen.cotizacion != null ? resumen.cotizacion : precio)
    console.log('valor de precio es: ', price);

    //state para el pago
    const pagoSeguro = {
        formaDePago: tipoTarjeta,
        precio: price,
        datos: datos,
        fecha: new Date().getTime().toString(),
    }

    // estado para validaciones
    const [error, actualizarError] = useState(false);

    const { numeroSecreto, numeroTarjeta, fechaCaducidad } = data;
    const { tarjeta } = tipoTarjeta


    // actualizar los states
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        setTipoTarjeta({
            ...tipoTarjeta,
            [e.target.name]: e.target.value
        })
    }

    const Pagar = e => {
        e.preventDefault()

        if (numeroSecreto === null || numeroTarjeta === null || fechaCaducidad === null) {
            actualizarError(true);
            return;
        }
        actualizarError(false);

        //realizar pago en la base de datos 
        if (auth.currentUser.uid != null) {

            firestore.collection('usuariosRgistrados').doc(auth.currentUser.uid).collection("pagos").doc("vehiculo").set(pagoSeguro);
            alert("Ha realizado su pago correctamente!");
            history.push("/sesion");
        } else {
            console.log('no hay usuario ');
        }

    }

    return (
        <>
            <h4 class="my-3">Pagar con tarjeta</h4>

            <div class="display_inline">
                <label>Elegir tarjeta:</label><br/>
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
                    class="ml-2"
                />
                Mastercard
            </div>

            {error === true ? <p>Necesitan rellenar todos los campos </p> : null}
            <form
                onSubmit={Pagar}
                class="mt-2"
            >

                <div class="form-group">
                    <b><label>Numero tarjeta</label></b>
                    <input
                        type="number"
                        name="numeroTarjeta"
                        value={numeroTarjeta}
                        onChange={actualizarState}
                    ></input>
                </div>

                <div class="form-group">
                    <b><label>Numero secreto</label></b>
                    <input
                        type="number"
                        name="numeroSecreto"
                        value={numeroSecreto}
                        onChange={actualizarState}
                    ></input>
                </div>

                <div class="form-group">
                    <b><label>Fecha caducidad</label></b>
                    <input
                        type="date"
                        name="fechaCaducidad"
                        value={fechaCaducidad}
                        onChange={actualizarState}
                    ></input>
                </div>
                <button type="submit" class="btn btn-primary submit">Pagar</button>
            </form>
        </>
    )
};
export default PayTarjet;