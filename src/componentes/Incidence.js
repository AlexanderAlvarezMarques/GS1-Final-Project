import React, { Fragment, useState } from "react";
import { Router, useHistory } from "react-router-dom";
//import { auth, firestore } from "../firebaseConfig";

const Incidence = () => {
  //para rediccionar
  let history = useHistory();


  //    HTML
  return(
      <Fragment>
          <h2> Incidencia</h2>
          <form>
              <label>Asunto: </label>
              <input type="text" name="issue"/>
              <br></br>
              <label>Fecha: </label>
              <input type="text" name="issue"/>
              <br></br>
              <label>Tema de incidencia: </label>
              <input type="text" name="incidence"/>
          </form>
      </Fragment>
  )
};
export default Incidence;