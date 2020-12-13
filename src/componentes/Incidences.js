import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Incidences = () => {
  
  /*const misIncidences = (e) => {
    window.location.href = "/newIncidence";
  };*/

  return (
    <Fragment>
      <h1>Mis incidencias</h1>
      <label> AQUI IRIAN LAS INCIDENCIAS</label>
      <br></br>
      <button /*onClick={misIncidences}*/><Link to={"/newIncidence"}> Nueva incidencia </Link></button>
      <br></br>
      <Link to={"/"}>Volver</Link>
    </Fragment>
  );
};
export default Incidences;