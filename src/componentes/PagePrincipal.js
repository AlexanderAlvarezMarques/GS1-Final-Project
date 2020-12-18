import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const PagePrincipal = () => {
  let history = useHistory();
  const [datos, getId] = useState({
    idSeg: "",
  });

  const [error, guardarError] = useState(false);

  const {idSeg} = datos;

  const obtenerID = e => {
    getId({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const contratar = (e) => {
    e.preventDefault();
    console.log('pulse el boton');
    
    if (idSeg.trim() == "") {
      console.log('entro por el if');
      
      guardarError(true);
      return;
    }

    guardarError(false);
    //history.push("/contratarSeguro");
    history.push({

      pathname: '/contratarSeguro',
      state: { detail: idSeg }
    })
  };
  //const list = document.getElementById("seguros");
  let html = "";
  const addSeguro = (doc) => {
    let seguro=doc.data()
    html += `
            <li>
              <div>
                ID: ${doc.id}
                <br></br>
                Tipo de seguro: ${seguro.Tipo}
                <br></br>
                Descripción: ${seguro.Descripcion}
                <br></br>
                Coberturas: ${seguro.Coberturas}
                <br></br>
                Precio: ${seguro.Precio} €
              </div>
              <button click="${contratar}">Contratar</button>
            </li>
            `;
    //list.innerHTML += html;
    
    ReactDOM.render(
      <div dangerouslySetInnerHTML={{ __html: html }} />,
      document.getElementById("seguros")
    );
  };

  firestore
    .collection("seguros")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {

        console.log(doc);
        addSeguro(doc);
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
          <div id="seguros"></div>
          <br></br>
          {error ? <a>Debes rellenar especificar el ID del seguro<br></br></a> : null}
          <input
            type="text"
            name="idSeg"
            value={idSeg}
            onChange={obtenerID}
          />
        
          
        </body>
      </html>
    </Fragment>
  );
};
export default PagePrincipal;
