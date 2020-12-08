import React, { Fragment, useState } from "react";
import { Router, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import styled from "@emotion/styled";

const contenedor = styled.div`
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
`;

const LogIn = () => {
  //para redireccionar
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

    if (userName.trim() == "" || passwd.trim() == "") {
      guardarError(true);
      return;
    }
    guardarError(false);
  };

  //    HTML
  return (
    <Fragment>
      <form onSubmit={iniciarSesion}>
      <h2> Log In</h2>
      
        <contenedor>
          <Label>Nombre de usuario:&nbsp;</Label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={obtenerDatos}
          />
        </contenedor>
        <br></br>
        <contenedor>
          <Label>
            Contraseña:&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
          </Label>
          <input
            type="password"
            name="passwd"
            value={passwd}
            onChange={obtenerDatos}
          />
        </contenedor>
        <br></br>
        <Boton type="submit">Iniciar sesión</Boton>
      </form>
    </Fragment>
  );
};
export default LogIn;
