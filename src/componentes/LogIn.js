import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import {auth} from '../firebaseConfig'
import { Router, useHistory} from 'react-router-dom';

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
      // eslint-disable-next-line eqeqeq
      /*if (userName.trim() == "" || passwd.trim() == "") {
        guardarError(true);
        return;
      }*/
      auth.signInWithEmailAndPassword("magi61012@gmail.com", "123456")
      .then((user) => {
        // Signed in
        // ...
        console.log("Ha entrado juanma")
        console.log(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    guardarError(false);
    history.push("/sesion");
    };
  
  //    HTML
  return (
    <Fragment>
      <form onSubmit={iniciarSesion}>
        <h2> Log In</h2>
        <Contenedor>
          <Label>Nombre de usuario:&nbsp;</Label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={obtenerDatos}
          />
        </Contenedor>
        <br></br>
        <Contenedor>
          <Label>
            Contraseña:&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
          </Label>
          <input
            type="password"
            name="passwd"
            value={passwd}
            onChange={obtenerDatos}
          />
        </Contenedor>
        <br></br>
        {error ? <Error>Debes rellenar todos los campos</Error> : null}
        <Boton type="submit">Iniciar sesión</Boton>
        <br></br>
        <Link to={"/"}>Volver</Link>
      </form>
    </Fragment>
  );
};


export default LogIn;
