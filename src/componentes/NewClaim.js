import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";


const NewClaim = () => {

    let history = useHistory();
    const [datos, guardarDatos] = useState({
        asunto: "",
        descripcion: "",
    });
    const [error, guardarError] = useState(false);

    // extrarer valores
    const { asunto, descripcion } = datos;

    const obtenerDatos = (e) => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    };

    const enviar = (e) => {
        e.preventDefault();

        // eslint-disable-next-line eqeqeq
        if (asunto.trim() == "" || descripcion.trim() == "") {
            guardarError(true);
            return;
        }
        if (auth.currentUser.uid != null) {
            console.log("entra en el if " + auth.currentUser.uid);
            var userUID = auth.currentUser.uid;
            firestore
                .collection("usuariosRgistrados")
                .doc(userUID)
                .update({
                    //apellido: 'pepito'
                    //incidencias: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
                    reclamaciones: [datos],
                })
                .then(() => {
                    console.info("todo actualizado");
                })
                .catch((e) => {
                    console.error("Mal", e);
                });
        } else {
            console.log("No hay nadie" + auth.currentUser.uid);
        }
        guardarError(false);
        history.push("/claims");
    };

    return (
        <Fragment>

            <div class="claims py-2">
            <h1>Nueva reclamación</h1>
            <div class="form-group">
                <label>Asunto: </label>
                <input
                    type="text"
                    name="asunto"
                    value={asunto}
                    onChange={obtenerDatos}
                />
                <br></br>
                <label>Descripción: </label>
                <br></br>
                <textarea
                    name="descripcion"
                    rows="4"
                    cols="50"
                    value={descripcion}
                    onChange={obtenerDatos}
                />
                <br></br>
            </div>
            <div>
                {error ? <p><label>Debes rellenar todos los campos</label></p> : null}
                <button onClick={enviar} type="submit" class="btn btn-primary">
                    Enviar
                </button>
                <Link to={"/claims"}><span class="btn btn-danger ml-1">Cancelar</span></Link>
            </div>
            </div>
        </Fragment>
    );
};

export default NewClaim;
