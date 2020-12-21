import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {auth} from '../firebaseConfig'
import {useHistory} from 'react-router-dom';

const LogIn = () => {

  let history = useHistory();
  
  const [datos, guardarDatos] = useState({
    userName: "",
    passwd: "",
  });
  const [error, guardarError] = useState(false);

  // extrarer valores
  const { userName, passwd } = datos;

  const obtenerDatos = e => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };



    const iniciarSesion = e => {
      e.preventDefault();
      console.log("he pulsado el boton");
      
      if (userName.trim() === "" || passwd.trim() === "") {
        guardarError(true);
        return;
      }
      guardarError(false);

      auth.signInWithEmailAndPassword(userName, passwd)
      .then((user) => {
        // Signed in
        // ...
        console.log("se ha iniciado sesion")
        console.log(user)

        history.push("/sesion");
      })
      .catch((error) => {
        
      });

    };
  
  //    HTML
  return (
    <Fragment>
      {error ? <p>Tiene que iniciar sesion con un usuario registrado </p> : null }
      <form onSubmit={iniciarSesion}>
        <h2> Log In</h2>
        <div>
          <label>Nombre de usuario:&nbsp;</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={obtenerDatos}
          />
        </div>
        <br></br>
        <div>
          <label>
            Contraseña:
          </label>
          <input
            type="password"
            name="passwd"
            value={passwd}
            onChange={obtenerDatos}
          />
        </div>
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