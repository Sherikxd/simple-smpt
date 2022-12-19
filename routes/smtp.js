const express = require("express");
const bodyParser = require("body-parser");
const simplesmtp = require("simplesmtp");


const router = express.Router();
const smtp = simplesmtp.createServer();

router.post('/send', (req, res) => {
      // Obtiene el cuerpo de la solicitud
  const body = req.body;

  // Envía el mensaje a través del servidor SMTP
  smtp.send({
    from: body.from,
    to: body.to
  }, body.message, function(err) {
    if (err) {
      res.send({ success: false, error: err });
    } else {
      res.send({ success: true });
    }
  });
});
module.exports = router;