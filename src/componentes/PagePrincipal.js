import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebaseConfig";

const PagePrincipal = () => {



    //estados
    const [seguros, setSeguros] = useState([]);

    //constante que coje los seguros de firestore y añade los datos con el id en el estado de seguros
    const seguroDB = async () => {
        firestore.collection("seguros").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            })
            //añado los seguros de firestore a mi estado
            setSeguros(
                ...seguros,
                docs
            )
        }
        )
    };


    //se queda escuchando cada cambio y se va actualizando
    useEffect(() => {
        seguroDB()
    }, [])


    return (
        <Fragment>

            <div class="main-offers">

                {/* recorro mi state y devuelve cada seguro */}
                {seguros.map(s => {
                    return (
                        <div class="card">
                            {/* <img class="card-img-top" src="content/images/200x200.png" alt="Card image cap" /> */}
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
export default PagePrincipal;
