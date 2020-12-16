import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Router, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const Incidences = () => {
  let history = useHistory();

  const misIncidences = (e) => {
    history.push("/NewIncidence");
  };
  /*const list = document.querySelector("ul");
  const addIssue = (incidencias) => {
    let html = `
        <li>
            <div>${incidencias}</div>
        </li>
    `;
    console.log(html);
  };*/

  auth.onAuthStateChanged((user) => {
    if (user) {
      //var uid = user.uid;
      var userUID = auth.currentUser.uid;
      var dniCU = userUID.dni;
      firestore
        .collection("usuariosRgistrados").where("dni", "==", dniCU)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().incidencias[0]);
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  });

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
