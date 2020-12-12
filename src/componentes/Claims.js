import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PagePrincipal = () => ( 
    <Fragment>
        <h1>Reclamaciones</h1> 
        <Link to={'/logIn'}>Iniciar sesión</Link> 
        <br></br>
        <Link to={'/signUp'} >Crear cuenta</Link>
    </Fragment>
    
);
export default PagePrincipal;