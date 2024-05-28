// Variables
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const year = document.querySelector('#year');

// container for results
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max -10;

// Generate an object with the search
const dataSearch = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}



// events
document.addEventListener('DOMContentLoaded', () => {
    showCars(autos); //Show cars when loading

    //Year options are filled
    fillSelect();

})

// Event listener For selects search
marca.addEventListener('change', e => {
    dataSearch.marca = e.target.value;
    filterAuto();
})
year.addEventListener('change', e => {
    dataSearch.year = parseInt( e.target.value );
    filterAuto();
})
minimo.addEventListener('change', e => {
    dataSearch.minimo = e.target.value;
    filterAuto();
})
maximo.addEventListener('change', e => {
    dataSearch.maximo = e.target.value;
    filterAuto();
})
puertas.addEventListener('change', e => {
    dataSearch.puertas = parseInt( e.target.value );
    filterAuto();
})
transmision.addEventListener('change', e => {
    dataSearch.transmision = e.target.value;
    filterAuto();
})
color.addEventListener('change', e => {
    dataSearch.color = e.target.value;
    filterAuto();

console.log(dataSearch);
})

//functions
function showCars(autos) {
    clearHTML(); 

    autos.forEach( auto => {

        const { marca, modelo, year, puertas, transmision, precio, color } = auto
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} - ${transmision} - ${precio} - ${color}
        
        `;
        // insert result html
        resultado.appendChild(autoHTML);
    });
}

//Year options are filled
function fillSelect() {

    for( let i = max; i >= min; i-- ) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option); //Add year options to select

    }
}
// clear html
function clearHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


// base filter search
function filterAuto() {
    const resultado = autos.filter( filterMarca ).filter( filterYear ).filter( filterMinimo ).filter( filterMaximo ).filter( filterDoors ).filter( filterTransmision ).filter( filterColor )
    
    console.log(resultado)
    showCars(resultado);

    if( resultado.length ) {
        showCars(resultado);
    
    } else {
       noResultado ();
    }
}
function noResultado() {
    clearHTML();
    
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No Hay Resultados';
    resultado.appendChild(noResultado);
}

function filterMarca(auto) {
    const { marca } = dataSearch
    if( marca ) {
        return auto.marca === dataSearch.marca;
    }
    return auto;
}

function filterYear(auto) {
    const { year } = dataSearch;
    if( year ) {
        return auto.year === year;
    }
    return auto;
}

function filterMinimo(auto) {
    const { minimo } = dataSearch;
    if( minimo ) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filterMaximo(auto) {
    const { maximo } = dataSearch;
    if( maximo ) {
        return auto.precio <= maximo;
    }
    return auto;
}
function filterDoors(auto) {
    const { puertas } = dataSearch;
    if( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
}
function filterTransmision(auto) {
    const { transmision } = dataSearch;
    if( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
}
function filterColor(auto) {
    const { color } = dataSearch;
    if( color ) {
        return auto.color === color;
    }
    return auto;
}