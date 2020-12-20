import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Router, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import ReactDOM from "react-dom";

const Claims = () => {
  let history = useHistory();
  const misReclamaciones = (e) => {
    history.push("/newClaim");
  };
  const list = document.querySelector("ul");

  const [claimData, setInci] = useState({
    claim: [],
  });
  const { claim } = claimData;

  let clm = [];

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
            console.log("Document data:", doc.data().reclamaciones); 
            doc.data().reclamaciones.forEach((claim) => {
              html += `
                <li>
                  <div>
                    <h2>Reclamación:</h2>
                    Asunto: ${claim.asunto}
                    <br></br>
                    Descripción: ${claim.descripcion}
                  </div>
                </li>
            `;
              //list.innerHTML += html;

              ReactDOM.render(
                <div dangerouslySetInnerHTML={{ __html: html }} />,
                document.getElementById("reclamacion")
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
      <h1>Mis reclamaciones</h1>
      <br></br>
      <div id="reclamacion">
      </div>
      <br></br>
      <button onClick={misReclamaciones}> Nueva Reclamacion</button>
      <br></br>
      <Link to={"/sesion"}>Volver</Link>
    </Fragment>
  );
};
export default Claims;