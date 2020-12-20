import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";

const Buscador = () => {
  let history = useHistory();
  const [seguros, setSeguros] = useState([]);

  const [seleccionData, setData] = useState({
    seleccion: "Todos los planes",
    precioMin:0,
    precioMax:6000,
  });
  const { seleccion,precioMin,precioMax } = seleccionData;


  const actualizarState = (e) => {
    setData({
      ...seleccionData,
      [e.target.name]: e.target.value,
    });
    //changeSearch();
  };

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

  //metodo al pulsar el boton para contratar
  const contratar = (id) => {
    if (window.confirm("Estas seguro de que quieres contratar este seguro?")) {
      console.log("pulse el boton", id);
      history.push();
    }
  };
  //se queda escuchando cada cambio y se va actualizando
  useEffect(() => {
    seguroDB();
  }, []);

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


  return (
    <Fragment>
      <html lang="en">
        <body>
          <h1>BUSCAR</h1>
          <br></br>
          <Link to={"/"}>Volver</Link>
          <br></br>
          <h3>Tipo de plan: </h3>

          <div>
            <input
              type="radio"
              name="seleccion"
              value="Todos los planes"
              checked={seleccion === "Todos los planes"}
              onChange={actualizarState}
            />
            Todos los planes
            <input
              type="radio"
              name="seleccion"
              value="Básico"
              checked={seleccion === "Básico"}
              onChange={actualizarState}
            />
            Básico
            <input
              type="radio"
              name="seleccion"
              value="Todo riesgo con franquicia"
              checked={seleccion === "Todo riesgo con franquicia"}
              onChange={actualizarState}
            />
            Todo riesgo con franquicia
            <input
              type="radio"
              name="seleccion"
              value="Todo riesgo sin franquicia"
              checked={seleccion === "Todo riesgo sin franquicia"}
              onChange={actualizarState}
            />
            Todo riesgo sin franquicia
          </div>
          <h3>Rango de precios: </h3>
          <div>
            <label>Min:</label>
            <input
              type="number"
              name="precioMin"
              value={precioMin}
              onChange={actualizarState}
            />€
            <label> Max:</label>
            <input
              type="number"
              name="precioMax"
              value={precioMax}
              onChange={actualizarState}
            />€
          </div>

          {seguros.map((s) => {
            if (seleccion != "Todos los planes") {
              if (s.Tipo === seleccion && parseInt(s.Precio) >= parseInt(precioMin) && parseInt(s.Precio) <= parseInt(precioMax)) {
                return (
                  <div key={s.id}>
                    <h1>Tipo de seguro: {s.Tipo}</h1>
                    <p>Descripción: {s.Descripcion}</p>
                    <p>Coberturas : {s.Coberturas}</p>
                    <p>Precio: {s.Precio}</p>
                    <Link to={`/contratarSeguro/${s.id}`}>
                      Contratar seguro
                    </Link>
                    {/* <button onClick={ () => contratar(s.id)}>Contratar</button> */}
                  </div>
                );
              }
            } else {
              if (parseInt(s.Precio) >= parseInt(precioMin) && parseInt(s.Precio) <= parseInt(precioMax)) {
                  return (
                  <div key={s.id}>
                    <h1>Tipo de seguro: {s.Tipo}</h1>
                    <p>Descripción: {s.Descripcion}</p>
                    <p>Coberturas : {s.Coberturas}</p>
                    <p>Precio: {s.Precio}</p>
                    <Link to={`/contratarSeguro/${s.id}`}>Contratar seguro</Link>
                    {/* <button onClick={ () => contratar(s.id)}>Contratar</button> */}
                  </div>
                  )};
            }
          })}
        </body>
      </html>
    </Fragment>
  );
};
export default Buscador;
