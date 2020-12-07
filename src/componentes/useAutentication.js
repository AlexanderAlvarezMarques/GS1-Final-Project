const { useState, useEffect } = require("react");

import React ,{useState, useEffect} from 'react';
import firebase, { auth } from '../firebaseConfig';


function useAutentication(){
    const [usuariAutenticado, guardarUsuarioAutenticado] = useState(null);
    
    useEffect( () => {
        const unsuscribe = auth.onAuthStateChanged(user =>{
            if( user ){
                guardarUsuarioAutenticado(user);
            }else{
                guardarUsuarioAutenticado(null);
            }
        });
        return unsuscribe();
    },[])
    return usuariAutenticado;
}

export default useAutentication;