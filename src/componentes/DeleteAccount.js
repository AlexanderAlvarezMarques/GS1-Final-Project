import React from 'react';
import {auth,firestore} from '../firebaseConfig'

const DeleteAccount = () => {
    
    console.log(auth.currentUser.uid)
    
    const borrar = () => {

        var user = auth.currentUser

        console.log('user: ', user);
        

        user.delete()
            .then(() => {
                console.log('User deleted!');
                firestore.collection("usuariosRgistrados").doc(user.uid).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            })
            .catch((e) => {
                console.error('Failed to delete user: ', e);
                
            })
    }


    return( 
        <>
            <h1>Darse de baja en la cuenta</h1>
            <h4>¿Desea darse de baja? Al darse de baja sus datos se perderían de la base de datos y su vehículo ya no estaría asegurado a partir del comienzo del mes próximo</h4>
            <button onClick={borrar}>darse de baja</button>
        </>
    )};

export default DeleteAccount ;