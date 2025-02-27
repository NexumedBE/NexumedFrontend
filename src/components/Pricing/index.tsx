"use client";
import { useState } from "react";
// import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
// import PricingBox from "./PricingBox";
// import PricingBoxII from "./PricingBoxII";
import PricingBoxIII from "./PricingBoxIII";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
          <div className="flex justify-center">
            <div className="w-full sm:w-full md:w-full lg:w-1/3">
              <PricingBoxIII 
                packageName="By Practice"
                price="Pricing Plans"
                duration={isMonthly ? "" : ""}
                subtitle="Plans available for multiple doctors and devices"
              >
                <div className="w-2/3 border-t-2 border-gray-600 mx-auto my-4"></div>
                <div className="flex text-center">
                  Basic set up includes one doctor and up to three devices.
                </div>
                <div className="mb-6 flex justify-center">
                  36€
                </div>
                <div className="mb-2 flex justify-center">
                  Adding more doctors and devices is simple.
                </div>
                <div className="flex justify-center text-center">
                  Each additional doctor is 24€ per Dr
                </div>
                <div className="mb-2 flex justify-center text-center">
                  Each additional device is 7€ per device
                </div>
                <div className="mb-2 text-xs flex justify-center text-center">
                  VAT included
                </div>
                <div className="w-2/3 border-t-2 border-gray-600 mx-auto my-4"></div>
                <OfferList text="Unlimited Use" status="active" />
                <OfferList text="Customer Support" status="active" />
                <OfferList text="Email Support" status="active" />
                <OfferList text="Free Lifetime Updates" status="active" />
                {/* <OfferList text="Free Updates" status="active" /> */}
              </PricingBoxIII>
            </div>
          </div>
        {/* </div> */}
      </div>
      <div className="absolute bottom-0 -ml-0 -mt-2 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00adb5" />
              <stop offset="1" stopColor="#00adb5" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00adb5" />
              <stop offset="1" stopColor="#00adb5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-0 -mr-0 -mt-2 right-0 z-[-1] cale-x-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00adb5" />
              <stop offset="1" stopColor="#00adb5" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00adb5" />
              <stop offset="1" stopColor="#00adb5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
