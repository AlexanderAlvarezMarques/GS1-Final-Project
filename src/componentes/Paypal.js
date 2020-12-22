import React, { useState, useEffect, Fragment } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { useHistory } from "react-router-dom";


const Paypal = ({ cotizacion, idSeguro }) => {

    console.log('id seguro desde Paypal: ' + idSeguro);

    let history = useHistory();

    const [precio, setPrecioSeguro] = useState(0);

    useEffect(() => {
        const docRef = firestore.collection("seguros").doc(idSeguro)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Precio:", doc.data().Precio);
                setPrecioSeguro(doc.data().Precio)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }, [])


    //state para los campos del formulario
    const [data, setData] = useState({
        correo: '',
        contraseña: '',
    });

    console.log("fecha: " + new Date().getTime());


    const price = (cotizacion != null ? cotizacion : precio)
    console.log('valor de precio es: ', price);

    const pagoSeguro = {
        precio: price,
        fecha: new Date().getTime().toString(),
    }

    const { correo, contraseña } = data;
    const [error, actualizarError] = useState(false);

    // actualizar campos del formulario
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const pagar = e => {
        e.preventDefault();

        if (correo.trim() === '' || contraseña.trim() === '') {
            actualizarError(true);
            return;
        }
        actualizarError(false);
        //realizar pago en la base de datos 
        if (auth.currentUser.uid != null) {
            console.log('user ', auth.currentUser.uid);

            firestore.collection('usuariosRgistrados').doc(auth.currentUser.uid).collection("pagos").doc("vehiculo").set(pagoSeguro);
            alert("Ha realizado su pago correctamente!");
            history.push("/sesion");

        } else {
            console.log('no hay usuario ');
        }

    }

    return (
        <Fragment>
            <h4 class="my-3">Pagar con Paypal</h4>
            { error ? <p>Debe rellenar los campos! </p> : null}
            <form
                onSubmit={pagar}
            >
                <div class="form-group">
                    <label>Correo</label>
                    <input
                        type="text"
                        name="correo"
                        value={correo}
                        onChange={actualizarState}
                    ></input>
                </div>

                <div class="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="contraseña"
                        value={contraseña}
                        onChange={actualizarState}
                    ></input>
                </div>
                <button type="submit" class="btn btn-primary submit">Pagar</button>
            </form>
        </Fragment>
    )
};
export default Paypal;