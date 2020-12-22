import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

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
              type="date"
              name="dateIssue"
              value={dateIssue}
              onChange={obtenerDatos}
            />
          </div>

          <div class="form-group">
            <label>Mensaje:</label>
            <textarea
              name="incidenceContext"
              rows="4"
              cols="50"
              value={incidenceContext}
              onChange={obtenerDatos}
            />
          </div>

          {error ? <label>Debes rellenar todos los campos</label> : null}
          <button type="submit" class="btn btn-primary submit">
            Enviar
          </button>
          <Link to={"/Incidences"}>
            <span class="btn btn-danger ml-2">Cancelar</span>
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default NewIncidence;
