import React, { Fragment, useState } from 'react';

const SignUp = () => {

    const [userSignUp, signUp] = useState({
        name:'',
        surname:'',
        dni:'',
        email:'',
        password:'',
        license:'',
        model:''
    })

    const [error, actualizarError] = useState(false);

    const actualizarState = e => {
            signUp({
                ...userSignUp,
                [e.target.name] : e.target.value
            })
    }

    const registrar = e => {
        e.preventDefault()
        console.log("pulse el botón")
        if ( name.trim() === '' || surname.trim() === '' || dni.trim() === '' || email.trim() === '' || password.trim() === '' || license.trim() === '' || model.trim() === ''){
            actualizarError(true);
            return;
        }
    }

    const {name,surname,dni,email,password,license,model} = userSignUp;
return( 
    <Fragment>
        <h2>Sign In Form</h2>
        { error ? <p>Todos los campos deben estar rellenos</p> : null }
        <form
            onSubmit={registrar}
        >
            <label>Name: </label>
            <input
                type="text"
                name="name"
                onChange={actualizarState}
            />
            <label>Surname: </label>
            <input
                type="text"
                name="surname"
                onChange={actualizarState}
            />
            <label>DNI: </label>
            <input
                type="text"
                name="dni"
                onChange={actualizarState}
            />
            <label>Email: </label>
            <input
                type="text"
                name="email"
                onChange={actualizarState}
            />
            <label>Password: </label>
            <input
                type="text"
                name="password"
                onChange={actualizarState}
            />
            <label>License: </label>
            <input
                type="text"
                name="license"
                onChange={actualizarState}
            />
            <label>Model: </label>
            <input
                type="text"
                name="model"
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