
// const Contenedor = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
// `;
import { useState, Fragment } from 'react';
import React from 'react'
import { auth } from './firebaseConfig';
import SignUp from './componentes/SignUp';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PagePrincipal from './componentes/PagePrincipal';
import PriceEstimate from './componentes/PriceEstimate';
import ContratarSeguro from './componentes/ContratarSeguro';
import DeleteAccount from './componentes/DeleteAccount';
//import styled from "@emotion/styled";
import LogIn from './componentes/LogIn';
import SesionPage from "./componentes/SesionPage";
import Claims from './componentes/Claims';
import NewClaim from './componentes/NewClaim';
import Incidences from './componentes/Incidences';
import NewIncidence from './componentes/NewIncidence';
import UpdateProfile from './componentes/UpdateProfile';
import Extras from './componentes/Extras';

function App() {
  /**
   * Explica el hook de useState, la inicializacion y que se pueden usar varios estados en el componente,
   * que es mejor que cada componente controle susestado y no un estado global.
   *
   * Explica tambien la destructuracion de objetos en Javascript o Typescript (obtener datos desde un array,
   * porque al final el useState nos devuelve un array de 2 posiciones, primero con el estado y el metodo
   * para actualizarse)
   */
  const [user, setUser] = useState([]);
  const [isSignIn, setSignIn] = useState(false);

  function login() {
    /**
     * Explica aqui que importas el auth y lo configuras en firebaseConfig.js, y el then es por lo de las promesas
     * que es una funciona asincrona. Y cuando se cumple satisfactoriamente actualizas el estado. De esta
     * forma se actualiza la vista.
     */
    auth
      .signInWithEmailAndPassword("pepe@gmail.com", "elpepe")
      .then((operation) => {
        setSignIn(true);
        setUser(operation.user);
        console.log(operation.user);
      });
  }

  function logout() {
    auth.signOut();
    setUser([]);
    setSignIn(false);
  }

  /**
   * Aqui que solo pueden devolver un componente, si no quieren usar un div, pues React.Fragment.
   * El onClick y que para hacer un if tiene que ser con el ternario.
   */
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={PagePrincipal}/>
          <Route exact path="/signUp" component={SignUp}/>
          <Route exact path="/logIn" component={LogIn}/>
          <Route exact path="/sesion" component={SesionPage}/>
          <Route exact path="/claims" component={Claims}/>
          <Route exact path="/newClaim" component={NewClaim}/>
          <Route exact path="/priceEstimate" component={PriceEstimate}/>
          <Route exact path="/contratarSeguro" component={ContratarSeguro}/>
          <Route exact path="/deleteAccount" component={DeleteAccount}/>
          <Route exact path="/logIn" component={LogIn} />
          <Route exact path="/actualizarPerfil" component={UpdateProfile}/>
          <Route exact path="/Incidences" component={Incidences}/>
          <Route exact path="/NewIncidence" component={NewIncidence}/>
          <Route exact path="/extras" component={Extras}/>
        
          {/* <Route exact path="/login" component={Login}/> */}
        </Switch>
      </Router>
      // {/* <SignIn/> */}
      // {/* { isSignIn ? 
      // <React.Fragment>
      //   <button onClick={logout}>Cerrar sesión</button> 
      //   <h2>Bienvenido a la aplicacion: {user.email}</h2>
      // </React.Fragment>
      // : 
      // <Fragment>
      //     <button onClick={login}>Iniciar sesión</button>
      //     <Link to={'/signIn'}>Crear cuenta</Link>
      // </Fragment>
        
      // }       */}

  );
}

export default App;
