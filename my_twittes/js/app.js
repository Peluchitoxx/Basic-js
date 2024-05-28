// Variables
const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}

//funciones
function agregarTweet(e) {
    e.preventDefault();

    // TEXT AREA
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if (tweet === '') {
        mostrarError('El tweet no puede ir vacío');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //añadir al arreglo de twwets
    tweets = [...tweets, tweetObj];

    // crear html
    crearHTML();

    // reiniciar formulario
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // eliminar alerta
    setTimeout(() => {
        mensajeError.remove();
    }, 3000)
}

// muestra listado de los tweets
function crearHTML() {
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
          const btnEliminar = document.createElement('a');
          btnEliminar.classList.add('borrar-tweet');
          btnEliminar.textContent = 'X'

          btnEliminar.onclick = () => {
               borrarTweet(tweet.id);
          }

            // crear el html
            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id) {
     tweets = tweets.filter( tweet => tweet.id != id);

     crearHTML();
}