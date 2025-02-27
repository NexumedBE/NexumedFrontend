// components/AnalyticsInitializer.tsx
"use client";
import React, { useEffect } from "react";
import { handleCookieActions } from "../../utils/cookieConsent";

const AnalyticsInitializer: React.FC = () => {
  useEffect(() => {
    handleCookieActions();
  }, []);

  return null;
};

export default AnalyticsInitializer;
