import React, { useState } from 'react';
import { auth, firestore } from '../firebaseConfig';

const Extras = () => {
    const data = [
        {
            name: "Robo del vehículo",
        },
        {
            name: "Rotura de parabrisas y lunas",
        },
        {
            name: "Incendio del vehículo",
        },
        {
            name: "Daños por atropello de animales cinegéticos (Animales de caza mayor)",
        }
    ];

    const [isChecked, setIsChecked] = useState({});
    const [formData] = useState(data);

    const handleSingleCheck = e => {
        setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
    };

    const addExtra = e => {
        e.preventDefault();
        if (auth.currentUser.uid != null) {
            firestore.collection("usuariosRgistrados").doc(auth.currentUser.uid)
        }

    }

    return (
        <>
            <div class="py-3" className="App">
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
                <button onClick={addExtra} class="btn btn-primary">Añadir</button>
            </div>
        </>

    )
};

export default Extras; 