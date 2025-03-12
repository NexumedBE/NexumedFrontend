"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext"; 
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeviceSelection from "../../components/DeviceSelection";
import EmrChoice from "../../components/EmrChoice";
import DrsManagement from "../../components/DrsManagement";
import AngleDecorations from "@/components/Decorations/AngleDecorations/AngleDecorations";

interface Doctor {
    firstName: string;
    lastName: string;
    drsId: string;
    email: string;
  }

const StepTwo = () => {
     const router = useRouter();
      const { state, dispatch } = useAuth();
      const { user, isAuthenticated } = state;
      const [isSubmitted, setIsSubmitted] = useState(false);
      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [deviceCountOrg, setDeviceCountOrg] = useState(0);
      const [doctorCountOrg, setDoctorCountOrg] = useState(0);
      const [deviceCountNew, setDeviceCountNew] = useState(0);
      const [doctorCountNew, setDoctorCountNew] = useState(0);
    
      const isSubmitDisabled = user?.current === true && user?.admin === false;
    
      // Centralized form data (Updated: Removed `deviceCompany`)
      const [formData, setFormData] = useState({
        emrProviders: [],
        selectedDevices: [],
        doctors: [],
      });
    
      useEffect(() => {
        if (!isAuthenticated) {
          router.push("/");
        }
      }, [isAuthenticated, router]);
    
      useEffect(() => {
        setDeviceCountNew(formData.selectedDevices.length);
      }, [formData.selectedDevices]);
    
      useEffect(() => {
        setDoctorCountNew(formData.doctors.length);
      }, [formData.doctors]);
    
      // Populate configuration form on login
      useEffect(() => {
        if (user) {
          console.log("Populating configuration form with:", user);
      
          setFormData({
            emrProviders: user.emrProviders || [],
            selectedDevices: user.selectedDevices ?? [],
            doctors: user.doctors ?? [], 
          });
      
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
           ...formData.doctors.filter((doc) => doc.drsId !== user.drsId),
           {
             firstName: user?.firstName || "",
             lastName: user?.lastName || "",
             drsId: user?.drsId || "",
             email: user?.email || "",
           },
         ];
   
         // ✅ Ensure selected devices have `deviceId` and `format`
         const updatedDevices = formData.selectedDevices.map((device) => ({
           manufacturer: device.manufacturer,
           device: device.device,
           deviceId: device.deviceId || `${device.manufacturer}-${device.device}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
           format: device.format || "GDT",
         }));
   
         const response = await fetch("http://localhost:5000/api/auth/update", {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
             id: user?.id,
             emrProviders: formData.emrProviders || [],
             selectedDevices: updatedDevices,
             doctors: updatedDoctors,
           }),
         });
   
         const data = await response.json();
   
         if (response.ok) {
           dispatch({
             type: "LOGIN",
             payload: {
               ...user,
               emrProviders: formData.emrProviders,
               selectedDevices: updatedDevices,
               doctors: updatedDoctors,
             },
           });
   
           setSuccessMessage("Configuration has successfully been submitted.");
           setIsSubmitted(true);
           if (deviceCountNew !== deviceCountOrg || doctorCountNew !== doctorCountOrg) {
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

  const handleNextStep = () => {
    router.push("/stepThree"); 
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
                          <DrsManagement 
                            loggedInDoctorId={user?.drsId} // ✅ Pass logged-in doctor's ID
                            users={formData.doctors} 
                            setUsers={(updatedDoctors: Doctor[]) => {
                              console.log("Updated doctors after removal:", updatedDoctors); // Debugging log
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                doctors: updatedDoctors,  // ✅ Correctly update the state
                              }));
                            }} 
                          />
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
                                disabled={isLoading || isSubmitDisabled || !user?.admin} 
                                className={`flex w-1/5 items-center justify-center p-3 text-base font-semibold text-white transition duration-300 ease-in-out 
                                ${user?.admin ? "bg-primary hover:bg-opacity-80 hover:shadow-signUp" : "bg-gray-400 cursor-not-allowed"}`}
                            >
                                {isLoading ? "Updating..." : "Submit"}
                            </button>
                            </div>
                            {isSubmitted && (
                                <div className="flex w-3/4 sm:w-2/3 md:w-1/3 lg:w-1/5 items-center justify-center p-3 text-base font-semibold text-white transition duration-300 ease-in-out mt-12">
                                    <button onClick={handleNextStep} className="rounded bg-primary px-8 py-3 text-white">
                                        Next
                                    </button>
                                </div>
                            )}
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

export default StepTwo;
