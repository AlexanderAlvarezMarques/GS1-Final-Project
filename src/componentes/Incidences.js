import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Router, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const Incidences = () => {
  let history = useHistory();

  const misIncidences = (e) => {
    history.push("/NewIncidence");
  };

  const list = document.querySelector("ul");

  const [inci,setInci]=useState([])

  auth.onAuthStateChanged((user) => {
    if (user) {
      //var uid = user.uid;
      var userUID = auth.currentUser.uid;

      var docRef = firestore.collection("usuariosRgistrados").doc(userUID);

      docRef.get().then(function(doc) {
          // if (doc.exists) {
          //     console.log("Document data:", doc.data().incidencias);
          //     // setInci(
          //     //   ...inci,
          //     //   doc.data().incidencias)
          //       console.log('data: ', inci);
                
            
             
          // } else {
          //     console.log("No such document!");
          // }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
  });

  function printInci(){
    for (const i in inci) {
      [i].map(a => (
        <p>Incidencia: {a.issue}</p>

      )) 
    }
  }

  

  return (
    <Fragment>
      <h1>Mis incidencias</h1>
      <label> AQUI IRIAN LAS INCIDENCIAS</label>
      <br></br>

      
      {printInci()}
      
      
      
      <button onClick={misIncidences}> Nueva incidencia</button>
      <br></br>
      <Link to={"/sesion"}>Volver</Link>
    </Fragment>
  );
};
export default Incidences;