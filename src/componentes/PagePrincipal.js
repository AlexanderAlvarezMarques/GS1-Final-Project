import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Router, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const PagePrincipal = () => {
  const [seg, getSeguro] = useState([]);

  firestore
    .collection("seguros")
    .get()
    .then((snapshot) => {
      const seguro = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        seguro.push(data);
      });
      getSeguro({
        seg: seguro,
      });      
    })
    .catch((error) => console.log(error));

  function printSeg() {
      let html='';
      /*for (let property in seg) {
        html+=<p>Seguro:{seg[property]}</p> 
    };*/
    Object.values(seg).forEach(item => {html += item});

    console.log(html)
    return html
    }

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

      {printSeg()}
    </Fragment>
  );
};
export default PagePrincipal;
