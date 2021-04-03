const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "mp6fpqgpgb3c38xf",
  publicKey: "5psrfwvfwx5zh84f",
  privateKey: "fe2f66c1e0bb4840cc254215d8c25aa0",
});

exports.getToken = (req, res) => {
  //   gateway.clientToken.generate().then((response) => {
  //     // pass clientToken to your front-end

  //     res.send(response);
  //   });
  // .catch((err) => res.status(500).send(err));
  gateway.clientToken.generate({}, (err, response) => {
    // pass clientToken to your front-end
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  // console.log(req.body);
  let nonceFromTheClient = req.body.nonce;
  let amountFromTheClient = req.body.amount;

  gateway.transaction
    .sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.status(500).send(err));
};
