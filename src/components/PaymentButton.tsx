'use client';
import { loadRazorpay } from '@/lib/razorpay';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentButton() {
  const handlePayment = async () => {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert('Razorpay SDK failed to load!');
      return;
    }

    const res = await fetch('/api/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 499 }),
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: 'LearnLive - Kajal Kasaudhan',
      description: 'Course Purchase',
      image: '/logo.png',
      order_id: data.id,
      handler: function (response: any) {
        alert('✅ Payment Successful!');
        console.log(response);
      },
      prefill: {
        name: 'Kajal Kasaudhan',
        email: 'kasaudhankajal51@gmail.com',
        contact: '6387486751',
      },
      theme: { color: '#2563eb' },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Pay ₹499
    </button>
  );
}
