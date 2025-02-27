"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { isValidPhoneNumber } from "../../utils/phoneValidator";
import AngleDecorations from "@/components/Decorations/AngleDecorations/AngleDecorations";
const Profile = () => {
  const router = useRouter();
  const { state, dispatch } = useAuth();
  const { user, isAuthenticated } = state;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    drsId: "",
    jobTitle: "",
    firstName: "",
    lastName: "",
    address: "",
    town: "",
    country: "",
    phone: "",
    deviceCompany: "",
    emrProvider: "",
    practice: "",
    current: false,
    admin: false,
    firstTime: false,
    selectedDevices: [] as { manufacturer: string; device: string }[],
    doctors: [] as { firstName: string; lastName: string; drsId: string; email: string }[],
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      console.log("Populating profile form with:", user);
      setFormData({
        id: user.id || "",
        username: user.username || "",
        email: user.email || "",
        drsId: user.drsId || "",
        address: user.address || "",
        country: user.country || "",
        firstName: user.firstName || "",
        jobTitle: user.jobTitle || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        town: user.town || "",
        deviceCompany: user.deviceCompany || "",
        emrProvider: user.emrProvider || "",
        practice: user.practice || "",
        current: user.current ?? false, 
        admin: user.admin ?? false, 
        firstTime: user.firstTime ?? false, 
        selectedDevices: user.selectedDevices || [],
        doctors: user.doctors || [],
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = () =>{
    router.push("/changePassword");
  }

  const handlePhoneChange = (phone: string, countryData: any) => {
    setFormData({
      ...formData,
      phone,
      country: countryData?.country?.iso2 || "",
    });
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.drsId || !formData.practice) {
      setErrorMessage("All fields including 'Practice' are required.");
      return false;
    }
    if (!isValidPhoneNumber(formData.phone, formData.country || "BE")) {
      setErrorMessage("Invalid phone number. Please enter a valid number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
  
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user?.id,
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          jobTitle: formData.jobTitle,
          address: formData.address,
          town: formData.town,
          country: formData.country,
          phone: formData.phone,
          practice: formData.practice,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        dispatch({
          type: "LOGIN",
          payload: {
            ...user,
            ...data.user,
          },
        });
        setSuccessMessage("Profile updated successfully.");
      } else {
        setErrorMessage(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="profile" className="overflow-hidden py-16 md:py-20 lg:py-28">
    <div className="container my-7">
      <div className="flex flex-wrap">
        <div className="w-full px-4 lg:w-12/12 xl:w-12/12">
          <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
            <div className="flex justify-center">
              <h2 className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-4xl xl:text-4xl">
                Profile
              </h2>
            </div>
            {/* ✅ Display ADMIN RIGHTS if user is admin */}
            {user?.admin && (
              <div className="mb-16 text-center text-xl font-bold text-primary">
                ADMIN RIGHTS
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="-mx-4 flex flex-wrap">
                {[{ label: "User Name", name: "username" },
                  { label: "Email", name: "email", readOnly: true },
                  { label: "Drs ID", name: "drsId", readOnly: true },
                  { label: "Job Title", name: "jobTitle" },
                  { label: "First Name", name: "firstName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Practice", name: "practice" },
                  { label: "Address", name: "address" },
                  { label: "Town", name: "town" },
                  { label: "Country", name: "country" },
                  { label: "EMR Provider", name: "emrProvider", readOnly: true },
                ].map((field) => (
                  <div className="w-full px-4 md:w-1/2" key={field.name}>
                    <div className="mb-8">
                      <label className="mb-3 block text-2xl font-medium text-dark dark:text-white">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        name={field.name}
                        value={(formData[field.name as keyof typeof formData] as string) || ""}
                        onChange={handleChange}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-lg text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        {...(field.readOnly && { readOnly: true })}
                      />
                    </div>
                  </div>
                ))}

                {/* Phone Number Input */}
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label className="mb-3 block text-2xl font-medium text-dark dark:text-white">
                      Phone
                    </label>
                    <div className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3">
                      <PhoneInput
                        defaultCountry="be"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputStyle={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* ✅ Display Selected Devices */}
              {formData.selectedDevices.length > 0 && (
                <div className="mb-8">
                  <label className="mb-3 block text-2xl font-medium text-dark dark:text-white">
                    Selected Devices
                  </label>
                  <ul className="list-disc pl-6">
                    {formData.selectedDevices.map((device, index) => (
                      <li key={index} className="text-lg text-body-color dark:text-body-color-dark">
                        {device.manufacturer}: {device.device}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* ✅ Display Doctors */}
              {formData.doctors.length > 0 && (
                <div className="mb-8">
                  <label className="mb-3 block text-2xl font-medium text-dark dark:text-white">
                    Associated Doctors
                  </label>
                  <ul className="list-disc pl-6">
                    {formData.doctors.map((doctor, index) => (
                      <li key={index} className="text-lg text-body-color dark:text-body-color-dark">
                        {doctor.firstName} {doctor.lastName} (ID: {doctor.drsId}) - {doctor.email}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submit & Change Password Buttons */}
              <div className="flex justify-between w-full">
                <button type="submit" className="bg-primary px-8 py-3 text-white">
                  {isLoading ? "Updating..." : "Update Profile"}
                </button>
                <button onClick={changePassword} className="bg-primary px-8 py-3 text-white">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <AngleDecorations />
  </section>
  );
};

export default Profile;
