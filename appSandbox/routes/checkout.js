var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'w99s8svr72r52dk9',
    publicKey: '7yvbpm3khntdp3gg',
    privateKey: '1702ede47bffb13c27b43b7fabfbcdf1'
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  var primerNombre = req.body.primerNombre;
  var apellido = req.body.apellido;
  var mail = req.body.mail;
  var precio = req.body.precio;

  //console.log("El precio es: "+precio);
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({
    amount: precio,
    paymentMethodNonce: nonceFromTheClient,
    customer: {
      firstName: primerNombre,
      lastName: apellido,
      email: mail
    },
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;
