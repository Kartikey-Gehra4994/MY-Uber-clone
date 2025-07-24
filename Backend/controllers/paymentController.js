// controllers/paymentController.js
const Ride = require('../models/ride.model');
const crypto = require('crypto');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount, rideId } = req.body;

  const options = {
    amount: amount * 100, // Razorpay needs amount in paisa
    currency: "INR",
    receipt: `receipt_order_${rideId}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Order creation failed', details: err });
  }
};


exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, rideId } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;

  if (isValid) {
    await Ride.findByIdAndUpdate(rideId, {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};
