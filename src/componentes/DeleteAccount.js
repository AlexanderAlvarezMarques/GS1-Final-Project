import React from 'react';
import { auth, firestore } from '../firebaseConfig'
import { Link, } from "react-router-dom";


const DeleteAccount = () => {

    console.log(auth.currentUser.uid)

    const borrar = () => {

        var user = auth.currentUser

        console.log('user: ', user);


        user.delete()
            .then(() => {
                console.log('User deleted!');
                firestore.collection("usuariosRgistrados").doc(user.uid).delete().then(function () {
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            })
            .catch((e) => {
                console.error('Failed to delete user: ', e);

            })
    }


    return (
        <>
            <div class="claims py-2">
                <h1>Eliminar cuenta</h1>
                <p class="text-justify">¿Desea darse de baja? Al darse de baja sus datos se perderían de la base de datos y su vehículo ya no estaría asegurado a partir del comienzo del mes próximo</p>
                <button onClick={borrar} class="btn btn-danger">darse de baja</button>
                <a href={"/sesion"}><span class="btn btn-secondary ml-2">Cancelar</span></a>
            </div>
        </>
    )
};

export default DeleteAccount;