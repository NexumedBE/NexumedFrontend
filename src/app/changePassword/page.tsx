"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const router = useRouter();
  const { state } = useAuth();
  const { user } = state;
  
  

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return null; // or a loading indicator
  }

  const togglePasswordVisibility = (field: keyof typeof isPasswordVisible) => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password changed successfully. Redirecting...");
        setTimeout(() => router.push("/profile"), 3000);
      } else {
        setErrorMessage(data.message || "Failed to change password.");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setErrorMessage("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container mx-auto w-full max-w-md">
        <h2 className="text-2xl font-bold mt-52">Change Password</h2>
        <h3 className="text-2xl font-bold">{user.email}</h3>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="relative mb-8">
            <input
              type={isPasswordVisible.currentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-lg text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("currentPassword")}
              className="absolute right-4 top-3 text-gray-500"
            >
              {isPasswordVisible.currentPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative mb-8">
            <input
              type={isPasswordVisible.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-lg text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="absolute right-4 top-3 text-gray-500"
            >
              {isPasswordVisible.newPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative mb-8">
            <input
              type={isPasswordVisible.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-lg text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute right-4 top-3 text-gray-500"
            >
              {isPasswordVisible.confirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          
          <button type="submit"  className="mt-12 mb-20 ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9">
            {isLoading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;

