import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import styled from "@emotion/styled";

const Contenedor = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  background-color: #ff5733;
  width: 100%;
`;
const Label = styled.label`
  flex: 0 0 100px;
  width: 100%;
`;
const Boton = styled.button`
  background-color: #00838f;
  font-size: 10px;
  width: 50%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
  margin-top: 1rem;
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 0.5rem;
  width: 47.5%;
  text-align: center;
  margin-top: 1rem;
`;

const NewIncidence = () => {
    //para rediccionar
    //Se ha cambiado
    let history = useHistory();

    const [datos, guardarDatos] = useState({
        issue: "pinchazo",
        dateIssue: "1-10-2020",
        incidenceContext: "la rueda a la caca",
    });

    const [error, guardarError] = useState(false);
    const { issue, dateIssue, incidenceContext } = datos;

    const obtenerDatos = (e) => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    };

    console.log(auth.currentUser.uid);

    const enviarIncidencia = (e) => {
        e.preventDefault();

        if (
            issue.trim() === "" ||
            dateIssue.trim() === "" ||
            incidenceContext.trim() === ""
        ) {
            guardarError(true);
            return;
        }

        //Codigo BD
        if (auth.currentUser.uid != null) {
            console.log("entra en el if " + auth.currentUser.uid);
            var userUID = auth.currentUser.uid;
            firestore
                .collection("usuariosRgistrados")
                .doc(userUID)
                .update({
                    //apellido: 'pepito'
                    //incidencias: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
                    incidencias: [datos],
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
        history.push("/Incidences");
    };

    //    HTML
    return (
        <Fragment>
            <div class="claims py-2">
                <form onSubmit={enviarIncidencia}>
                    <h2> Incidencia</h2>
                    <div class="form-group">
                        <label>Asunto:&nbsp;</label>
                        <input
                            type="text"
                            name="issue"
                            value={issue}
                            onChange={obtenerDatos}
                        />
                    </div>

                    <div class="form-group">
                        <label>Fecha de incidencia:&nbsp;</label>
                        <input
                            type="text"
                            name="dateIssue"
                            value={dateIssue}
                            onChange={obtenerDatos}
                        />
                    </div>

                    <div class="form-group">
                        <label>Mensaje:</label>
                        <input
                            type="text"
                            name="incidenceContext"
                            value={incidenceContext}
                            onChange={obtenerDatos}
                        />
                    </div>


                    {error ? <Error>Debes rellenar todos los campos</Error> : null}
                    <button type="submit" class="btn btn-primary submit">Enviar</button>
                    <Link to={"/Incidences"}><span class="btn btn-danger ml-2">Cancelar</span></Link>
                </form>
            </div>
        </Fragment>
    );
};

export default NewIncidence;
