const express = require('express');
/* socketIO.io utiliza la libreria de http */
const socketIO = require('socket.io');

const http = require('http');
/* -------------- */

const path = require('path');

const app = express();
/* para inicializar el server */
let server = http.createServer(app);
/* ------------- */


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//io= esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket.js'); //se importa sockets.js


//en vez de app es server ya que se esta utilizando http
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});