import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebaseConfig";

const Buscador = () => {
    const [seguros, setSeguros] = useState([]);

    const [seleccionData, setData] = useState({
        seleccion: "Todos los planes",
        precioMin: 0,
        precioMax: 6000,
    });
    const { seleccion, precioMin, precioMax } = seleccionData;


    const actualizarState = (e) => {
        setData({
            ...seleccionData,
            [e.target.name]: e.target.value,
        });
    };

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

    return (
        <Fragment>

            <div class="estimate_price pb-2">
                <h1 class="py-4">BUSCARDOR DE SEGUROS</h1>

                <div class="form_group">
                    <p><b>Tipos de seguro:</b></p>
                    <input
                        type="radio"
                        name="seleccion"
                        value="Todos los planes"
                        checked={seleccion === "Todos los planes"}
                        onChange={actualizarState}
                    />
                    Todos los planes
                    <input
                        type="radio"
                        name="seleccion"
                        value="Básico"
                        checked={seleccion === "Básico"}
                        onChange={actualizarState}
                        class="ml-2"
                    />
                    Básico
                    <input
                        type="radio"
                        name="seleccion"
                        value="Todo riesgo con franquicia"
                        checked={seleccion === "Todo riesgo con franquicia"}
                        onChange={actualizarState}
                        class="ml-2"
                    />
                    Todo riesgo con franquicia
                    <input
                        type="radio"
                        name="seleccion"
                        value="Todo riesgo sin franquicia"
                        checked={seleccion === "Todo riesgo sin franquicia"}
                        onChange={actualizarState}
                        class="ml-2"
                    />
                    Todo riesgo sin franquicia
                </div>

                <p class="mt-2 mb-0"><b>Rango de precios:</b></p>
                <div class="display_inline">
                    <div class="form-group plate_date">
                        <label>Min:</label>
                        <input
                            type="number"
                            name="precioMin"
                            value={precioMin}
                            onChange={actualizarState}
                        />
                    </div>

                    <div class="form-group license_date">
                        <label>Max:</label>
                        <input
                            type="number"
                            name="precioMax"
                            value={precioMax}
                            onChange={actualizarState}
                        />
                    </div>
                </div>

                <hr/>

                {seguros.map((s) => {
                    if (seleccion !== "Todos los planes") {
                        if (s.Tipo === seleccion && parseInt(s.Precio) >= parseInt(precioMin) && parseInt(s.Precio) <= parseInt(precioMax)) {
                            return (
                                <div class="card my-2">
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
                            );
                        }
                    } else {
                        if (parseInt(s.Precio) >= parseInt(precioMin) && parseInt(s.Precio) <= parseInt(precioMax)) {
                            return (
                                <div class="card my-2">
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
                        };
                    }
                })}
            </div>
        </Fragment>
    );
};
export default Buscador;
