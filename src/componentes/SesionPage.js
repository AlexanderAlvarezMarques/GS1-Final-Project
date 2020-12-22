import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import ReactDOM from "react-dom";

const SesionPage = () => {
    //para redireccionar
    let history = useHistory();

    //estados
    const [seguros, setSeguros] = useState([]);


    //constante que coje los seguros de firestore y añade los datos con el id en el estado de seguros
    const seguroDB = async () => {
        firestore.collection("seguros").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            //añado los seguros de firestore a mi estado
            setSeguros(...seguros, docs);
        });
    };

    //se queda escuchando cada cambio y se va actualizando
    useEffect(() => {
        seguroDB();
    }, []);

    auth.onAuthStateChanged((user) => {
        if (user) {
            var userUID = auth.currentUser.uid;
            let nombre = "<h1>Sesión iniciada por ";
            var docRef = firestore.collection("usuariosRgistrados").doc(userUID);
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    nombre += `${doc.data().nombre} </h1>`;
                    ReactDOM.render(
                        <div dangerouslySetInnerHTML={{ __html: nombre }} />,
                        document.getElementById("welcome")
                    );
                } else {
                    nombre += `null </h1>`;
                    ReactDOM.render(
                        <div dangerouslySetInnerHTML={{ __html: nombre }} />,
                        document.getElementById("welcome")
                    );
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
    });

    const cerrarSesion = () => {
        auth.signOut();
        history.push("/");
    }

    return (
        <Fragment>
            <div id="welcome"></div>

            

            <Link to={"/claims"}>Mis reclamaciones</Link>
            <br></br>
            <Link to={"/Incidences"}>Mis Incidencias</Link>
            <br></br>
            <Link to={"/buscador"}>Buscar Seguro</Link>
            <br></br>
            <Link to={"/DeleteAccount"}>Eliminar cuenta</Link>
            <br></br>
            <Link to={"/actualizarPerfil"}>Actualizar perfil</Link>
            <br></br>
            <Link to={"/priceEstimate"}>Estimación de precio</Link>
            <br></br>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
            <br></br>

            <div class="main-offers">
                {/* recorro mi state y devuelve cada seguro */}
                {seguros.map(s => {
                    return (
                        <div class="card">
                            <img class="card-img-top" src="content/images/200x200.png" alt="Card image cap" />
                            <div class="card-body">
                                <h3 class="card-title">Seguro {s.Tipo}</h3>
                                <h5><b>Decripción:</b></h5>
                                <p class="card-text">{s.Descripcion}</p>
                                <h5><b>Coberturas:</b></h5>
                                <p class="card-text">{s.Coberturas}</p>
                                <h5><b>Precio:</b></h5>
                                <p class="card-text">{s.Precio} - $</p>
                                <a href={`/contratarSeguro/${s.id}`} class="btn btn-primary">Contratar seguro</a>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* {error ? <a>Debes rellenar especificar el ID del seguro<br></br></a> : null} */}
        </Fragment>
    );
};
export default SesionPage;
