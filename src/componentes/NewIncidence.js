import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import styled from "@emotion/styled";


const NewIncidence = () => {
  //para rediccionar
  //Se ha cambiado
  let history = useHistory();

  const [datos, guardarDatos] = useState({
    issue: "",
    dateIssue: "",
    incidenceContext: "",
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
      <form onSubmit={enviarIncidencia}>
        <h2> Incidencia</h2>
        <div>
          <h3>Asunto:&nbsp;</h3>
          <input
            type="text"
            name="issue"
            value={issue}
            onChange={obtenerDatos}
          />
        </div>
        <br></br>
        <div>
          <h3>Fecha de incidencia:&nbsp;</h3>
          <input
            type="date"
            name="dateIssue"
            value={dateIssue}
            onChange={obtenerDatos}
          />
        </div>
        <br></br>
        <div>
          <h3>Mensaje: </h3>
          {/* <input
            type="text"
            name="incidenceContext"
            value={incidenceContext}
            onChange={obtenerDatos}
          /> */}
          <textarea
                    name="incidenceContext"
                    rows="4"
                    cols="50"
                    value={incidenceContext}
                    onChange={obtenerDatos}
                />
        </div>
        <br></br>
        {error ? <p>Debes rellenar todos los campos</p> : null}
        <button type="submit">Enviar</button>
        <Link to={"/Incidences"}> Volver</Link>
      </form>
    </Fragment>
  );
};

export default NewIncidence;
