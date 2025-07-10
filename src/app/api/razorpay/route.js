import Razorpay from "razorpay";
import shortid from "shortid";
import IsSubscribed from "@/model/isSubscribed";
import connectDB from "@/lib/util";

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body = await req.json();
    const { username, email, amount } = body;

    if (!email || !amount) {
      return new Response("Email and amount are required", { status: 400 });
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Razorpay order options
    const paymentAmount = amount * 100; // ₹ to paise
    const options = {
      amount: paymentAmount,
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
    };

    // Create order on Razorpay
    const order = await razorpay.orders.create(options);

    // Save order info to MongoDB
    await IsSubscribed.create({
      username: username || "Guest",
      email,
      orderId: order.id,
      amount: amount,
    });

    // Return order details to frontend
    return Response.json(order);
  } catch (error) {
    console.error("Payment error:", error);
    return new Response("Order creation failed", { status: 500 });
  }
}
