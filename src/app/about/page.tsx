

import { Metadata } from "next";
import Image from "next/image";
import CircleBackground from "@/components/Decorations/CircleBackground/CircleBackground";

export const metadata: Metadata = {
  title: "Nexumed - Connecting Medicine",
  description: "Revolutionizing healthcare integration with Nexumed.",
  icons: {
    icon: "/images/favicon.ico", 
  },
  keywords: ["healthcare", "medicine", "integration", "technology"],
  openGraph: {
    title: "Nexumed - Connecting Medicine",
    description: "Revolutionizing healthcare integration with Nexumed.",
    url: "https://nexumed.eu",
    images: [
      {
        url: "https://nexumed.eu/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexumed Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexumed - Connecting Medicine",
    description: "Revolutionizing healthcare integration with Nexumed.",
    images: ["https://nexumed.eu/twitter-image.jpg"],
  },
};

const AboutPage = () => {
  return (
    <>
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container mt-16">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Nexumed
              </h2>
              <div className="flex justify-center items-center mt-6 mb-4">
                <Image src="/images/logo/nexumed.png" alt="logo" width={80} height={50} />
              </div>
              <br/>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  At Nexumed, we are revolutionizing healthcare integration by seamlessly connecting healthcare professionals, EMR systems, and medical devices. Our cutting-edge platform ensures real-time data exchange, streamlines workflows, and enhances patient care by eliminating integration barriers. Whether you&apos;re a healthcare provider looking for efficient patient data access, an EMR provider seeking seamless interoperability, or a medical device manufacturer aiming for optimized connectivity, Nexumed is the bridge that brings it all together.
                </p>
                <br/>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our mission is to simplify medical data exchange and workflow automation, ensuring healthcare professionals can focus on what truly matters—patient care. By delivering robust, scalable solutions, we empower healthcare providers with real-time access to critical information, enhance EMR interoperability, and enable seamless medical device integration. Join us in transforming healthcare technology and shaping a more connected, efficient, and innovative future.
                </p>
            </div>
            <CircleBackground />
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutPage;