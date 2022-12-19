const express = require('express');
const bodyParser = require('body-parser');
const simplesmtp = require('simplesmtp');
const SMTP = require("./routes/smtp");
// Crea una instancia de Express
const app = express();

// Configura el middleware de body-parser para procesar el cuerpo de la solicitud
app.use(bodyParser.json());

// Crea una instancia de simplesmtp
const smtp = simplesmtp.createServer();

// Configura el servidor SMTP para escuchar en el puerto 25
smtp.listen(25, function() {
  console.log('Servidor SMTP escuchando en el puerto 25');
});

// Maneja los mensajes entrantes
smtp.on('data', function(envelope, chunk) {
  console.log(`Mensaje recibido de ${envelope.mailFrom} para ${envelope.rcptTo}`);
});

// Crea una ruta para aceptar mensajes a través de una solicitud HTTP POST

app.use('/send',SMTP)

// Inicia el servidor web
app.listen(3000, function() {
  console.log('Servidor web escuchando en el puerto 3000');
});
