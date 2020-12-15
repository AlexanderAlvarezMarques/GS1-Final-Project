import React, { Fragment, useState } from 'react';
import { Router, useHistory} from 'react-router-dom';
import {auth, firestore} from '../firebaseConfig';

const db = firestore;

const SignUp = () => {

    // para rediccionar
    let history = useHistory();

    // estado que tiene el usuario 
    const [user, setUser] = useState({
        nombre : 'juanma',
        apellido : 'perez',
        dni : '12345678E',
        correo : 'juanma@gmail.com',
        contraseña : '123456',
        fechaCarnet : '10/02/2019',
        nacimiento : '5/02/1997',
        vehiculos: []
    })

    //estado para el vehiculo
    const [car, setCar] = useState({
        marca: 'Toyota',
        modelo: 'Yaris',
        kilometros: 28000,
        tipo: 'Turismo',
        combustible: 'Gasolina',
        matricula: '3844LLL'
    })


    //array de marcas
    const brands = ["Audi", "Ford", "Kia", "Toyota"]


    //mapa de marca con su modelo
    const models = [
        {marca: "Audi", modelo: "A3"},
        {marca: "Audi", modelo: "A4"},
        {marca: "Ford", modelo: "Focus"},
        {marca: "Ford", modelo: "Puma"},
        {marca: "Kia", modelo: "Rio"},
        {marca: "Toyota", modelo: "Yaris"}
    ]

    
    var modelsFiltered = []
    const [state,updateState] = useState(modelsFiltered)
    
    // estado para validaciones
    const [error, actualizarError] = useState(false);

    // actualizar campos del formulario
    const actualizarState = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
        setCar({
            ...car,
            [e.target.name] : e.target.value
        })
    }

    //objeto que contiene todas las variables que necesitamos
    const {nombre,apellido,dni,correo,fechaCarnet,contraseña,nacimiento} = user;
    const {marca,modelo,kilometros,tipo,combustible,matricula} = car;


    const checkEmptyValues = () => {
        return nombre.trim() === '' || 
                apellido.trim() === '' || 
                dni.trim() === '' || 
                correo.trim() === '' || 
                contraseña.trim() === '' || 
                fechaCarnet.trim() === '' || 
                modelo.trim() === '' || 
                nacimiento.trim() === '' || 
                marca.trim() === '' || 
                modelo.trim() === '' || 
                matricula.trim() === '' ||
                tipo.trim() === '' ||
                kilometros === 0 ||
                combustible.trim() === ''
    }

    const registrar = e => {

        e.preventDefault()

        //validar que los campos no esten vacios
        if (checkEmptyValues()){
            actualizarError(true);
            return;
        }
        actualizarError(false);
        
        //crear usuario nuevo y añadir a la base de datos
        auth.createUserWithEmailAndPassword(correo, contraseña)
        .then((u) => {
            
            var db = firestore;


            user.vehiculos = [car];
            
            db.collection('usuariosRgistrados').doc(auth.currentUser.uid).set(user)
                .then(() => {
                    console.log("Todo correcto")
                    
                    history.push("/");
                }).catch((e) => {
                console.log("hubo un error: ", e)
            })
            
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    
    //HTML 
return( 
    <>
        <h2>Sign Up Form</h2>
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
    </>
);
}
export default SignUp ;