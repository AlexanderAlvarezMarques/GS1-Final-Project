import React, { Fragment, useState } from 'react';
import { Router} from 'react-router-dom';
import {auth, firestore} from '../firebaseConfig';

const SignUp = () => {

    const [userSignUp, signUp] = useState({
        nombre : 'juanma',
        apellido : 'perez',
        dni : '12345678E',
        correo : 'juanma@gmail.com',
        contraseña : '123456',
        fechaCarnet : '10/02/2019',
        nacimiento : '5/02/1997',
        marca : 'toyota',
        modelo : 'yaris',
        matricula : '1234FTG'
        // nombreIncidencia : '',
        // descripcionIncidencia : '',
        // tipoIncidencia : '',
        // nombreReclamacion : '',
        // descripcionReclamacion : '',
        // tipoReclamacion : ''

    })
    

    const [error, actualizarError] = useState(false);

    const actualizarState = e => {
        signUp({
            ...userSignUp,
            [e.target.name] : e.target.value
        })
    }

    const {nombre,apellido,dni,correo,fechaCarnet,contraseña,nacimiento,marca,modelo,matricula} = userSignUp;

    const datosPerfil = {
        nombre,
        apellido,
        dni,
        correo,
        fechaCarnet,
        nacimiento,
        contraseña
    }

    const vehiculo = {
        marca,
        modelo,
        matricula
    }

    // const incidencias = [{
    //     nombreIncidencia,
    //     descripcionIncidencia,
    //     tipoIncidencia
    // }]

    // const reclamaciones = [{
    //     nombreReclamacion,
    //     descripcionReclamacion,
    //     tipoReclamacion
    // }]

    const registrar = e => {

        e.preventDefault()
        console.log("pulse el botón")
        //validar que los campos no esten vacios
        if ( nombre.trim() === '' || apellido.trim() === '' || dni.trim() === '' || correo.trim() === '' || contraseña.trim() === '' || fechaCarnet.trim() === '' || modelo.trim() === '' || nacimiento.trim() === '' ){
            actualizarError(true);
            return;
        }
        actualizarError(false);
        

        auth.createUserWithEmailAndPassword(correo, contraseña)
        .then((user) => {
            
            var db = firestore;
            var userUID = auth.currentUser.uid;
            db.collection('bd').doc(userUID).set(datosPerfil)
                .then(() => {
                    console.log("Todo correcto")
                }).catch((e) => {
                console.log("hubo un error: ", e)
            })
            //db.collection('bd').add(vehiculo);
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    
       
    }
    
    
return( 
    <Fragment>
        <h2>Sign In Form</h2>
        { error ? <p>Todos los campos deben estar rellenos</p> : null }
        <form
            onSubmit={registrar}
        >
            <label>Nombre: </label>
            <input
                type="text"
                name="nombre"
                onChange={actualizarState}
            />
            <label>Apellido: </label>
            <input
                type="text"
                name="apellido"
                onChange={actualizarState}
            />
            <label>DNI: </label>
            <input
                type="text"
                name="dni"
                onChange={actualizarState}
            />
            <label>Correo: </label>
            <input
                type="text"
                name="correo"
                onChange={actualizarState}
            />
            <label>contraseña: </label>
            <input
                type="text"
                name="contraseña"
                onChange={actualizarState}
            />
            <label>Nacimiento: </label>
            <input
                type="date"
                name="nacimiento"
                onChange={actualizarState}
            />
            <label>Fecha Carnet: </label>
            <input
                type="date"
                name="fechaCarnet"
                onChange={actualizarState}
            />
            <label>Marca: </label>
            <input
                type="text"
                name="marca"
                onChange={actualizarState}
            />

            <label>Submodel: </label>
            <input
                type="text"
                name="modelo"
                onChange={actualizarState}
            />
            <label>Matricula: </label>
            <input
                type="text"
                name="matricula"
                onChange={actualizarState}
            />
            <button
                type="submit"
            >Registrarse</button>
        </form>
    </Fragment>
);
}
export default SignUp ;