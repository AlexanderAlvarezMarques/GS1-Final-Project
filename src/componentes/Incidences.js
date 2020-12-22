import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import ReactDOM from "react-dom";

const Incidences = () => {
    let history = useHistory();

    const misIncidences = (e) => {
        history.push("/NewIncidence");
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
            <div class="claims">

                <div class="form-group">

                    <h1 class="my-4">Mis incidencias</h1><br />

                    <Link to={"/sesion"}>
                        <span class="btn btn-secondary">
                            Volver
                            </span>
                    </Link>

                    <button onClick={misIncidences} class="btn btn-primary">Nueva Incidencia</button>
                </div>

                <div class="titles">
                    <div class="title-1">Asunto</div>
                    <div class="title-2">Descripción</div>
                </div>

                <div class="claim">
                    <h3 class="subject">Incidencia ID: 1</h3>
                    <p>Fecha: xx-xx-xxxx</p>
                    <div class="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus, justo vel euismod scelerisque, ex velit finibus enim, quis pretium felis quam vel lectus. Maecenas non facilisis urna, id posuere turpis.
                    </div>
                </div>

                <div class="claim">
                    <h3 class="subject">Incidencia ID: 2</h3>
                    <p>Fecha: xx-xx-xxxx</p>
                    <div class="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus, justo vel euismod scelerisque, ex velit finibus enim, quis pretium felis quam vel lectus. Maecenas non facilisis urna, id posuere turpis.
                        </div>
                </div>

                <div class="claim">
                    <h3 class="subject">Incidencia ID: 3</h3>
                    <p>Fecha: xx-xx-xxxx</p>
                    <div class="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus, justo vel euismod scelerisque, ex velit finibus enim, quis pretium felis quam vel lectus. Maecenas non facilisis urna, id posuere turpis.
                        </div>
                </div>

            </div>
        </Fragment>
    );
};
export default Incidences;
