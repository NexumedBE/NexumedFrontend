"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import SectionTitle from "@/components/Common/SectionTitle";
import CircleBackground from "@/components/Decorations/CircleBackground/CircleBackground";
import OfferList from "@/components/Pricing/OfferList";

const StepThree = () => {
  const router = useRouter();
  const { state } = useAuth();
  const { user, isAuthenticated } = state;

 
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);


  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  const totalDoctors = user?.doctors?.length || 0;
  const totalDevices = user?.selectedDevices?.length || 0;

  // Pricing Calculation Function
  const calculatePricing = (doctors: number, devices: number) => {
    const basePrice = 36;
    const additionalDoctors = Math.max(doctors - 1, 0) * 24;
    const additionalDevices = Math.max(devices - 3, 0) * 7;

    return basePrice + additionalDoctors + additionalDevices;
  };

  const monthlyPrice = calculatePricing(totalDoctors, totalDevices);

  const handleActivateClick = () => {
    const totalAmount = monthlyPrice * 100;

    router.push(
      `/checkout?packageName=${encodeURIComponent(user?.practice || "Unknown")}&amount=${totalAmount}&devices=${totalDevices}&price=${monthlyPrice}`
    );
  };

  return (
    <>
      <section id="stepThree" className="overflow-hidden py-16 md:py-20 lg:py-28 mt-14">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="With the Configuration selected."
          center
          width="665px"
        />
        <div className="relative z-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto rounded-sm bg-white px-8 py-10 shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two dark:hover:shadow-gray-dark">
          <div className="mx-auto">
            <div>
              <p className="text-5xl font-bold dark:text-white mb-10 text-center">
                Practice Name: <span className="ml-2">{user?.practice || "Unknown"}</span>
              </p>
              <hr className="w-3/5 mx-auto border-t border-primary mt-4" />

              {/* Display Doctors */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold dark:text-white mb-2">Additional Doctors:</h3>
                <ul>
                  {user?.doctors?.length > 0 ? (
                    user?.doctors.map((doctor, index) => (
                      <li key={doctor?.drsId || index} className="text-lg">
                        {doctor?.firstName} {doctor?.lastName}
                      </li>
                    ))
                  ) : (
                    <li>No doctors found</li>
                  )}
                </ul>
                <h3 className="text-xl font-semibold dark:text-white mt-2 mb-2">
                  Total number of doctors licensed for Nexcore:
                </h3>
                <p className="text-lg">{totalDoctors}</p>
              </div>

              <hr className="w-3/5 mx-auto border-t border-primary mt-4" />

              {/* Display Selected Devices */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold dark:text-white mb-2">Devices:</h3>
                <ul className="list-disc list-inside">
                  {user?.selectedDevices?.length > 0 ? (
                    user.selectedDevices.map((device, index) => (
                      <li key={index} className="text-lg">
                        {device.manufacturer} - {device.device}
                      </li>
                    ))
                  ) : (
                    <li>No devices found</li>
                  )}
                </ul>
                <h3 className="text-xl font-semibold dark:text-white mt-4">
                  Total number of devices:
                </h3>
                <p className="text-lg">{totalDevices}</p>
              </div>

              <hr className="w-3/5 mx-auto border-t border-primary mt-4" />
              <div className="w-full flex justify-center mt-6">
                <div>
                  <OfferList text="Unlimited Use" status="active" />
                  <OfferList text="Customer Support" status="active" />
                  <OfferList text="Free Updates" status="active" />
                </div>
              </div>
              {/* Display Monthly Price */}
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-semibold dark:text-white">Monthly Subscription Cost</h3>
                <p className="text-3xl font-bold text-primary mt-2">€{monthlyPrice}/month</p>
              </div>
            </div>
            <div className="mb-8 mt-6 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
              <button
                onClick={handleActivateClick}
                className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
              >
                Activate
              </button>
            </div>
          </div>
        </div>

        <CircleBackground />
      </section>
    </>
  );
};

export default StepThree;
