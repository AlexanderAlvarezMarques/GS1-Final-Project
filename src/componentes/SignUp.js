import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, firestore } from '../firebaseConfig';

const db = firestore;

const SignUp = () => {

    // para rediccionar
    let history = useHistory();

    // estado que tiene el usuario 
    const [user, setUser] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        correo: '',
        contraseña: '',
        telefono: '',
        fechaCarnet: '',
        nacimiento: '',
        vehiculos: [],
        incidencias: [],
        reclamaciones: [],
        pagos: []
    })

    //estado para el vehiculo
    const [car, setCar] = useState({
        marca: '',
        modelo: '',
        kilometros: 0,
        tipo: '',
        combustible: '',
        matricula: '',
    })

    // estado para validaciones
    const [error, actualizarError] = useState(false);

    // actualizar campos del formulario
    const actualizarState = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const actualizarCoche = e => {
        setCar({
            ...car,
            [e.target.name]: e.target.value
        })
    }
    //objeto que contiene todas las variables que necesitamos
    const { nombre, apellido, dni, correo, fechaCarnet, contraseña, nacimiento, telefono } = user;
    const { marca, modelo, kilometros, tipo, combustible, matricula } = car;


    const checkEmptyValues = () => {
        return nombre.trim() === '' ||
            apellido.trim() === '' ||
            dni.trim() === '' ||
            correo.trim() === '' ||
            contraseña.trim() === '' ||
            fechaCarnet.trim() === '' ||
            nacimiento.trim() === '' ||
            marca.trim() === '' ||
            modelo.trim() === '' ||
            matricula.trim() === '' ||
            tipo.trim() === '' ||
            kilometros === 0 ||
            combustible.trim() === '' ||
            telefono.trim() === ''
    }

    const registrar = e => {

        e.preventDefault()

        //validar que los campos no esten vacios
        if (checkEmptyValues()) {
            actualizarError(true);
            return;
        }
        actualizarError(false);

        //crear usuario nuevo y añadir a la base de datos
        auth.createUserWithEmailAndPassword(correo, contraseña)
            .then((u) => {

                user.vehiculos = [car];

                console.log('user: ', user);


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
    return (
        <>
            { error ? <p>Todos los campos deben estar rellenos</p> : null}
            <form
                onSubmit={registrar}
                class="register"
            >
                <div class="form-group">
                    <label>Nombre: </label>
                    <input
                        type="text"
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div class="form-group">
                    <label>Apellido: </label>
                    <input
                        type="text"
                        name="apellido"
                        onChange={actualizarState}
                    /></div>

                <div class="form-group">
                    <label>DNI: </label>
                    <input
                        type="text"
                        name="dni"
                        onChange={actualizarState}
                    />
                </div>

                <div class="form-group">
                    <label>Correo: </label>
                    <input
                        type="text"
                        name="correo"
                        onChange={actualizarState}
                    />
                </div>

                <div class="form-group">
                    <label>contraseña: </label>
                    <input
                        type="password"
                        name="contraseña"
                        onChange={actualizarState}
                    />
                </div>

                <div class="form-group">
                    <label>Nacimiento: </label>
                    <input
                        type="date"
                        name="nacimiento"
                        onChange={actualizarState}
                    />
                </div>

                <div class="form-group">
                    <label>Telefono: </label>
                    <input
                        type="number"
                        name="telefono"
                        onChange={actualizarState}
                    />
                </div>

                <div class="form-group">
                    <label>Fecha Carnet: </label>
                    <input
                        type="date"
                        name="fechaCarnet"
                        onChange={actualizarState}
                    />
                </div>

                <div class="form-group">
                    <label>Marca: </label>
                    <input
                        type="text"
                        name="marca"
                        onChange={actualizarCoche}
                    />
                </div>

                <div class="form-group">
                    <label>Modelo: </label>
                    <input
                        type="text"
                        name="modelo"
                        onChange={actualizarCoche}
                    />
                </div>

                <div class="form-group">
                    <label>Matricula: </label>
                    <input
                        type="text"
                        name="matricula"
                        onChange={actualizarCoche}
                    />
                </div>

                <div class="form-group">
                    <label>Kilometros: </label>
                    <input
                        type="number"
                        name="kilometros"
                        onChange={actualizarCoche}
                    />
                </div>

                <div class="form-group">
                    <label>Combustible: </label>
                    <input
                        type="text"
                        name="combustible"
                        onChange={actualizarCoche}
                    />
                </div>

                <div class="form-group">
                    <label>Tipo: </label>
                    <input
                        type="text"
                        name="tipo"
                        onChange={actualizarCoche}
                    />
                </div>

                <div class="form-group">
                    <button
                        type="submit"
                        class="btn btn-primary submit"
                    >Registrarse</button>
                </div>
            </form>
        </>
    );
}
export default SignUp;