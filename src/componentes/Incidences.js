import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Router, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import ReactDOM from "react-dom";

const Incidences = () => {
  let history = useHistory();

  const misIncidences = (e) => {
    history.push("/NewIncidence");
  };

  const list = document.querySelector("ul");

  const [inciData, setInci] = useState({
    inci: [],
  });
  const { inci } = inciData;

  let inc = [];

  auth.onAuthStateChanged((user) => {
    if (user) {
      //var uid = user.uid;
      var userUID = auth.currentUser.uid;

      var docRef = firestore.collection("usuariosRgistrados").doc(userUID);

      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            let html = "";
            console.log("Document data:", doc.data().incidencias);
            doc.data().incidencias.forEach((incidencia) => {
              html += `
                <li>
                  <div>
                    <h2>Incidencia: ${incidencia.issue}</h2>
                    Asunto: ${incidencia.incidenceContext}
                    <br></br>
                    Fecha: ${incidencia.dateIssue}
                  </div>
                </li>
            `;
              //list.innerHTML += html;

              ReactDOM.render(
                <div dangerouslySetInnerHTML={{ __html: html }} />,
                document.getElementById("incidencia")
              );
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  });

  return (
    <Fragment>
      <h1>Mis incidencias</h1>
      <br></br>
      <div id="incidencia">
      </div>
      <br></br>
      <button onClick={misIncidences}> Nueva incidencia</button>
      <br></br>
      <Link to={"/sesion"}>Volver</Link>
    </Fragment>
  );
};
export default Incidences;
