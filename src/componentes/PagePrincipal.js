import React, { Fragment, useState, useEffect } from "react";
import { Router, Link, useHistory, Route } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import ContratarSeguro from "./ContratarSeguro";
import NewIncidence from "./NewIncidence";

const PagePrincipal = () => {

  //para redireccionar
  let history = useHistory();


  //estados
  const [error, guardarError] = useState(false);
  const [seguros, setSeguros] = useState([]);



  //metodo al pulsar el boton para contratar
  const contratar = (id) => {
    if(window.confirm("Estas seguro de que quieres contratar este seguro?")){
      console.log('pulse el boton', id);
      history.push()
    }
    
  };

  
  //constante que coje los seguros de firestore y añade los datos con el id en el estado de seguros
  const seguroDB = async() => {
    firestore.collection("seguros").onSnapshot((querySnapshot) => {
    const docs = [];    
      querySnapshot.forEach((doc) => {
          docs.push({...doc.data(), id:doc.id});
      })
      //añado los seguros de firestore a mi estado
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
          <Link to={"/buscador"}>Buscar Seguro</Link>
          <br></br>
          <div id="seguros"></div>
          <br></br>
          <h1>OFERTAS</h1>
          <div>
            {/* recorro mi state y devuelve cada seguro */}
            {seguros.map(s => {
              return (<div key={s.id}>
                  <h1>Tipo de seguro: {s.Tipo}</h1>
                  <p>Descripción: {s.Descripcion}</p>
                  <p>Coberturas : {s.Coberturas}</p>
                  <p>Precio: {s.Precio}</p>
                  <Link to={`/contratarSeguro/${s.id}`}>Contratar seguro</Link>
                  {/* <button onClick={ () => contratar(s.id)}>Contratar</button> */}
                  </div>
            )})}
          </div>
          {/* {error ? <a>Debes rellenar especificar el ID del seguro<br></br></a> : null} */}

    </Fragment>
  );
};
export default PagePrincipal;
