import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import ReactDOM from "react-dom";

const SesionPage = () => {
  //para redireccionar
  let history = useHistory();

  //estados
  const [seguros, setSeguros] = useState([]);


  //constante que coje los seguros de firestore y añade los datos con el id en el estado de seguros
  const seguroDB = async () => {
    firestore.collection("seguros").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      //añado los seguros de firestore a mi estado
      setSeguros(...seguros, docs);
    });
  };

  //se queda escuchando cada cambio y se va actualizando
  useEffect(() => {
    seguroDB();
  }, []);

  auth.onAuthStateChanged((user) => {
    if (user) {
      var userUID = auth.currentUser.uid;
      let nombre = "<h1>Sesión iniciada por ";
      var docRef = firestore.collection("usuariosRgistrados").doc(userUID);
      docRef.get().then(function (doc) {
        if (doc.exists) {
          nombre += `${doc.data().nombre} </h1>`;
          ReactDOM.render(
            <div dangerouslySetInnerHTML={{ __html: nombre }} />,
            document.getElementById("welcome")
          );
        } else {
          nombre += `null </h1>`;
          ReactDOM.render(
            <div dangerouslySetInnerHTML={{ __html: nombre }} />,
            document.getElementById("welcome")
          );
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }
  });

  const cerrarSesion=()=>{
    auth.signOut();
    history.push("/");
  }

  return (
    <Fragment>
      <div id="welcome"></div>
      <Link to={"/claims"}>Mis reclamaciones</Link>
      <br></br>
      <Link to={"/Incidences"}>Mis Incidencias</Link>
      <br></br>
      <Link to={"/buscador"}>Buscar Seguro</Link>
      <br></br>
      <Link to={"/DeleteAccount"}>Eliminar cuenta</Link>
      <br></br>
      <Link to={"/actualizarPerfil"}>Actualizar perfil</Link>
      <br></br>
      <Link to={"/priceEstimate"}>Estimación de precio</Link>
      <br></br>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
      <br></br>
      <h1>OFERTAS</h1>
      <div>
        {/* recorro mi state y devuelve cada seguro */}
        {seguros.map((s) => {
          return (
            <div key={s.id}>
              <h1>Tipo de seguro: {s.Tipo}</h1>
              <p>Descripción: {s.Descripcion}</p>
              <p>Coberturas : {s.Coberturas}</p>
              <p>Precio: {s.Precio}</p>
              <Link to={`/contratarSeguro/${s.id}`}>Contratar seguro</Link>
              {/* <button onClick={ () => contratar(s.id)}>Contratar</button> */}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
export default SesionPage;
