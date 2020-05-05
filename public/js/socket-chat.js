var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('usuarios conectados: ', resp);
    });
}); //detecta si el usuario esta conectado

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
}); //perder conexion con el cliente

//enviar informacion

/* socket.emit('crearMensaje', {
    usuario: 'Vladimir',
    mensaje: 'Wena compare'
}, function(resp) {
    console.log('respuesta del servidor:', resp);
}); //se puede añadir un callback como 3er argumento en el cual podemos realizar diferentes funciones
 */

//escuchar informacion
socket.on('crearMensaje', function(mensaje) {
    console.log('servidor', mensaje);
});

//cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    console.log(personas);
});

//mensjae privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('mensaje privado', mensaje);
});