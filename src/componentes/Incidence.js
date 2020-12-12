import React, { Fragment, useState } from "react";
import { Router, useHistory } from "react-router-dom";
//import { auth, firestore } from "../firebaseConfig";

const Incidence = () => {
    //para rediccionar
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

      const enviarIncidencia = (e) => {
        e.preventDefault();
    
        if (issue.trim() == "" || dateIssue.trim() == "" || incidenceContext.trim() == "") {
          guardarError(true);
          return;
        }
        guardarError(false);
      };

    //    HTML
    return(
        <Fragment>
        <form onSubmit={enviarIncidencia}>
        <h2> Incidencia</h2>
        <contenedor>
          <h3>Asunto:&nbsp;</h3>
          <input
            type="text"
            name="issue"
            value={issue}
            onChange={obtenerDatos}
          />
        </contenedor>
        <br></br>
        <contenedor>
          <h3>Fecha de incidencia:&nbsp;</h3>
          <input
            type="text"
            name="dateIssue"
            value={dateIssue}
            onChange={obtenerDatos}
          />
        </contenedor>
        <br></br>
        <contenedor>
          <h3>Mensaje:&nbsp;</h3>
          <input
            type="text"
            name="incidenceContext"
            value={incidenceContext}
            onChange={obtenerDatos}
          />
        </contenedor>
        <br></br>
        {error ? <a>Debes rellenar todos los campos</a> : null}
        <button type="submit">Enviar</button>
        </form>
        </Fragment>
    )
};
export default Incidence;