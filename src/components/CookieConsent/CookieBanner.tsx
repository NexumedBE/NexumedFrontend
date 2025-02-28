import React from "react";
import CookieConsent from "react-cookie-consent";
import Image from "next/image";

const CookieBanner: React.FC = () => {
  return (
    <CookieConsent
      location="none" 
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="siteCookieConsent"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#4b525a",
        padding: "1.5rem",
        borderRadius: "16px", 
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5), 0 10px 15px rgba(0, 0, 0, 0.4)",
        width: "90%", 
        maxWidth: "500px",
        textAlign: "center",
        zIndex: 1000,
        overflow: "hidden", 
      }}
      buttonWrapperClasses="flex flex-wrap justify-center gap-4 mt-4" 
      buttonClasses="bg-green-500 text-white px-4 py-2 rounded font-medium hover:bg-green-600 transition duration-200"
      declineButtonClasses="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 transition duration-200"
      onAccept={() => console.log("User accepted cookies")}
      onDecline={() => console.log("User declined cookies")}
      enableDeclineButton
    >
       <Image
        src="/images/logo/nexumed.png"
        alt="logo"
        // className="w-full dark:hidden"
        width={80}
        height={50}
      />
      <p className="text-[#00adb5] mb-4 text-sm md:text-base text-center">
        This website uses cookies to improve your experience.
      </p>
      <a
        href="/privacy-policy"
        className="text-[#00adb5] underline hover:text-yellow-500 text-sm md:text-base"
      >
        Learn more
      </a>
    </CookieConsent>
  );
};

export default CookieBanner;


