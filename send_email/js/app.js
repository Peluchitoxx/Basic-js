document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

//Select interface elements
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSumit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // assign event
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        resetFormulario();

    })

    function enviarEmail(e) {
        e.preventDefault();
      
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
      
        setTimeout(() => {
          spinner.classList.remove('flex');
          spinner.classList.add('hidden');
      
          // Reset the object
          resetFormulario();
      
          // An alert is created
          const alertaExito = document.createElement('P');
          alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
          alertaExito.textContent = 'Mensaje enviado correctamente';
      
          formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        
        }, 3000);
      }

    function validar(e) {
        if(e.target.value.trim() === '') {
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        email[e.target.name] = '';
        comprobarEmail();
        return;
        } 
        if(e.target.id === 'email' && !valiarEmail(e.target.value)) {
            mostrarAlerta('El email no es valio',e.target.parentElement );
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        limpiarAlerta(e.target.parentElement);

        // assign the values
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //Check the email object
        comprobarEmail();
    }   

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // html alert
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white-', 'p-2', 'text-center');

        // Inject the error to the form
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        //Check if an alert already exists
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function valiarEmail(email) {
        //Pattern finder for email
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail() {

    if(Object.values(email).includes('')){
        btnSumit.classList.add('opacity-50');
        btnSumit.disabled = true;
        return;
    } 
    btnSumit.classList.remove('opacity-50');
    btnSumit.disabled = false;
 }

 function resetFormulario() {
    // Reset the object
    email.email = '';
    email.asunto = '';
    email.mensaje = '';

    formulario.reset();
    comprobarEmail();
 }

});