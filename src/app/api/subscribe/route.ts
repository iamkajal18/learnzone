import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import Subscriber from '@/model/Subscribes';
import connectDB from "@/lib/util";

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { email } = body;

    // Validate email format
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json({ 
        message: 'You are already subscribed to LearnLive!',
        status: 'already_subscribed'
      }, { status: 200 });
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Email transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email message configuration
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to LearnLive!',
      html: `
        <h2>Welcome to LearnLive!</h2>
        <p>Thank you for subscribing! You’ll now receive our latest updates and exclusive content directly in your inbox.</p>
        <p>Stay tuned for exciting learning resources and updates!</p>
        <p>— Kajal from LearnLive 🌟</p>
        <p><small>Want to unsubscribe? Click <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}">here</a></small></p>
      `,
    };

    // Send confirmation email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      message: 'Subscription successful! Check your inbox for a confirmation email.',
      status: 'subscribed'
    }, { status: 201 });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ 
      message: 'Something went wrong while processing your subscription',
      error: typeof error === 'object' && error !== null && 'message' in error ? (error as { message: string }).message : String(error)
    }, { status: 500 });
  }
}