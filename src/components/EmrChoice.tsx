"use client";

import React, { useRef, useEffect, useState } from "react";

const emrProviders = ["CareConnect", "Sanday", "Cerner", "Emdeon", "Athenahealth"].sort();

const EmrChoice = ({ formData, setFormData }: { formData: any; setFormData: any }) => {
    const emrProviderDropdownRef = useRef<HTMLDetailsElement>(null);
    const [selectedProvider, setSelectedProvider] = useState<string>("Select EMR Provider");

    useEffect(() => {
        if (formData.emrProvider) {
            setSelectedProvider(formData.emrProvider); // Set default value from user data
        }
    }, [formData.emrProvider]); // Sync when formData updates

    const handleEmrProviderSelection = (provider: string) => {
        setFormData({ ...formData, emrProvider: provider });
        setSelectedProvider(provider);

        if (emrProviderDropdownRef.current) {
            emrProviderDropdownRef.current.removeAttribute("open");
        }
    };

    return (
        <div className="grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-4 flex items-center justify-center">
                <p className="text-lg font-semibold dark:text-white">EMR Provider</p>
            </div>
            <div className="col-span-8">
                <details className="relative border shadow-sm" ref={emrProviderDropdownRef}>
                    <summary className="cursor-pointer bg-gray-200 p-3 text-gray-700">
                        <span>{selectedProvider}</span>
                    </summary>
                    <ul className="absolute left-0 w-full bg-white border shadow-lg z-10">
                        {emrProviders.map((provider, index) => (
                            <li key={index} className="p-2 hover:bg-gray-100">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleEmrProviderSelection(provider);
                                }} className="block text-gray-700">
                                    {provider}
                                </a>
                            </li>
                        ))}
                    </ul>
                </details>
            </div>
        </div>
    );
};

export default EmrChoice;
