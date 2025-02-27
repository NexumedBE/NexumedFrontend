"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { dispatch } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      console.log("🟢 Login response from backend:", data); // ✅ Check if admin is true
  
      if (response.ok) {
        setSuccess(data.message || "Login successful!");
        setError("");
  
        console.log("🟢 Before dispatch - user data:", data.user); // ✅ Ensure admin is still true
  
        dispatch({
          type: "LOGIN",
          payload: {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username || "",
            drsId: data.user.drsId || "",
            practice: data.user.practice || "",
            address: data.user.address || "",
            town: data.user.town || "",
            country: data.user.country || "",
            countryCode: data.user.countryCode || "",
            phone: data.user.phone || "",
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            jobTitle: data.user.jobTitle || "",
            deviceCompany: data.user.deviceCompany || "",
            emrProvider: data.user.emrProvider || "",
            current: data.user.current ?? false,
            admin: data.user.admin ?? false, // ✅ Ensure admin is passed correctly
            firstTime: data.user.firstTime ?? false,
            doctors: data.user.doctors || [],
            selectedDevices: data.user.selectedDevices || [],
          },
        });
  
        console.log("🟢 After dispatch - localStorage:", JSON.parse(localStorage.getItem("user") || "{}")); // ✅ Check storage
  
        router.push("/profile");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("An error occurred. Please try again later.");
    }
  };
  
  
  

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Sign in to your account.
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Login with email and password.
              </p>

              {error && <p className="mb-4 text-center text-sm text-red-500">{error}</p>}
              {success && <p className="mb-4 text-center text-sm text-green-500">{success}</p>}

              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={formData.email.toLowerCase()}
                    onChange={handleInputChange}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    required
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Your Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-body-color dark:text-body-color-dark"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className="text-center text-base font-medium text-body-color">
                Don’t you have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
