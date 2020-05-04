const { io } = require('../server');


io.on('connection', (client) => {

    console.log('usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'admin',
        mensaje: 'wena mi compare'
    });


    client.on('disconnect', () => {
        console.log('usuario desconectado');
    }); //detecta si se desconecto el usuario

    //escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);

        client.broadcast.emit('enviarMensaje', data); //broadcast envia a todos los usuarios
        /*
                if (mensaje.usuario) {
                    callback({
                        resp: 'todo salio bien'
                    });
                } else {
                    callback({
                        resp: 'todo salio mal'
                    });
                } //callback es el a3er argumento realizado en el front-end

         */
    });

}); //client tiene toda la informacion de la computadora que se conecto