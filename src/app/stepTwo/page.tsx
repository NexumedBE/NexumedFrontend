"use client";

import React, { useState, useEffect } from 'react';
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
    const [isSubmitted, setIsSubmitted] = useState(false);
    // Centralized form data
    const [formData, setFormData] = useState({
        deviceCompany: "",
        emrProvider: "",
        selectedDevices: [],
    });

    // Centralized state for doctors list
    const [users, setUsers] = useState<{ firstName: string; lastName: string; drsId: string; email: string }[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (user) {
            console.log("Populating profile form with:", user);
            setFormData({
                deviceCompany: user.deviceCompany || "",
                emrProvider: user.emrProvider || "",
                selectedDevices: user.selectedDevices ?? [], 
            });
        }
    }, [user]);

   const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();
     
         setSuccessMessage("");
         setErrorMessage("");
         setIsLoading(true);
     
         try {
             const updatedDoctors = [
                 ...users, 
                 {
                     firstName: user?.firstName || "",
                     lastName: user?.lastName || "",
                     drsId: user?.drsId || "", 
                     email: user?.email || "",
                 },
             ];
     
             const response = await fetch("http://localhost:5000/api/auth/update", {
                 method: "PUT",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ id: user?.id, ...formData, doctors: updatedDoctors }),
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
                 setIsSubmitted(true);
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
                                <div className="flex flex-wrap">
                                    <div className="w-1/2 flex items-center justify-center">
                                        <p className="text-2xl font-bold dark:text-white">Connect Your Medical Worlds With Nexumed</p>
                                    </div>
                                    <div className="w-1/2 flex items-center justify-center">
                                        <Image src="/images/logo/nexumed.png" alt="logo" width={80} height={50} />
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
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="rounded bg-primary mt-20 px-8 py-3 text-white hover:bg-primary-dark transition duration-300"
                                        >
                                            {isLoading ? "Updating..." : "Submit"}
                                        </button>
                                    </div>
                                    {isSubmitted && (
                                        <div className="flex flex-wrap justify-center my-12">
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

export default Configuration;
