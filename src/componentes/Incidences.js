import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Router, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const Incidences = () => {
  let history = useHistory();

  const [datos, guardarDatos] = useState({
    incidencia:[],
  });
  const {incidencia}=datos;


  const misIncidences = (e) => {
    history.push("/NewIncidence");
  };
  const list = document.querySelector("ul");
  const addIssue = (incidencias) => {
    let html = `
        <li>
            <div>${incidencias}</div>
        </li>
    `;
    console.log(html);
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      //var uid = user.uid;
      var userUID = auth.currentUser.uid;

      var docRef = firestore.collection("usuariosRgistrados").doc(userUID);

      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            guardarDatos(...incidencia,doc.data().incidencias);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  });
  console.log(incidencia);

  return (
    <Fragment>
      <h1>Mis incidencias</h1>
      <label> AQUI IRIAN LAS INCIDENCIAS</label>
      <br></br>
      <button onClick={misIncidences}> Nueva incidencia</button>
      <br></br>
      <Link to={"/sesion"}>Volver</Link>
    </Fragment>
  );
};
export default Incidences;
