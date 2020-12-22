import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import styled from "@emotion/styled";


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
      console.log('añadiendo datos state');
      
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
     
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
