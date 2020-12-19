import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";


const Buscador = () => {
  var seleccion = "1" // 1= Basico, 2=TodoRiesgoNet, 3=TodoRiesgoSinNet
  let history = useHistory();
  var tip = "Básico"
  const [seguros, setSeguros] = useState([]);
  
  const changeSearch = () => {
    if(seleccion === 1){
      var tip = "Básico"
    }
    if (seleccion === 2){  
      var tip = "Todo riesgo con franquicia"
    }
    if(seleccion === 3){
      var tip = "Todo riesgo sin franquicia"
    }
  }
  
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

  //metodo al pulsar el boton para contratar
  const contratar = (id) => {
    if(window.confirm("Estas seguro de que quieres contratar este seguro?")){
      console.log('pulse el boton', id);
      history.push()
    }
  };
  //se queda escuchando cada cambio y se va actualizando
  useEffect(() => {
    seguroDB()
  },[])

  //const list = document.getElementById("seguros");
  let html = "";
  const addSeguro = (seguro) => {
    html += `
     <li>
      <div>
      Tipo de seguro: ${seguro.Tipo}
      <br></br>
      Descripción: ${seguro.Descripcion}
      <br></br>
      Coberturas: ${seguro.Coberturas}
      <br></br>
      Precio: ${seguro.Precio}
      <br></br>
      </div>
      </li>
                `;
    console.log(html);
    //list.innerHTML += html;
    ReactDOM.render(
      <div dangerouslySetInnerHTML={{ __html: html }} />,
      document.getElementById("seguros")
    );
  };

  /*switch (seg.seleccion) {
    case '1':
      console.log("Entro en caso 1")
      firestore
      .collection("seguros")
      .where("Tipo", "==", "Seguro básico")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log("Que es esto: " + doc.data())
            addSeguro(doc.data())
            //console.log(doc.id, " => ", doc.data());
        });
    })
      .catch((error) => console.log(error));
      break;
    case '2':
      console.log("Entro en caso 2")
      firestore
      .collection("seguros")
      .where("Tipo", "==", "Todo a todo riesgo con franquicia")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          addSeguro(doc.data());
        });
      })
      .catch((error) => console.log(error));
      break;
    case '3':
      console.log("Entro en caso 3")
      firestore
      .collection("seguros")
      .where("Tipo", "==", "Todo a todo riesgo sin franquicia")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          addSeguro(doc.data());
          
        });
      })
      .catch((error) => console.log(error));
      break;}*/
  
  
  return (
    <Fragment>
      <html lang="en">
        <body>
          <h1>BUSCAR</h1>
          <br></br>
          <h3>Por tipo: </h3>
          {seguros.map(s => {
            if(s.Tipo == tip){
              return (<div key={s.id}>
                <h1>Tipo de seguro: {s.Tipo}</h1>
                <p>Descripción: {s.Descripcion}</p>
                <p>Coberturas : {s.Coberturas}</p>
                <p>Precio: {s.Precio}</p>
                <Link to={`/contratarSeguro/${s.id}`}>Contratar seguro</Link>
                {/* <button onClick={ () => contratar(s.id)}>Contratar</button> */}
                </div>
              )}
            })
          }

          <label id="seguros"></label>
          <button onClick={contratar}> Contratar</button>
        </body>
      </html>
    </Fragment>
  );
};
export default Buscador;