import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mt-48 mb-4">Privacy Policy</h1>
      <p className="text-gray-700">
        This website uses cookies to improve your experience. Cookies are small
        text files stored on your device to track usage and enhance user
        interaction.
      </p>
      <h2 className="text-lg font-semibold mt-4">Your Choices</h2>
      <p className="text-gray-700">
        You can accept or decline cookies using the banner on our website. You
        can also manage cookies via your browser settings.
      </p>
    </div>
  );
};

export default PrivacyPolicy;