"use client";
import Image from "next/image";

const thirdPartyConfig = () => {
    
  return (
    <>
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28 mt-16 mb-20">
        <div className="flex justify-center">
            <h2 className="mb-2 text-4xl font-bold text-black dark:text-white sm:text-4xl lg:text-4xl xl:text-4xl">
                Third Party
            </h2>
        </div>
        <div className="container flex justify-center">
            <p className="mb-2 text-lg font-bold text-black dark:text-white sm:text-xl lg:text-xl xl:text-xl">
                Below is a list of EMRs and Device Manufacturers for configuration purposes with Nexcore by Nexumed.
            </p>
        </div>
        <div className="container mb-8 w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="flex mt-16">
                <h2 className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-2xl lg:text-2xl xl:text-2xl">
                    EMR
                </h2>
            </div>
            <ul className="mt-2">
                <li>
                <a href="/docs/CareConnectConfigWithNexcore.pdf" download>
                    ⬇️ Care Connect Configuration Guide
                </a>
                </li>
            </ul>
        </div>
        <div className="container mb-8 w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="flex mt-16">
                <h2 className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-2xl lg:text-2xl xl:text-2xl">
                    Device Manufacturers
                </h2>
            </div>
            <ul className="mt-2">
                <li>
                <a href="/docs/Mesi configuration with Nexcore.pdf" download>
                    ⬇️ Mesi Configuration Guide
                </a>
                </li>
            </ul>
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
    </>
  );
};

export default thirdPartyConfig;