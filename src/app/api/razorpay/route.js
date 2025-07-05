import Razorpay from "razorpay";
import shortid from "shortid";

export async function POST(req) {
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const body = await req.json();
  const amount = body.amount * 100; // convert ₹ to paise

  const options = {
    amount,
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    return Response.json(response);
  } catch (err) {
    return new Response("Order creation failed", { status: 500 });
  }
}
