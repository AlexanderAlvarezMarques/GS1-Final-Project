import React,{useState} from 'react';
import { auth, firestore } from '../firebaseConfig';

const UpdateProfile = () => {


     // estado que tiene el usuario 
     const [data, setDatas] = useState({
        nombre : 'juan manuel ',
        apellido : 'perez toro',
        telefono: '647177666',
        correo : 'juanmita@gmail.com',
        contraseña : '1234567',
    })

    const{nombre,apellido,telefono,contraseña,correo}=data

    // actualizar campos del formulario
    const actualizarState = e => {
        setDatas({
            ...data,
            [e.target.name] : e.target.value
        })
    }


    const actualizarPerfil = e => {
        //actualizo los campos que me dan la gana por lo tanto no hay if
        e.preventDefault()
        
        if(auth.currentUser.uid != null){
            firestore.collection('usuariosRgistrados').doc(auth.currentUser.uid ).update({
                nombre: nombre,
                apellido : apellido,
                telefono: telefono,
                correo: correo,
                contraseña: contraseña
            }).then(() => {
              console.info('todo actualizado');
              
            }).catch((e) => {
              console.error('Mal', e);
              
            })
        }else{
            console.log('no hay usuarios');
            
        }

    }


    return( 
        <>
        <h1>Actualizar perfil</h1>
        <form
            onSubmit={actualizarPerfil}
        >
            <label>Nombre</label>
            <input
                 type="text"
                 name="nombre"
                 onChange={actualizarState}
            ></input>

            <label>Apellidos</label>
            <input
                 type="text"
                 name="apellido"
                 onChange={actualizarState}
            ></input>

            <label>Telefono</label>
            <input
                 type="text"
                 name="telefono"
                 onChange={actualizarState}
            ></input>

            <label>Correo electronico</label>
            <input
                 type="text"
                 name="correo"
                 onChange={actualizarState}
            ></input>

            <label>Contraseña</label>
            <input
                 type="text"
                 name="contraseña"
                 onChange={actualizarState}
            ></input>

            <button type="submit">Actualizar</button>
        </form>
        </>    
    )};
export default UpdateProfile ; 