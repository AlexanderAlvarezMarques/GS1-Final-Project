export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year;
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