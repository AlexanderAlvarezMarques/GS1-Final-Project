
import React from 'react';
import {auth} from '../firebaseConfig'
import {firestore} from '../firebaseConfig'
import useAutentication from './useAutentication';

const DeleteAccount = () => {
    
    console.log(auth.currentUser.uid)
    
    const borrar = e => {
        var uidUser = auth.currentUser.uid
        
        //para poder borrar una cuenta debe estar en esa cuenta 
        if( uidUser != null){
            auth.deleteUser(uidUser).then(() => {
                console.log('Successfully deleted user');
            })
            .catch((error) => {
                console.log('Error deleting user:', error);
            });
        }else{
            console.log("no hay usuario registrado");
        }
    }


    return( 
        <>
            <h1>Darse de baja en la cuenta</h1>
            <h4>¿Desea darse de baja? Al darse de baja sus datos se perderían de la base de datos y su vehículo ya no estaría asegurado a partir del comienzo del mes próximo</h4>
            <button onClick={borrar}>darse de baja</button>
        </>
    )};

export default DeleteAccount ;