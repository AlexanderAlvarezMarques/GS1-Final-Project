import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PagePrincipal = () => ( 
    <Fragment>
        <h1>Página Principal</h1>  
        <Link to={'/signUp'} > Crear cuenta     </Link>
        <Link to={'/priceEstimate'}> Buscar estimacion de precio  </Link>
        <Link to={'/deleteAccount'}  >darse de baja     </Link>
        <Link to={'/LogIn'} >Iniciar sesión     </Link>
        <Link to={'/sesion'} >ir a sesion     </Link>
        <Link to={'/NewIncidence'} >nueva incidencia    </Link>
        <Link to={'/Incidences'} >incidencias    </Link>
        <Link to={'/actualizarPerfil'} >actualizar perfil    </Link>
        <Link to={'/extras'} >añadir extras </Link>
        
    </Fragment>
    
);
export default PagePrincipal;