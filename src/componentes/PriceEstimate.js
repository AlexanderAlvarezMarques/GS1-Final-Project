import React, { useState } from 'react';
import { obtenerDiferenciaYear } from '../Helper'
import { calcularMarca } from '../Helper'
import { obtenerPlan } from '../Helper'
import { porAntiguedad } from '../Helper'
import Spinner from './Spinner'
import Resultado from './Resultado'
import { useParams } from 'react-router-dom';
import PayTarjet from './PayTarjet';
import Paypal from './Paypal';
import { Link } from "react-router-dom";


const PriceEstimate = () => {

    const extrasDisponibles = [
        {
            name: "Robo del vehículo",
            precioExtra: 500
        },
        {
            name: "Rotura de parabrisas y lunas",
            precioExtra: 150
        },
        {
            name: "Incendio del vehículo",
            precioExtra: 200

        },
        {
            name: "Daños por atropello de animales cinegéticos (Animales de caza mayor)",
            precioExtra: 75
        }
    ];

    const { path } = useParams();
    console.log('path es', path);

    const [resumen, guardarResumen] = useState({
        cotizacion: 0,
        datos: {
            marca: '',
            modelo: '',
            year: 0,
            antiguedadCarnet: 0,
            plan: '',
            extra: []
        }
    });

    const [cargando, guardarCargando] = useState(false);

    const { cotizacion, datos } = resumen;



    //state para los campos del formulario
    const [data, setData] = useState({
        marca: 'Ford',
        modelo: 'Focus',
        year: 1997,
        antiguedadCarnet: 5,
        plan: 'basico',
        extra: extrasDisponibles
    });


    const { marca, modelo, year, antiguedadCarnet, plan } = data;


    // estado para validaciones
    const [, actualizarError] = useState(false);







    const [prueba, setPrueba] = useState(false);

    // actualizar campos del formulario
    const actualizarState = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        setPrueba(true)
    }

    const getPriceEstimate = e => {
        e.preventDefault()
        console.log("he apretado el boton");

        if (marca.trim() === '' || modelo.trim() === '' || year === null || antiguedadCarnet === null || plan.trim() === '') {
            actualizarError(true);
            return;
        }
        actualizarError(false);

        let resultado = 2000;
        const diferencia = obtenerDiferenciaYear(year);
        const antiguedad = porAntiguedad(antiguedadCarnet);
        resultado -= ((diferencia * 3) * resultado + antiguedad) / 100;

        resultado = calcularMarca(marca) * resultado;


        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
        console.log(resultado)
        guardarCargando(true);

        setTimeout(() => {

            guardarCargando(false);

            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
        }, 3000);

    }

    return (
        <>

            <form onSubmit={getPriceEstimate} class="estimate_price">

                <h1 class="py-4">Estimación de precio para tu coche</h1>

                <div class="display_inline">
                    <div class="form-group branch">
                        <label>Marca</label>
                        <select
                            name="marca"
                            value={marca}
                            onChange={actualizarState}
                        >
                            <option value="">-- Seleccione --</option>
                            <option value="Mercedes">Mercedes</option>
                            <option value="Ford">Ford</option>
                            <option value="Audi">Audi</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Hyundai">Hyundai</option>
                        </select>
                    </div>

                    <div class="form-group model">
                        <label>Modelo</label>
                        <select
                            name="modelo"
                            value={modelo}
                            onChange={actualizarState}
                        >
                            <option value="">-- Seleccione --</option>
                            <option value="Berlina">Berlina</option>
                            <option value="Focus">Focus</option>
                            <option value="A3">A3</option>
                            <option value="Yaris">Yaris</option>
                            <option value="Tucson">Tucson</option>
                        </select>
                    </div>

                </div>

                <div class="display_inline">
                    <div class="form-group plate_date">
                        <label>Año matriculación</label>
                        <input
                            type="number"
                            name="year"
                            value={year}
                            onChange={actualizarState}
                        />
                    </div>

                    <div class="form-group license_date">
                        <label>Antiguedad de carnet</label>
                        <input
                            type="number"
                            name="antiguedadCarnet"
                            value={antiguedadCarnet}
                            onChange={actualizarState}
                        />
                    </div>
                </div>


                <div class="form-group">
                    <label>Plan</label>

                    <div class="plan">
                        <input
                            type="radio"
                            name="plan"
                            value="basico"
                            checked={plan === "basico"}
                            onChange={actualizarState}
                        />
                        Básico

                        <input
                            type="radio"
                            name="plan"
                            value="completo-sin-franquicia"
                            checked={plan === "completo-sin-franquicia"}
                            onChange={actualizarState}
                            class="ml-2"
                        />
                        Completo sin franquicia

                        <input
                            type="radio"
                            name="plan"
                            value="completo-con-franquicia"
                            checked={plan === "completo-con-franquicia"}
                            onChange={actualizarState}
                            class="ml-2"
                        />
                        Completo con franquicia
                    </div>
                </div>


                {/*
                <div>
                    <label>Extras para añadir a tu seguro: </label>
                    {formData.map((test, index) => (
                        <div key={index}>
                            <label>{test.name}</label>
                            <input
                                type="checkbox"
                                name={test.name}
                                checked={isChecked[test.name]}
                                onChange={handleSingleCheck}
                            />
                        </div>
                    ))}
                </div>
                */}

                <button type="submit" class="btn btn-primary submit">Aceptar</button>

                {cargando ? <Spinner /> : null}

                <div class="my-2">
                {!cargando ? <> <Resultado cotizacion={cotizacion} /> </> : null}

                {cotizacion !== 0 ?
                    <>
                        <button onClick={actualizarState} class="btn btn-primary mb-2">Contratar seguro</button>
                        {prueba === true ?
                            <div>
                                <PayTarjet resumen={resumen} />
                                <Paypal resumen={resumen} />
                            </div> : null}
                    </> : null}
                </div>
            </form>

        </>
    );
}
export default PriceEstimate;