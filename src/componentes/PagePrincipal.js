import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PagePrincipal = () => ( 
    <Fragment>
        <h1>Página Principal</h1>  
        <Link to={'/signUp'} >Crear cuenta</Link>
    </Fragment>
    
);
export default PagePrincipal;