import React, { Fragment, useState } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = () => {

    let history= useHistory();
    // estado que tiene el usuario 
    const [data, setDatas] = useState({
        nombre: 'juan manuel ',
        apellido: 'perez toro',
        telefono: '647177666',
        correo: 'juanmita@gmail.com',
        contraseña: '1234567',
    })

    const { nombre, apellido, telefono, contraseña, correo } = data

    // actualizar campos del formulario
    const actualizarState = e => {
        setDatas({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    const actualizarPerfil = e => {
        //actualizo los campos que me dan la gana por lo tanto no hay if
        e.preventDefault()

        if (auth.currentUser.uid != null) {
            firestore.collection('usuariosRgistrados').doc(auth.currentUser.uid).update({
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                correo: correo,
                contraseña: contraseña
                
            }).then(() => {
                console.info('todo actualizado');
                alert("Ha actualizado su perfil correctamente!");
                history.push("/sesion")

            }).catch((e) => {
                console.error('Mal', e);

            })
        } else {
            console.log('no hay usuarios');

        }

    }


    return (
        <Fragment>
            <>
                <form
                    onSubmit={actualizarPerfil}
                    class="register"
                >

                    <div class="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            onChange={actualizarState}
                        ></input>
                    </div>

                    <div class="form-group">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            name="apellido"
                            onChange={actualizarState}
                        ></input>
                    </div>

                    <div class="form-group">
                        <label>Telefono</label>
                        <input
                            type="text"
                            name="telefono"
                            onChange={actualizarState}
                        ></input>
                    </div>

                    <div class="form-group">
                        <label>Correo electronico</label>
                        <input
                            type="text"
                            name="correo"
                            onChange={actualizarState}
                        ></input>
                    </div>

                    <div class="form-group">
                        <label>Contraseña</label>
                        <input
                            type="text"
                            name="contraseña"
                            onChange={actualizarState}
                        ></input>
                    </div>

                    <div class="">
                        <button type="submit" class="btn btn-primary">Actualizar</button>
                        <Link to={"/sesion"}><span class="btn btn-danger ml-2">Cancelar</span></Link>
                    </div>
                </form>
            </>
        </Fragment>
    )
};
export default UpdateProfile; 