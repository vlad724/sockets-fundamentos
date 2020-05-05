const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades.js');
const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y la sala es necesaria'
            });
        }
        //unir al usuario a una sala
        client.join(data.sala);
        /* ------------------ */
        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        let personaEntra = usuarios.getPersona(client.id);
        //muestra todas las personas en el chat de manera asincrona 
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala(data.sala));
        /* ---------------------- */

        callback(usuarios.getPersonaPorSala(data.sala));
    })

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        //notifica cuando un usuairo se desconecto
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
        /*  ---------------------- */

        //muestra todas las personas en el chat de manera asincrona 
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonaPorSala());
        /* ---------------------- */
    })

    //mensaje privado
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje)); //se añade to para añadir data.para
    })
}); //client tiene toda la informacion de la computadora que se conecto