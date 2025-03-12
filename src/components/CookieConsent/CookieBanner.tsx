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
      buttonWrapperClasses="relative w-full mt-4 mb-20" 
      buttonStyle={{
        backgroundColor: "#00adb5", 
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        fontWeight: "500",
        transition: "background-color 0.2s",
        border: "none",
        cursor: "pointer",
        position: "absolute",
        left: "0", 
      }}
      declineButtonStyle={{
        backgroundColor: "#DC2626", 
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        fontWeight: "500",
        transition: "background-color 0.2s",
        border: "none",
        cursor: "pointer",
        position: "absolute",
        right: "0", 
      }}
      onAccept={() => console.log("User accepted cookies")}
      onDecline={() => console.log("User declined cookies")}
      enableDeclineButton
    >
      {/* Centering the image */}
      <div className="flex justify-center mb-4">
        <Image
          src="/images/logo/nexumed.png"
          alt="logo"
          width={80}
          height={50}
        />
      </div>

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




