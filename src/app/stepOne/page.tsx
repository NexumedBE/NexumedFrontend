"use client";

import React, { useEffect } from 'react';
import { useAuth } from "@/context/AuthContext"; 
import Image from "next/image";
import AngleDecorations from "@/components/Decorations/AngleDecorations/AngleDecorations";
import { useRouter } from "next/navigation";

const StepOne = () => {

    const router = useRouter();
 
    const { state } = useAuth();
    const { user } = state;


    console.log("Auth Context State:", state);
    console.log("User:", user);

    const handleNextStep = () => {
        router.push("/stepTwo"); 
      };

  
    return (
        <>
            <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
                <div className="container my-7">
                    <div className="flex flex-wrap">
                        <div className="w-full px-4 lg:w-12/12 xl:w-12/12">
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="w-1/2 flex items-center justify-center">
                                    <div>
                                        <p className="text-5xl font-bold dark:text-white my-12">
                                        Welcome, {user?.firstName || "Guest"}!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="flex flex-wrap justify-center my-12">
                                    <div className="w-1/2 flex items-center justify-center">
                                        <p className="text-3xl font-bold dark:text-white">
                                            As a first-time user, we will help you navigate the process of setting up your account.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-1/2 flex items-center justify-center my-12">
                                    <Image src="/images/logo/nexumed.png" alt="logo" width={80} height={50} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center my-12">
                        <button onClick={handleNextStep} className="rounded bg-primary px-8 py-3 text-white">
                            start
                        </button>
                    </div>
                </div>
                <AngleDecorations />
            </section>
        </>
    );
};

export default StepOne;
