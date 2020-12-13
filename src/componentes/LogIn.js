import React, { Fragment, useState } from "react";
import { useHistory, Link } from "react-router-dom";

//import { auth, firestore } from "../firebaseConfig";

const LogIn = () => {

    let history = useHistory();

    const [datos, guardarDatos] = useState({
      userName: "",
      passwd: "",
    });
    const [error, guardarError] = useState(false);
  
    // extrarer valores
    const { userName, passwd } = datos;
  
    const obtenerDatos = (e) => {
      guardarDatos({
        ...datos,
        [e.target.name]: e.target.value,
      });
    };
  
    //  cuando el usuario pulsa submit
    const iniciarSesion = (e) => {
      e.preventDefault();
  
      // eslint-disable-next-line eqeqeq
      if (userName.trim() == "" || passwd.trim() == "") {
        guardarError(true);
        return;
      }
      guardarError(false);
      window.location.href = "/sesion";
    };
  
    //    HTML
    return (
      <Fragment>
        <form onSubmit={iniciarSesion}>
          <h2> Log In</h2>
          <contenedor>
            <h2>Nombre de usuario:&nbsp;</h2>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={obtenerDatos}
            />
          </contenedor>
          <br></br>
          <contenedor>
            <h2>
              Contraseña:&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;
            </h2>
            <input
              type="password"
              name="passwd"
              value={passwd}
              onChange={obtenerDatos}
            />
          </contenedor>
          <br></br>
          {error ? <a>Debes rellenar todos los campos</a> : null}
          <button type="submit">Iniciar sesión</button>
          <br></br>
          <Link to={"/"}>Volver</Link>
        </form>
      </Fragment>
    );
  };
  export default LogIn;
