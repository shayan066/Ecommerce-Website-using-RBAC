const Razorpay = require('razorpay');
const crypto = require('crypto');

const KEY_ID = 'rzp_test_vyvDNRDuCLARMs'
const KEY_SECRET = 'XgepFDS2fGN0RxHIa4YLcMLd'

// Payment Order API
module.exports.orders = (req, res) => {
  const instance = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
  });
  
  const options = {
    amount: req.body.amount * 100,      // amount in the smallest currency unit
    currency: "INR",
  }
  instance.orders.create(options, function (err, order){
    if (err){
      return res.send({code: 500, message: "Server Err.."})
    }
    return res.send({code: 200, message: "Order created", data: order})
  });
}

// Payment Verify API
module.exports.verify = (req, res) => {
  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: 'Sign Valid' });
    } else {
        res.send({ code: 500, message: 'Sign Invalid' });
    }
}