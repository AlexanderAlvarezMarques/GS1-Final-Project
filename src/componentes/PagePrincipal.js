import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const PagePrincipal = () => {

  //para redireccionar
  let history = useHistory();


  //estados
  const [error, guardarError] = useState(false);

  const [seguros, setSeguros] = useState([]);



  //metodo al pulsar el boton para contratar
  const contratar = (e) => {
    e.preventDefault();
    console.log('pulse el boton');
    guardarError(false);
  };

  
  //constante que coje los seguros de firestore y añade los datos con el id en el estado de seguros
  const seguroDB = async() => {
    firestore.collection("seguros").onSnapshot((querySnapshot) => {
    const docs = [];    
      querySnapshot.forEach((doc) => {
          docs.push({...doc.data(), id:doc.id});
          //addSeguro(doc.data());
      })
      console.log(docs);
      setSeguros(
        ...seguros,
        docs
      )
    }
  )};

  //se queda escuchando cada cambio y se va actualizando
    useEffect(() => {
      seguroDB()
    },[])




  return (
    <Fragment>
          <h1>Página Principal</h1>
          <Link to={"/signUp"}> Crear cuenta </Link>
          <br></br>
          <Link to={"/priceEstimate"}> Buscar estimacion de precio </Link>
          <br></br>
          <Link to={"/deleteAccount"}>darse de baja </Link>
          <br></br>
          <Link to={"/LogIn"}>Iniciar sesión </Link>
          <br></br>
          <Link to={"/sesion"}>ir a sesion </Link>
          <br></br>
          <Link to={"/NewIncidence"}>nueva incidencia </Link>
          <br></br>
          <Link to={"/Incidences"}>incidencias </Link>
          <br></br>
          <Link to={"/actualizarPerfil"}>actualizar perfil </Link>
          <br></br>
          <Link to={"/extras"}>añadir extras </Link>
          <br></br>
          <div id="seguros"></div>
          <br></br>
          <h1>Mis seguros</h1>
          <div>
            {seguros.map(s => {
              return (<>
                  <h1>Tipo de seguro: {s.Tipo}</h1>
                  <p>Descripción: {s.Descripcion}</p>
                  <p>Coberturas : {s.Coberturas}</p>
                  <p>Precio: {s.Precio}</p>
                  <button></button>
                  </>
            )})}
          </div>
          {/* {error ? <a>Debes rellenar especificar el ID del seguro<br></br></a> : null} */}

    </Fragment>
  );
};
export default PagePrincipal;
