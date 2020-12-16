import React,{useState,useEffect} from 'react';
import CheckedSelect from 'react-select-checked';

const Extras = () => {
    
    const [datos, setDatos] = useState({
        datos: {
            extra: ''
        }
      });

    const [checked, setChecked] = useState(false)

    const{extra}=datos
    
    // actualizar campos del formulario
    const actualizarState = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
        setChecked(true)
        
    }


    // React.useEffect(() => {
    //     setCheckedInput(checked);
    //     if (onChange) {
    //       onChange(checked);
    //     }
    // }, [checked]);
    
    return( 
    <>
    <h3>Añadir extras a tu seguro</h3>
    
        <div>
                 <input
                    type="checkbox"
                    name="extra"
                    value="robo"
                    onChange={actualizarState}
                />
                Robo del vehículo

                <input
                    type="checkbox"
                    name="extra"
                    value="rotura"
                    onChange={actualizarState}
                /> 
                Rotura de parabrisas y lunas

                <input
                    type="checkbox"
                    name="extra"
                    value="incendio"
                    onChange={actualizarState}
                />
                Incendio del vehículo

                <input
                    type="checkbox"
                    name="extra"
                    value="dañoAnimales"
                    onChange={actualizarState}
                />
                Daños por atropello de animales cinegéticos (Animales de caza mayor)
        </div>
    </>
)};
export default Extras ; 