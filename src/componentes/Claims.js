import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import ReactDOM from "react-dom";

const Claims = () => {
  let history = useHistory();
  const misReclamaciones = (e) => {
    history.push("/newClaim");
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
      <div class="container">
        
        <div class="claims">

          <h1 class="my-4">Mis reclamaciones</h1>

          <div class="titles">
            <div class="title-1">Asunto</div>
            <div class="title-2">Descripción</div>
          </div>

          <div class="claim">
            <h3 class="subject">Asunto 1</h3>
            <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus, justo vel euismod scelerisque, ex velit finibus enim, quis pretium felis quam vel lectus. Maecenas non facilisis urna, id posuere turpis.
            </div>
          </div>

          <div class="claim">
            <h3 class="subject">Asunto 2</h3>
            <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus, justo vel euismod scelerisque, ex velit finibus enim, quis pretium felis quam vel lectus. Maecenas non facilisis urna, id posuere turpis.
            </div>
          </div>

          <div class="claim">
            <h3 class="subject">Asunto 3</h3>
            <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus, justo vel euismod scelerisque, ex velit finibus enim, quis pretium felis quam vel lectus. Maecenas non facilisis urna, id posuere turpis.
            </div>
          </div>

        </div>

      </div>
    </Fragment>
  );
};
export default Claims;  
