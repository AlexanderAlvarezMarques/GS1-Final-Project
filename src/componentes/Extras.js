import React,{useState,useEffect} from 'react';
import useForm from 'react-hook-form';

const Extras = () => {
    const data = [
        {
          name: "test1",
          result: "pass"
        },
        {
          name: "test2",
          result: "pass"
        },
        {
          name: "test3",
          result: "pass"
        },
        {
          name: "test4",
          result: "pass"
        },
        {
          name: "test5",
          result: "pass"
        }
      ];


    const [allChecked, setAllChecked] = useState(false);
    const [isChecked, setIsChecked] = useState({});
    const [formData, setFormData] = useState(data);
  
    const handleAllCheck = e => {
      setAllChecked(e.target.checked);
    };
  
    const handleSingleCheck = e => {
      setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
    };
  
    const onDelete = () => {
      console.log(isChecked);
      const newData = data.filter(
        item => !Object.keys(isChecked).includes(item.name)
      );
      console.log(newData);
      setFormData(newData);
    };




    
   /* const [datos, setDatos] = useState({
        extra: []
    });
    const{extra}=datos 

    
    // actualizar campos del formulario
    const actualizarState = e => {
        setDatos({
            
            ...datos,
            [e.target.name] : e.target.value,
        })
    }


    useEffect(() => {

    }, [datos]);
    
*/

    return( 
    <>


<div className="App">
      <div>
        <label>All</label>
        <input
          name="checkall"
          type="checkbox"
          checked={allChecked}
          onChange={handleAllCheck}
        />
        <label />
      </div>
      {formData.map((test, index) => (
        <div key={index}>
          <label>{test.name}</label>
          <input
            type="checkbox"
            name={test.name}
            checked={allChecked ? true : isChecked[test.name]}
            onChange={handleSingleCheck}
          />
        </div>
      ))}
      <button onClick={() => onDelete()}>DELETE</button>
    </div>







    {/* <h3>Añadir extras a tu seguro</h3>
    
        <div>
                 <input
                    type="checkbox"
                    value="robo"
                    onChange={actualizarState}
                />
                Robo del vehículo

                <input
                    type="checkbox"
                    value="rotura"
                    onChange={actualizarState}
                /> 
                Rotura de parabrisas y lunas

                <input
                    type="checkbox"
                    value="incendio"
                    onChange={actualizarState}
                />
                Incendio del vehículo

                <input
                    type="checkbox"
                    value="dañoAnimales"
                    onChange={actualizarState}
                />
                Daños por atropello de animales cinegéticos (Animales de caza mayor)
        </div> */}
    </>

)};

export default Extras ; 