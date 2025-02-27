"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import Image from "next/image";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { state } = useAuth();
  const { user, isAuthenticated } = state;

  const [clientSecret, setClientSecret] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
// `/checkout?packageName=${encodeURIComponent(packageName)}&amount=${totalAmount}&devices=${deviceCount}&price=${price}`
  const packageName = searchParams.get("packageName");
  const amount = searchParams.get("amount");
  const deviceCount = searchParams.get("devices");
  const price = searchParams.get("price");
  // console.log(packageName, amount, deviceCount, price)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const createPaymentIntent = async () => {
      console.log('createPaymentIntent = async () => {');
      const response = await fetch(
        "http://localhost:5000/api/stripe/payments/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Number(amount),
            currency: "eur",
            email: user.email,
          }),
        }
      );

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    };

    if (amount) {
      createPaymentIntent();
    }
  }, [amount, user.email]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      console.error("CardNumberElement not found");
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardholderName,
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
      setIsProcessing(false);
    } else {
      setIsPaymentSuccess(true);
      await handlePaymentSuccess(result.paymentIntent);
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/stripe/payments/payment-success",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deviceCount:deviceCount,
            price:price,
            packageName:packageName,
            email: user.email,
            paymentDetails: {
              id: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: paymentIntent.currency,
            },
          }),
        }
      );

      if (response.ok) {
        alert("Invoice sent successfully!");
      } else {
        console.error("Error sending invoice.");
      }
    } catch (error) {
      console.error("Error sending payment success:", error);
    }
  };

  const handleCloseModal = () => {
    setIsPaymentSuccess(false);
    router.push("/profile");
  };

  return (
    <section id="profile" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container my-20">
        <div className="flex justify-center">
          <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
            <div className="mb-12 bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-8 text-4xl font-bold text-dark text-center">
                Checkout
              </h2>
              <p className="mb-2 text-2xl font-bold text-black">Application: {packageName}</p>
              <p className="mb-8 text-2xl font-bold text-black">
                Total Amount: {(Number(amount) / 100).toFixed(2)} €
              </p>
              <form onSubmit={handlePayment} className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="p-2 border-4 border w-full bg-white text-black placeholder-gray-500 focus:border-primary outline-none dark:bg-[#FFF] dark:text-body-color-dark"
                  required
                />
                <CardNumberElement className="p-2 border-4 border w-full bg-white text-black placeholder-gray-500 focus:border-primary outline-none dark:bg-[#FFF] dark:text-body-color-dark" />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <CardExpiryElement className="p-2 border-4 border w-full bg-white text-black placeholder-gray-500 focus:border-primary outline-none dark:bg-[#FFF] dark:text-body-color-dark" />
                  </div>
                  <div className="flex-1">
                    <CardCvcElement className="p-2 border-4 border w-full bg-white text-black placeholder-gray-500 focus:border-primary outline-none dark:bg-[#FFF] dark:text-body-color-dark" />
                  </div>
                </div>
                <p className="mt-1 text-[11px] text-gray-400">
                  By providing your card information, you allow Nexumed to charge your card for future payments in accordance with their terms.
                </p>
                <button
                  type="submit"
                  disabled={!stripe || !cardholderName || isProcessing}
                  className="rounded bg-primary px-5 py-2 text-white hover:bg-primary-dark transition duration-300 w-full"
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </button>
              </form>
              {/* <div className="flex justify-center mt-0">
                <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" 
                    alt="Powered by Stripe" 
                    className="w-32"
                  />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {isPaymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-dark p-10 shadow-lg max-w-sm w-full text-center">
            <p className="text-2xl font-semibold text-primary">Your payment has been successfully processed.</p>
            <div className="flex justify-center items-center">
              <Image src="/images/logo/nexumed.png" alt="logo" width={80} height={50} className="my-10" />
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-primary text-white py-2 px-6 hover:bg-primary-dark transition duration-300"
            >
              Go to Profile
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Checkout;

