"use client";

import React, { useRef, useEffect, useState } from "react";

// ✅ Define EMR providers with default settings
const emrProviders = [
  {
    name: "CareConnect",
    incomingFormat: "XML",
    outgoingFormat: "KMEHR XML",
    inputFolder: "C:\\Nexumed\\inFromDevice\\xml-output",
    outputFolder: "C:\\Nexumed\\nexumedIn",
  },
  {
    name: "Sanday",
    incomingFormat: "FHIR",
    outgoingFormat: "FHIR",
    inputFolder: "C:\\Nexumed\\inFromDevice\\xml-output",
    outputFolder: "C:\\Nexumed\\nexumedIn",
  },
  {
    name: "Cerner",
    incomingFormat: "XML",
    outgoingFormat: "XML",
    inputFolder: "C:\\Nexumed\\inFromDevice\\xml-output",
    outputFolder: "C:\\Nexumed\\nexumedIn",
  },
  {
    name: "Emdeon",
    incomingFormat: "XML",
    outgoingFormat: "XML",
    inputFolder: "C:\\Nexumed\\inFromDevice\\xml-output",
    outputFolder: "C:\\Nexumed\\nexumedIn",
  },
  {
    name: "Athenahealth",
    incomingFormat: "XML",
    outgoingFormat: "XML",
    inputFolder: "C:\\Nexumed\\inFromDevice\\xml-output",
    outputFolder: "C:\\Nexumed\\nexumedIn",
  }
].sort((a, b) => a.name.localeCompare(b.name)); // Sort by name

const EmrChoice = ({ formData, setFormData }: { formData: any; setFormData: any }) => {
  const emrProviderDropdownRef = useRef<HTMLDetailsElement>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("Select EMR Provider");

  useEffect(() => {
    if (formData.emrProviders && formData.emrProviders.length > 0) {
      setSelectedProvider(formData.emrProviders[0].name); // Set default from user data
    }
  }, [formData.emrProviders]);

  const handleEmrProviderSelection = (providerName: string) => {
    const selectedEmr = emrProviders.find((p) => p.name === providerName);

    if (selectedEmr) {
      setFormData({
        ...formData,
        emrProviders: [selectedEmr], // ✅ Store as an array for future scalability
      });
      setSelectedProvider(providerName);
    }

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
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEmrProviderSelection(provider.name);
                  }}
                  className="block text-gray-700"
                >
                  {provider.name}
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

