"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeviceSelection from "../../components/DeviceSelection";
import EmrChoice from "../../components/EmrChoice";
import DrsManagement from "../../components/DrsManagement";
import AngleDecorations from "@/components/Decorations/AngleDecorations/AngleDecorations";

const Configuration = () => {
  const router = useRouter();
  const { state, dispatch } = useAuth();
  const { user, isAuthenticated } = state;

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deviceCountOrg, setDeviceCountOrg] = useState(0);
  const [doctorCountOrg, setDoctorCountOrg] = useState(0);
  const [deviceCountNew, setDeviceCountNew] = useState(0);
  const [doctorCountNew, setDoctorCountNew] = useState(0);

  const isSubmitDisabled = user?.current === true && user?.admin === false;

  // Centralized form data
  const [formData, setFormData] = useState({
    deviceCompany: "",
    emrProvider: "",
    selectedDevices: [],
    doctors: [], 
  });
  

  // Centralized state for doctors list
  const [users, setUsers] = useState<
    { firstName: string; lastName: string; drsId: string; email: string }[]
  >([]);

  // Redirect user if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setDeviceCountNew(formData.selectedDevices.length);
  }, [formData.selectedDevices]);
  
  useEffect(() => {
    setDoctorCountNew(users.length);
  }, [users]);

  // Populate configuration form on login
  useEffect(() => {
    if (user) {
      console.log("Populating configuration form with:", user);

      setFormData({
        deviceCompany: user.deviceCompany || "",
        emrProvider: user.emrProvider || "",
        selectedDevices: user.selectedDevices ?? [],
      });

      setUsers(user.doctors ?? []);

      setDeviceCountOrg(user.selectedDevices?.length || 0);
      setDoctorCountOrg(user.doctors?.length || 0);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setSuccessMessage("");
    setErrorMessage("");
    setIsLoading(true);
  
    try {
      // Prevent duplicate doctor entries
      const updatedDoctors = [
        ...users.filter((doc) => doc.drsId !== user.drsId),
        {
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          drsId: user?.drsId || "",
          email: user?.email || "",
        },
      ];
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user?.id,
          ...formData,
          doctors: updatedDoctors,
          selectedDevices: formData.selectedDevices || [],
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        dispatch({
          type: "LOGIN",
          payload: {
            ...user,
            ...formData,
            doctors: updatedDoctors,
            selectedDevices: formData.selectedDevices,
          },
        });
  
        setSuccessMessage("Configuration has successfully been submitted.");
  
        // Check if the counts have changed
        if (
          deviceCountNew !== deviceCountOrg ||
          doctorCountNew !== doctorCountOrg 
        ) {
          router.push("/subscription"); 
        }
      } else {
        setErrorMessage(data.message || "Failed to update configuration.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage("An error occurred while updating the configuration.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container my-7">
          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-12/12 xl:w-12/12">
              <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                {user?.admin && (
                <div className="mb-4 text-center text-xl font-bold text-primary">
                  ADMIN RIGHTS
                </div>
                )}
                <div className="flex flex-wrap">
                  <div className="w-1/2 flex items-center justify-center">
                    <p className="text-2xl font-bold dark:text-white">
                      Connect Your Medical Worlds With Nexumed
                    </p>
                  </div>
                  <div className="w-1/2 flex items-center justify-center">
                    <Image
                      src="/images/logo/nexumed.png"
                      alt="logo"
                      width={80}
                      height={50}
                    />
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* Pass formData & setFormData as props */}
                    <p className="text-right text-l mt-8">From the dropdown, select your EMR</p>
                    <EmrChoice formData={formData} setFormData={setFormData} />
                    <p className="text-right text-l mt-8">From the dropdown, select the manufacturer and the device for each piece of equipment</p>
                    <DeviceSelection formData={formData} setFormData={setFormData} />
                    <p className="text-right text-l mt-8">Click fields to add doctors</p>
                    <DrsManagement users={users} setUsers={setUsers} formData={formData} setFormData={setFormData} />
                  {/* Success/Error Messages */}
                  {successMessage && (
                    <div className="mb-4 mt-6 text-center text-sm font-medium text-primary">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="mb-4 mt-6 text-center text-sm font-medium text-red-600">
                      {errorMessage}
                    </div>
                  )}
                <div className="flex justify-center mt-20">
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitDisabled || !user?.admin} // Also disable if user.admin is false
                    className={`flex w-1/5 items-center justify-center p-3 text-base font-semibold text-white transition duration-300 ease-in-out 
                      ${user?.admin ? "bg-primary hover:bg-opacity-80 hover:shadow-signUp" : "bg-gray-400 cursor-not-allowed"}`}
                  >
                    {isLoading ? "Updating..." : "Submit"}
                  </button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <AngleDecorations />
      </section>
    </>
  );
};

export default Configuration;




