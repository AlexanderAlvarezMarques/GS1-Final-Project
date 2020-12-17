import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const PagePrincipal = () => {
  const [seg, getSeguro] = useState([]);
  let history = useHistory();

  const contratar = (e) => {
    history.push("/contratarSeguro");
  };
  //const list = document.getElementById("seguros");
  let html = "";
  const addSeguro = (seguro) => {
    html += `
     <li>
      <div>
      Tipo de seguro: ${seguro.Tipo}
      <br></br>
      Descripción: ${seguro.Descripcion}
      <br></br>
      Coberturas: ${seguro.Coberturas}
      <br></br>
      Precio: ${seguro.Precio}
      <br></br>
      </div>
      </li>
                `;
    console.log(html);
    //list.innerHTML += html;
    ReactDOM.render(
      <div dangerouslySetInnerHTML={{ __html: html }} />,
      document.getElementById("seguros")
    );
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
      <html lang="en">
        <body>
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
          <br></br>
          <Link to={"/extras"}>añadir extras </Link>
          <br></br>
          <label id="seguros"></label>
          <button onClick={contratar}> Contratar</button>
        </body>
      </html>
    </Fragment>
  );
};
export default PagePrincipal;
