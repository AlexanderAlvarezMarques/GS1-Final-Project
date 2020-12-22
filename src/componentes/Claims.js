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
                
                  <div>
                    <h3>Asunto: ${claim.asunto}</h3>
                    Descripción: ${claim.descripcion}
                  </div>
                
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
            <div class="claims">

                <div class="form-group">
                
                <h1 class="my-4">Mis reclamaciones</h1><br/>

                <br></br>
                <div id = "reclamacion"></div>
                <br></br>
                <Link to={"/sesion"}>
                    <span class="btn btn-secondary">
                        Volver
                    </span>
                </Link>

                <button onClick={misReclamaciones} class="btn btn-primary"> Nueva Reclamacion</button>
                </div>
            </div>
        </Fragment>
    );
};
export default Claims;  