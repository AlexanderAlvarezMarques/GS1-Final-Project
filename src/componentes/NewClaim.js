import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const NewClaim = () => {
  const [datos, guardarDatos] = useState({
    asunto: "",
    descripcion: "",
  });
  const [error, guardarError] = useState(false);

  // extrarer valores
  const { asunto, descripcion } = datos;

  const obtenerDatos = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const enviar = (e) => {
    e.preventDefault();

    // eslint-disable-next-line eqeqeq
    if (asunto.trim() == "" || descripcion.trim() == "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    window.location.href = "/claims";
  };

  return (
    <Fragment>
      <h1>Nueva reclamación</h1>
      <div>
        <label>Asunto: </label>
        <input
          type="text"
          name="asunto"
          value={asunto}
          onChange={obtenerDatos}
        />
        <br></br>
        <label>Descripción: </label>
        <br></br>
        <textarea
          name="descripcion"
          rows="4"
          cols="50"
          value={descripcion}
          onChange={obtenerDatos}
        />
        <br></br>
      </div>
      <div>
      {error ? <label>Debes rellenar todos los campos<br></br></label> : null}
        <Link to={"/claims"}>Cancelar</Link>
        <button onClick={enviar} type="submit">
          Enviar
        </button>
      </div>
    </Fragment>
  );
};

export default NewClaim;
