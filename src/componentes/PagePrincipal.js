import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PagePrincipal = () => ( 
    <Fragment>
<<<<<<< HEAD
        <h1>Página Principal</h1> 
        <Link to={'/LogIn'} >Iniciar sesión</Link>
        <br></br>
        <Link to={'/signUp'} >Crear cuenta</Link>
=======
        <h1>Página Principal</h1>  
        <Link to={'/signUp'} > Crear cuenta  </Link>
        <Link to={'/priceEstimate'}> Buscar estimacion de precio  </Link>
        <Link to={'/deleteAccount'}  >darse de baja  </Link>
>>>>>>> HU7
    </Fragment>
    
);
export default PagePrincipal;