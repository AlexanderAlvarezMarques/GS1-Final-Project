import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";


const Buscador = () => {
  const [seg, getSeguro] = useState({
    seleccion : '1' // 1= Basico, 2=TodoRiesgoNet, 3=TodoRiesgoSinNet
  })
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

  switch (seg.seleccion) {
    case '1':
      console.log("Entro en caso 1")
      firestore
      .collection("seguros")
      .where("Tipo", "==", "Seguro básico")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log("Que es esto: " + doc.data())
            addSeguro(doc.data())
            //console.log(doc.id, " => ", doc.data());
        });
    })
      .catch((error) => console.log(error));
      break;
    case '2':
      console.log("Entro en caso 2")
      firestore
      .collection("seguros")
      .where("Tipo", "==", "Todo a todo riesgo con franquicia")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          addSeguro(doc.data());
        });
      })
      .catch((error) => console.log(error));
      break;
    case '3':
      console.log("Entro en caso 3")
      firestore
      .collection("seguros")
      .where("Tipo", "==", "Todo a todo riesgo sin franquicia")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          addSeguro(doc.data());
          
        });
      })
      .catch((error) => console.log(error));
      break;
  }
  
  return (
    <Fragment>
      <html lang="en">
        <body>
          <h1>BUSCAR</h1>
          <br></br>
          <h3>Por tipo: </h3>

          <label id="seguros"></label>
          <button onClick={contratar}> Contratar</button>
        </body>
      </html>
    </Fragment>
  );
};
export default Buscador;