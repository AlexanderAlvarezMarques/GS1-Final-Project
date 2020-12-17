import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Router, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const PagePrincipal = () => {
  const [seg, getSeguro] = useState([]);
  const list = document.querySelector('ul');
  const addSeguro = (seguro) => {
    let html = `<li>
                  <div>
                    Tipo de seguro: ${seguro.Tipo}
                    <br></br>
                    Descripción: ${seguro.Descripcion}
                    <br></br>
                    Coberturas: ${seguro.Coberturas}
                    <br></br>
                    Precio: ${seguro.Precio}
                  </div>
                </li>`;
    console.log(html);
    list.innerHTML += html;
  };
  
  let i = 1;
  firestore
    .collection("seguros")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        addSeguro(doc.data());
        console.log(i);
      });
    })
    .catch((error) => console.log(error));

  return (
    <Fragment>
      <h1>Página Principal</h1>
      <Link to={"/signUp"}> Crear cuenta </Link>
      <br></br>
      <Link to={"/priceEstimate"}> Buscar estimacion de precio </Link>
      <br></br>
      <Link to={"/deleteAccount"}>darse de baja </Link>
      <br></br>
      <Link to={"/LogIn"}>Iniciar sesión </Link>
      <br></br>
      <Link to={"/sesion"}>ir a sesion </Link>
      <br></br>
      <Link to={"/NewIncidence"}>nueva incidencia </Link>
      <br></br>
      <Link to={"/Incidences"}>incidencias </Link>
      <br></br>
      <Link to={"/actualizarPerfil"}>actualizar perfil </Link>
      <Link to={"/extras"}>añadir extras </Link>
      <ul></ul>
    </Fragment>
  );
};
export default PagePrincipal;
