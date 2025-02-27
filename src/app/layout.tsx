"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import Head from "next/head";
import "../styles/index.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import CookieBanner from "@/components/CookieConsent/CookieBanner";
import AnalyticsInitializer from "@/components/AnalyticsInitializer/AnalyticsInitializer";
import { AuthProvider } from "@/context/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <Head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://nexumed.eu" />

        {/* Favicon */}
        <link rel="icon" href="/images/favicon.ico" />

        {/* SEO Metadata */}
        <title>Nexumed - Connecting Medicine</title>
        <meta
          name="description"
          content="Revolutionizing healthcare integration with Nexumed."
        />
        <meta name="keywords" content="healthcare, medicine, integration, technology" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Nexumed - Connecting Medicine" />
        <meta
          property="og:description"
          content="Revolutionizing healthcare integration with Nexumed."
        />
        <meta property="og:url" content="https://nexumed.eu" />
        <meta property="og:image" content="https://nexumed.eu/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Nexumed Open Graph Image" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nexumed - Connecting Medicine" />
        <meta name="twitter:description" content="Revolutionizing healthcare integration with Nexumed." />
        <meta name="twitter:image" content="https://nexumed.eu/twitter-image.jpg" />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "Nexumed",
              "url": "https://nexumed.eu",
              "logo": "https://nexumed.eu/og-image.jpg",
              "description": "Revolutionizing healthcare integration with Nexumed.",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@nexumed.eu",
                "contactType": "Customer Service",
              },
            }),
          }}
        />
      </Head>

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <AuthProvider> 
            <Elements stripe={stripePromise}>
              <Header />
              {children}
              <SpeedInsights />
              <Footer />
              <ScrollToTop />
              <CookieBanner />
              <AnalyticsInitializer />
            </Elements>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
