"use client";

import { useRouter } from "next/navigation";
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
import AngleDecorations from "@/components/Decorations/AngleDecorations/AngleDecorations";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { state } = useAuth();
  const { user, isAuthenticated } = state;

  const [clientSecret, setClientSecret] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ Ensure searchParams runs only on the client
  const [practiceName, setPracticeName] = useState("Unknown Practice");
  const [totalAmount, setTotalAmount] = useState("0");
  const [totalDevices, setTotalDevices] = useState("0");
  const [monthlyPrice, setMonthlyPrice] = useState("0");

  // ✅ Redirect if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // ✅ Extract query parameters safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setPracticeName(decodeURIComponent(searchParams.get("packageName") || "Unknown Practice"));
      setTotalAmount(searchParams.get("amount") || "0");
      setTotalDevices(searchParams.get("devices") || "0");
      setMonthlyPrice(searchParams.get("price") || "0");
    }
  }, []);

  // ✅ Create Stripe Payment Intent
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!user?.email || totalAmount === "0") return;

      console.log("Creating payment intent...");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stripe/payments/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: Number(totalAmount), // Ensure it's in cents for Stripe
              currency: "eur",
              email: user.email,
            }),
          }
        );

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, [totalAmount, user?.email]);

  // ✅ Handle Payment Submission
  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      console.error("CardNumberElement not found");
      setIsProcessing(false);
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

  // ✅ Handle Payment Success and Update User Subscription
  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stripe/payments/payment-success`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deviceCount: Number(totalDevices),
            price: Number(monthlyPrice),
            practiceName,
            email: user?.email,
            paymentDetails: {
              id: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: paymentIntent.currency,
            },
          }),
        }
      );

      if (!response.ok) {
        console.error("Error sending invoice.");
        return;
      }

      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update-subscription`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user?.email,
            current: true,
            admin: true,
          }),
        }
      );

      if (!updateResponse.ok) {
        console.error("Error updating user subscription.");
        return;
      }

      alert("Invoice sent successfully! Subscription activated.");
    } catch (error) {
      console.error("Error handling payment success:", error);
    }
  };

  // ✅ Close the modal and redirect to profile page
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
              <p className="mb-2 text-2xl font-bold text-black">Practice: {practiceName}</p>
              <p className="mb-8 text-2xl font-bold text-black">
                Total Subscription Cost: €{monthlyPrice}/month
              </p>
              <form onSubmit={handlePayment} className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="p-2 border-4 w-full bg-white text-black placeholder-gray-500 focus:border-primary outline-none"
                  required
                />
                <CardNumberElement className="p-2 border-4 w-full bg-white text-black" />
                <div className="flex gap-4">
                  <CardExpiryElement className="p-2 border-4 w-full bg-white" />
                  <CardCvcElement className="p-2 border-4 w-full bg-white" />
                </div>
                <button
                  type="submit"
                  disabled={!stripe || !cardholderName || isProcessing}
                  className="bg-primary px-5 py-2 text-white hover:bg-primary-dark transition duration-300 w-full"
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {isPaymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-dark p-10 shadow-lg max-w-sm w-full text-center">
            <p className="text-2xl font-semibold text-primary">
              Your payment has been successfully processed.
            </p>
            <button onClick={handleCloseModal} className="mt-4 bg-primary text-white py-2 px-6">
              Go to Profile
            </button>
          </div>
        </div>
      )}
      <div className="mr-12">
        <AngleDecorations />
      </div>
    </section>
  );
};

export default Checkout;
