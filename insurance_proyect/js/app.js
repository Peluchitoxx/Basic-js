
//constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//realiza la cotizacion
Seguro.prototype.cotizarSeguro = function() {

    let cantidad;
    const base = 2000;

    switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    // leer año, cada año diferente se reduce 3%
    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    // si el seguro es basico se multiplica por un 30% mas
    // si el seguro es completo se multiplica por un 50%
    if(this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}

function UI() {}

// Llena las opciones de años
UI.prototype["llamarOpciones"] = () => {
    const max = new Date().getFullYear(),
    min = max - 20

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i-- ) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }

}

// alertas en pantalla
UI.prototype.mostrarAlerta = (mensaje, tipo) => {
    const div = document.createElement('div')

    if(tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // insertar en html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
}

UI.prototype.mostrarResultado = (total, seguro) => {
    const { marca, year, tipo } = seguro;

    let textoMarca;

    switch(marca) {
        case '1':
            textoMarca = 'Americano'
            break;
        case '2':
            textoMarca = 'Asiatico'
            break;
        case '3':
            textoMarca = 'Europeo'
            break;
        default:
            break;
    }

    const div = document.createElement('div');

    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-blod">Marca: ${textoMarca}</p>
        <p class="font-blod">Año: ${year}</p>
        <p class="font-blod">Tipo: ${tipo}</p>
        <p class="font-blod">Total: ${total}</p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 2000);
}

//instanciar UI
const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
    ui.llamarOpciones(); // llenar el select con los años
})


const EventListener = () => {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

const cotizarSeguro = (e) => {
    e.preventDefault();

    // leer la marca
    const marca = document.querySelector('#marca').value;

    // leer año
    const year = document.querySelector('#year').value;

    // leer cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === '') {
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarAlerta('Cotizando...', 'exito');

    // evitar duplicar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null ) {
        resultados.remove();
    }

    // instanciar seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(total, seguro);

}
EventListener();
 