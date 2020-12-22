import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from '../firebaseConfig'
import { useHistory } from 'react-router-dom';

const LogIn = () => {

    let history = useHistory();

    const [datos, guardarDatos] = useState({
        userName: "",
        passwd: "",
    });
    const [error, guardarError] = useState(false);

    // extrarer valores
    const { userName, passwd } = datos;

    const obtenerDatos = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    };



    const iniciarSesion = e => {
        e.preventDefault();
        console.log("he pulsado el boton");

        if (userName.trim() === "" || passwd.trim() === "") {
            guardarError(true);
            return;
        }
        guardarError(false);

        auth.signInWithEmailAndPassword(userName, passwd)
            .then((user) => {
                // Signed in
                // ...
                console.log("se ha iniciado sesion")
                console.log(user)

                history.push("/sesion");
            })
            .catch((error) => {

            });

    };

    //    HTML
    return (
        <Fragment>
        
            <form class="login" onSubmit={iniciarSesion}>

                {error ? <p>Tiene que iniciar sesion con un usuario registrado </p> : null}

                <div class="form-group login-image">
                    <img src="content/images/loginImage.png" alt="Login image"/>
                </div>

                <div class="form-group">
                    <label>Email:</label>
                    <input type="text" name="userName" value={userName} onChange={obtenerDatos} required/>
                </div>
            
                <div class="form-group">
                    <label>password</label>
                    <input type="password" name="passwd" value={passwd} onChange={obtenerDatos} required/>
                </div>
                
                <div class="form-group">
                    <input type="submit" value="LogIn" class="btn btn-primary submit"/>
                </div>
            </form>
        </Fragment>
    );
};


export default LogIn;