import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PagePrincipal = () => ( 
    <Fragment>
        <h1>Página Principal</h1>  
        <Link to={'/signUp'} > Crear cuenta     </Link>
        <br></br>
        <Link to={'/priceEstimate'}> Buscar estimacion de precio  </Link>
        <br></br>
        <Link to={'/deleteAccount'}  >darse de baja     </Link>
        <br></br>
        <Link to={'/LogIn'} >Iniciar sesión     </Link>
        <br></br>
        <Link to={'/sesion'} >ir a sesion     </Link>
        <br></br>
        <Link to={'/NewIncidence'} >nueva incidencia    </Link>
        <br></br>
        <Link to={'/Incidences'} >incidencias    </Link>
        <br></br>
        <Link to={'/actualizarPerfil'} >actualizar perfil    </Link>
        
    </Fragment>
    
);
export default PagePrincipal;