"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { isValidPhoneNumber } from "../../utils/phoneValidator";

const SignupPage = () => {
  const router = useRouter();
  const { dispatch } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    drsId: "",
    password: "",
    practice: "",
    address: "",
    town: "",
    country: "",
    countryCode: "",
    phone: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    firstTime: true, 
    current: false,
    admin: true, 
    emrProviders: [],  
    selectedDevices: [],  
    doctors: [],  
  });
  

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (phone: string, countryData: { country: { iso2: string; name: string } }) => {
    setFormData((prevData) => ({
      ...prevData,
      phone,
      country: countryData.country.name,
      countryCode: countryData.country.iso2,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const requiredFields = Object.keys(formData).filter(field => field !== "firstTime" && field !== "current");


    // Ensure all fields are filled
    for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          setError("All fields are required.");
          window.scrollTo(0, 0);
          return;
        }
      }

    // Validate phone number
    const trimmedPhone = formData.phone.trim();
    const formattedCountryCode = `+${formData.countryCode.toUpperCase()}`;

    if (trimmedPhone === formattedCountryCode || trimmedPhone === "") {
      setError("Phone number is required.");
      window.scrollTo(0, 0);
      return;
    }

    if (!isValidPhoneNumber(trimmedPhone, formData.countryCode.toUpperCase() || "BE")) {
      setError("Invalid phone number. Please enter a valid number.");
      window.scrollTo(0, 0);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          emrProviders: formData.emrProviders || [],  
          selectedDevices: formData.selectedDevices || [],  
          doctors: formData.doctors || [],  
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Registration successful!");
        setError("");

        dispatch({
          type: "LOGIN",
          payload: {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username,
            drsId: data.user.drsId,
            practice: data.user.practice,
            address: data.user.address || "",
            town: data.user.town || "",
            country: data.user.country || "",
            countryCode: data.user.countryCode || "",
            phone: data.user.phone || "",
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            jobTitle: data.user.jobTitle || "",
            firstTime: data.user.firstTime, 
            current: data.user.current,
            admin: data.user.admin, 
            emrProviders: data.user.emrProviders || [], 
            selectedDevices: data.user.selectedDevices || [],
            doctors: data.user.doctors || [],
          },
        });

        router.push("/stepOne");
      } else {
        setError(data.message || "Registration failed.");
        window.scrollTo(0, 0);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred. Please try again later.");
      window.scrollTo(0, 0);
    }
  };

  const handleChangeJobTitle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Create your account
              </h3>

              {error && <p className="mb-4 text-center text-sm text-red-500">{error}</p>}
              {success && <p className="mb-4 text-center text-sm text-green-500">{success}</p>}

              <form onSubmit={handleSubmit}>
                <h4 className="mb-4 text-lg font-semibold text-primary">All Fields are Mandatory</h4>
                {[
                  { label: "User Name", name: "username", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Drs ID Number", name: "drsId", type: "text" },
                  { label: "Practice", name: "practice", type: "text" },
                  { label: "Password", name: "password", type: showPassword ? "text" : "password" },
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Last Name", name: "lastName", type: "text" },
                  { label: "Address", name: "address", type: "text" },
                  { label: "Town", name: "town", type: "text" },
                  { label: "Country", name: "country", type: "text" },
                  // { label: "Job Title", name: "jobTitle", type: "text" },
                ].map(({ label, name, type }) => (
                  <div className="mb-6" key={name}>
                    <label htmlFor={name} className="mb-3 block text-sm text-dark dark:text-white">
                      {label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={type}
                      name={name}
                      placeholder={`Enter your ${label}`}
                      value={formData[name as keyof typeof formData] as string}
                      onChange={handleChange}
                      required
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {name === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="mt-2 text-sm text-primary hover:underline"
                      >
                        {showPassword ? "Hide Password" : "Show Password"}
                      </button>
                    )}
                  </div>
                ))}
                <div className="mb-6">
                  <label htmlFor="jobTitle" className="mb-3 block text-sm text-dark dark:text-white">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChangeJobTitle}
                    required
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  >
                    <option value="" disabled>Select your job title</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Office Manager">Office Manager</option>
                    <option value="Admin">Admin</option>
                    <option value="IT">IT</option>
                  </select>
                </div>

                {/* Phone Number Field */}
                <div className="mb-6">
                  <label htmlFor="phone" className="mb-3 block text-sm text-dark dark:text-white">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent  dark:focus:border-primary ">
                    <PhoneInput
                      defaultCountry="be"
                      value={formData.phone}
                      onChange={(phone, countryData) => handlePhoneChange(phone, countryData)}
                      inputStyle={{ width: "100%" }}
                    />
                  </div>
                </div>

                <button type="submit" className="w-full rounded bg-primary px-9 py-4 text-base font-medium text-white">
                  Sign up
                </button>
              </form>

              <p className="text-center text-base font-medium text-body-color">
                Already have an account?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;


