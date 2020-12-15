import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Router, useHistory} from 'react-router-dom';

const Incidences = () => {

  let history = useHistory();

  const misIncidences = (e) => {
    history.push("/NewIncidence"); 
  };
  
  return (
    <Fragment>
      <h1>Mis incidencias</h1>
      <label> AQUI IRIAN LAS INCIDENCIAS</label>
      <br></br>
      <button onClick={misIncidences}> Nueva incidencia</button>
      <br></br>
      <Link to={"/sesion"}>Volver</Link>
    </Fragment>
  );
};
export default Incidences;