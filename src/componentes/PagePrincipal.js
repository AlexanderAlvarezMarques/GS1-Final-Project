import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PagePrincipal = () => ( 
    <Fragment>
        <h1>Página Principal</h1> 
        <Link to={'/logIn'}>Iniciar sesión</Link> 
        <br></br>
        <Link to={'/signUp'} >Crear cuenta</Link>
        <br></br>
        <Link to={'/Incidence'} >Incidencia</Link>
    </Fragment>
    
);
export default PagePrincipal;