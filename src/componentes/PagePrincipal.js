import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';

const PagePrincipal = () => ( 
    <Fragment>
        <h1>Página Principal</h1>  
        <Link to={'/signIn'} >Crear cuenta</Link>
    </Fragment>
    
);
export default PagePrincipal;