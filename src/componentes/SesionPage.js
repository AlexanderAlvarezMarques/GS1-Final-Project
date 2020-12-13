
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const SesionPage = () => ( 
    <Fragment>
        <h1>Sesion iniciada por tu "xxxx"</h1> 
        <Link to={"/Incidences"}>Mis Incidencias</Link>
    </Fragment>
    
);
export default SesionPage;
