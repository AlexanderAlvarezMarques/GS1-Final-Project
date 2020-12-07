import React, { Fragment, useState } from "react";
import { Router, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const LogIn = () => {
  //para rediccionar
  let history = useHistory();


  //    HTML
  return(
      <Fragment>
          <h2> Log In</h2>
          <form>
              <label>Nombre de usuario: </label>
              <input type="text" name="userName"/>
              <br></br>
              <label>Contraseña</label>
              <input type="password" name="passwd"/>
          </form>

      </Fragment>
  )
};
export default LogIn;
