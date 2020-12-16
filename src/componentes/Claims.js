import React, { Fragment } from "react";
import { Link, useHistory} from "react-router-dom";

const Claims = () => {
  let history = useHistory();
  const misReclamaciones = (e) => {
    history.push("/newClaim");
  };
  return (
    <Fragment>
      <h1>Mis reclamaciones</h1>
      <label> AQUI IRIAN LAS RECLAMACIONES</label>
      <br></br>
      <button onClick={misReclamaciones}> Nueva reclamación</button>
      <br></br>
      <Link to={"/logIn"}>Volver</Link>
    </Fragment>
  );
};
export default Claims;
