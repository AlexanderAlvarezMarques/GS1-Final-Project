import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PagePrincipal = () => ( 
    <Fragment>
        <h1>Página Principal</h1>  
        <Link to={'/signUp'} > Crear cuenta  </Link>
        <Link to={'/priceEstimate'}> Buscar estimacion de precio  </Link>
        <Link to={'/deleteAccount'}  >darse de baja  </Link>
        <Link to={'/LogIn'} >Iniciar sesión</Link>
    </Fragment>
    
);
export default PagePrincipal;