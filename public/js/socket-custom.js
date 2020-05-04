var socket = io();

socket.on('connect', function() {
    console.log('conectado al servidor');
}); //detecta si el usuario esta conectado

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
}); //perder conexion con el cliente

//enviar informacion

socket.emit('enviarMensaje', {
    usuario: 'Vladimir',
    mensaje: 'Wena compare'
}, function(resp) {
    console.log('respuesta del servidor:', resp);
}); //se puede añadir un callback como 3er argumento en el cual podemos realizar diferentes funciones


//escuchar informacion
socket.on('enviarMensaje', function(mensaje) {
    console.log('servidor', mensaje);
});