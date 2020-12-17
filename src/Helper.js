export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year;
}

export function porAntiguedad(antiguedadCarnet){
    let incremento;
    if (antiguedadCarnet < 2){
        incremento = 250
    }else if(antiguedadCarnet >10){
        incremento = 50
    }else{
        incremento = 100
    }
    return incremento;
}

export function calcularModelo(modelo){
    let incremento;
    switch(modelo){
        case 'Berlina' :
            incremento = 0.25;
            break;
        
        case 'A3' :
            incremento = 0.20;
            break;

        case 'Focus' :
            incremento = 0.15;
            break;

        case 'Yaris' :
            incremento = 0.65;
            break;

        case 'Tucson' :
            incremento = 0.75;
            break;
        
        default:
            break;
    }
    return incremento;
}




export function calcularMarca(marca){
    
    let incremento;
    switch(marca){
        case 'Mercedes' :
            incremento = 1.60;
            break;
        
        case 'Audi' :
            incremento = 1.35;
            break;

        case 'Ford' :
            incremento = 1.15;
            break;

        case 'Toyota' :
            incremento = 0.95;
            break;

        case 'Hyundai' :
            incremento = 0.85;
            break;
        
        default:
            break;
    }
    return incremento;
}

export function obtenerPlan(plan){
    return (plan === 'basico') ? 1.20 : 1.50 ;
}