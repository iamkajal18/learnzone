'use client';
import { loadRazorpay } from '@/lib/razorpay';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gem, Zap, CheckCircle, Lock, Shield, Info, WalletCards, CreditCard, Banknote, Smartphone } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PremiumPaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeMethod, setActiveMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [paymentTimeout, setPaymentTimeout] = useState(false);
  const [upiId, setUpiId] = useState('');

  // Teal/aqua color palette
  const colors = {
    primary: '#00cfd1',
    primaryDark: '#0286a3',
    accent: '#02c3d1',
    backgroundFrom: '#0a192f',
    backgroundTo: '#0a1a2e',
    cardBg: 'rgba(2, 134, 163, 0.1)',
    cardBorder: 'rgba(0, 207, 209, 0.3)'
  };

  useEffect(() => {
    if (paymentSuccess) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentSuccess]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        if (!paymentSuccess) {
          setPaymentTimeout(true);
        }
      }, 120000); // 2 minutes timeout
      return () => clearTimeout(timer);
    }
  }, [isLoading, paymentSuccess]);

  const isValidUpiId = (id: string) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(id);
  };

  const handlePayment = async () => {
  setIsLoading(true);
  setPaymentTimeout(false);

  try {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert('Payment gateway failed to load. Please refresh and try again.');
      return;
    }

    const res = await fetch('/api/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 1,
        username: 'Kajal Kasaudhan',
        email: 'kasaudhankajal51@gmail.com'
      }),
    });

    if (!res.ok) {
      alert('Failed to create Razorpay order. Please try again.');
      return;
    }

    const data = await res.json();

    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_dummy',
      amount: data.amount,
      currency: data.currency,
      name: 'LearnLive Pro',
      description: 'Premium Course Access',
      image: '/logo.png',
      order_id: data.id,
      handler: function (response: any) {
        setPaymentSuccess(true);
        console.log('Payment successful:', response);
      },
      prefill: {
        name: 'Kajal Kasaudhan',
        email: 'kasaudhankajal51@gmail.com',
        contact: '6387486751',
      },
      theme: {
        color: colors.primary,
        backdrop_color: '#0a192fdd'
      },
      timeout: 300,
      retry: {
        enabled: true,
        max_count: 2
      }
    };

    // Set preferred payment method
    if (activeMethod === 'upi') {
      options.method = 'upi';
      options.upi = {
        flow: 'collect',
        vpa: isValidUpiId(upiId) ? upiId : undefined
      };
    } else if (activeMethod === 'card') {
      options.method = 'card';
    } else if (activeMethod === 'netbanking') {
      options.method = 'netbanking';
    } else if (activeMethod === 'wallet') {
      options.method = 'wallet';
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response: any) {
      console.error('Payment failed:', response);
      alert(`Payment failed: ${response.error.description}`);
    });
    paymentObject.open();

  } catch (error) {
    console.error('Payment error:', error);
    alert('An error occurred during payment processing');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div 
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(135deg, ${colors.backgroundFrom}, ${colors.backgroundTo})`
      }}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.1 + 0.05,
              background: `radial-gradient(circle, ${colors.primary}, transparent 70%)`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border mb-6"
            style={{
              background: `rgba(0, 207, 209, 0.1)`,
              borderColor: colors.primary,
              backdropFilter: 'blur(10px)'
            }}
          >
            <Zap className="text-white" size={20} />
            <span className="font-medium">Premium Access</span>
          </motion.div>
          <h1 
            className="text-5xl font-bold mb-4"
            style={{
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Unlock Your Potential
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Join thousands of learners who transformed their skills with our premium courses
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Benefits Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Gem className={colors.primary} /> What You'll Get
              </h2>
              
              <ul className="space-y-4">
                {[
                  "Full course library access",
                  "Downloadable resources",
                  "Certificate of completion",
                  "Priority support",
                  "Exclusive community access",
                  "Monthly expert Q&A sessions"
                ].map((benefit, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="mt-1 flex-shrink-0" style={{ color: colors.primary }} size={18} />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div 
              className="p-6 rounded-xl border backdrop-blur-sm"
              style={{
                background: colors.cardBg,
                borderColor: colors.cardBorder
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield style={{ color: colors.primary }} />
                <h3 className="font-medium">Secure & Trusted</h3>
              </div>
              <p className="text-sm opacity-80">
                Your payment is processed through Razorpay's secure gateway. We never store your payment details.
              </p>
            </div>
          </motion.div>

          {/* Payment Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <AnimatePresence>
              {showConfetti && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden rounded-2xl"
                >
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
                      animate={{
                        y: [0, -200],
                        x: Math.random() * 200 - 100,
                        opacity: 0,
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeOut',
                        delay: i * 0.05,
                      }}
                      className="absolute"
                    >
                      <Sparkles className="text-white" size={16} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div 
              className="rounded-2xl p-8 border shadow-2xl backdrop-blur-sm"
              style={{
                background: colors.cardBg,
                borderColor: colors.cardBorder
              }}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Premium Plan</h2>
                  <p className="opacity-80">Lifetime Access</p>
                </div>
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                  style={{
                    background: `rgba(0, 207, 209, 0.2)`,
                    border: `1px solid ${colors.primary}`
                  }}
                >
                  <Lock size={14} /> Secure
                </div>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold mb-2" style={{ color: colors.primary }}>
                  ₹1
                  <span className="text-lg opacity-60 font-normal"> / one time</span>
                </div>
                <p className="opacity-80">No recurring charges</p>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setActiveMethod('upi')}
                  className={`p-3 rounded-lg flex flex-col items-center transition-all ${activeMethod === 'upi' ? 'bg-white/10 border' : 'bg-white/5 hover:bg-white/10'}`}
                  style={{
                    borderColor: activeMethod === 'upi' ? colors.primary : 'transparent'
                  }}
                >
                  <Smartphone size={20} className="mb-1" />
                  <span className="text-sm">UPI</span>
                </button>
                <button
                  onClick={() => setActiveMethod('card')}
                  className={`p-3 rounded-lg flex flex-col items-center transition-all ${activeMethod === 'card' ? 'bg-white/10 border' : 'bg-white/5 hover:bg-white/10'}`}
                  style={{
                    borderColor: activeMethod === 'card' ? colors.primary : 'transparent'
                  }}
                >
                  <CreditCard size={20} className="mb-1" />
                  <span className="text-sm">Card</span>
                </button>
                <button
                  onClick={() => setActiveMethod('netbanking')}
                  className={`p-3 rounded-lg flex flex-col items-center transition-all ${activeMethod === 'netbanking' ? 'bg-white/10 border' : 'bg-white/5 hover:bg-white/10'}`}
                  style={{
                    borderColor: activeMethod === 'netbanking' ? colors.primary : 'transparent'
                  }}
                >
                  <Banknote size={20} className="mb-1" />
                  <span className="text-sm">Netbanking</span>
                </button>
                <button
                  onClick={() => setActiveMethod('wallet')}
                  className={`p-3 rounded-lg flex flex-col items-center transition-all ${activeMethod === 'wallet' ? 'bg-white/10 border' : 'bg-white/5 hover:bg-white/10'}`}
                  style={{
                    borderColor: activeMethod === 'wallet' ? colors.primary : 'transparent'
                  }}
                >
                  <WalletCards size={20} className="mb-1" />
                  <span className="text-sm">Wallets</span>
                </button>
              </div>

              {/* UPI ID Input (only for UPI method) */}
              {activeMethod === 'upi' && (
                <div className="mb-6">
                  <label htmlFor="upi-id" className="block text-sm font-medium opacity-80 mb-2">
                    UPI ID (optional)
                  </label>
                  <input
                    type="text"
                    id="upi-id"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:outline-none transition-all"
                  />
                  {upiId && !isValidUpiId(upiId) && (
                    <p className="text-red-400 text-xs mt-1">Please enter a valid UPI ID</p>
                  )}
                </div>
              )}

              {/* Pay Now Button */}
              <motion.button
                onClick={handlePayment}
                disabled={isLoading || paymentSuccess}
                whileHover={!isLoading && !paymentSuccess ? { scale: 1.02 } : {}}
                whileTap={!isLoading && !paymentSuccess ? { scale: 0.98 } : {}}
                className={`
                  w-full py-4 px-6 rounded-xl
                  font-medium text-lg
                  transition-all duration-300
                  relative overflow-hidden
                  ${paymentSuccess 
                    ? 'bg-emerald-600 cursor-default' 
                    : isLoading 
                      ? 'cursor-wait' 
                      : 'cursor-pointer shadow-lg'
                  }
                  flex items-center justify-center gap-3
                `}
                style={{
                  background: paymentSuccess 
                    ? '#10b981' 
                    : isLoading 
                      ? colors.primaryDark 
                      : `linear-gradient(90deg, ${colors.primary}, ${colors.primaryDark})`
                }}
              >
                {paymentSuccess ? (
                  <>
                    <CheckCircle className="animate-pulse" size={22} />
                    <span>Payment Successful!</span>
                  </>
                ) : (
                  <>
                    {isLoading ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <WalletCards size={22} />
                    )}
                    <span>{isLoading ? 'Processing...' : 'Pay Now'}</span>
                  </>
                )}
              </motion.button>

              {paymentTimeout && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-lg text-sm flex items-start gap-2"
                  style={{
                    background: 'rgba(234, 179, 8, 0.1)',
                    border: '1px solid rgba(234, 179, 8, 0.3)'
                  }}
                >
                  <Info className="text-yellow-400 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="font-medium">Payment taking longer than usual?</p>
                    <p className="text-yellow-300">Please check your payment app for pending requests or try again.</p>
                  </div>
                </motion.div>
              )}

              {/* Payment Tips */}
              <div 
                className="p-4 rounded-lg border mt-6"
                style={{
                  background: 'rgba(2, 132, 199, 0.1)',
                  borderColor: 'rgba(2, 132, 199, 0.3)'
                }}
              >
                <h4 className="font-medium flex items-center gap-2">
                  <Info size={18} /> Payment Tips
                </h4>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1 pl-2 opacity-80">
                  <li>Keep your payment app open during transaction</li>
                  <li>Ensure sufficient balance in your account</li>
                  <li>Check for payment notifications if delayed</li>
                  <li>Try again after 2 minutes if timeout occurs</li>
                </ul>
              </div>

              {/* Guarantees */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <ul className="space-y-3 text-sm opacity-80">
                  <li className="flex items-center gap-2">
                    <CheckCircle style={{ color: colors.primary }} size={16} />
                    <span>7-day money back guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle style={{ color: colors.primary }} size={16} />
                    <span>Instant access after payment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle style={{ color: colors.primary }} size={16} />
                    <span>Cancel anytime</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-24"
        >
          <h3 className="text-center text-xl mb-8 opacity-80">Trusted by 10,000+ learners</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "This course changed my career trajectory completely!",
                author: "Priya M., Web Developer"
              },
              {
                quote: "The premium content is worth every rupee. Excellent quality!",
                author: "Rahul K., UX Designer"
              },
              {
                quote: "Best investment I made in my professional development.",
                author: "Ananya S., Data Scientist"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl border backdrop-blur-sm"
                style={{
                  background: colors.cardBg,
                  borderColor: colors.cardBorder
                }}
              >
                <div className="text-yellow-400 mb-2">★★★★★</div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className="text-sm" style={{ color: colors.primary }}>— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}