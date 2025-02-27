"use client";

import React, { useRef, useState, useEffect } from "react";

const deviceCompaniesWithDevices: Record<string, string[]> = {
  MENDY: ["X-Ray", "MRI", "Ultrasound"],
  MESI: ["ECG", "Spiro", "BP", "SPO2", "Temp"],
  MIR: ["ESI", "Spiro"],
  MORTARA: ["Blood Pressure", "EKG", "ECG"],
  SCHILLER: ["ECG", "Blood Pressure", "Holter"],
};

interface SelectedDevice {
  manufacturer: string;
  device: string;
}

const DeviceSelection = ({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) => {
  const deviceCompanyDropdownRef = useRef<HTMLDetailsElement>(null);
  const deviceListDropdownRef = useRef<HTMLDetailsElement>(null);

  // Step 1: Initialize selectedDevices from formData if available
  const [selectedDevices, setSelectedDevices] = useState<SelectedDevice[]>([]);

  useEffect(() => {
    console.log("Initial formData.selectedDevices:", formData.selectedDevices);
    if (formData.selectedDevices && formData.selectedDevices.length > 0) {
      setSelectedDevices(formData.selectedDevices);
    }
  }, [formData.selectedDevices]); // Sync when formData updates

  // Step 2: Log selectedDevices when it changes
  useEffect(() => {
    console.log("Updated selectedDevices:", selectedDevices);
  }, [selectedDevices]);

  const handleDeviceCompanySelection = (company: string) => {
    setFormData({ ...formData, deviceCompany: company });

    // Reset selected devices when switching manufacturers
    setSelectedDevices(selectedDevices.filter((d) => d.manufacturer !== company));

    if (deviceCompanyDropdownRef.current) {
      deviceCompanyDropdownRef.current.removeAttribute("open");
    }
  };

  const handleDeviceCheckboxChange = (manufacturer: string, device: string) => {
    setSelectedDevices((prevDevices) => {
      const isAlreadySelected = prevDevices.some(
        (d) => d.device === device && d.manufacturer === manufacturer
      );

      const updatedDevices = isAlreadySelected
        ? prevDevices.filter((d) => !(d.device === device && d.manufacturer === manufacturer))
        : [...prevDevices, { manufacturer, device }];

      setFormData({ ...formData, selectedDevices: updatedDevices });
      return updatedDevices;
    });
  };

  useEffect(() => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      selectedDevices,
    }));
  }, [selectedDevices, setFormData]);

  const closeDropdown = () => {
    if (deviceListDropdownRef.current) {
      deviceListDropdownRef.current.removeAttribute("open");
    }
  };

  return (
    <>
      {/* Device Manufacturer Selection */}
      <div className="grid grid-cols-12 gap-4 mt-2">
        <div className="col-span-4 flex items-center justify-center">
          <p className="text-lg font-semibold dark:text-white">Device Company</p>
        </div>
        <div className="col-span-8">
          <details className="relative border shadow-sm" ref={deviceCompanyDropdownRef}>
            <summary className="cursor-pointer bg-gray-200 p-3 text-gray-700">
              <span>{formData.deviceCompany || "Select Device Company"}</span>
            </summary>
            <ul className="absolute left-0 w-full bg-white border shadow-lg z-10">
              {Object.keys(deviceCompaniesWithDevices).map((company, index) => (
                <li key={index} className="p-2 hover:bg-gray-100">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeviceCompanySelection(company);
                    }}
                    className="block text-gray-700"
                  >
                    {company}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>

      {/* Device Selection Based on Manufacturer */}
      {formData.deviceCompany && (
        <div className="grid grid-cols-12 gap-4 mt-6">
          <div className="col-span-4 flex items-center justify-center">
            <p className="text-lg font-semibold dark:text-white">{formData.deviceCompany} Devices</p>
          </div>
          <div className="col-span-8">
            <details className="relative border shadow-sm" ref={deviceListDropdownRef}>
              <summary className="cursor-pointer bg-gray-200 p-3 text-gray-700">
                <span>Select Devices</span>
              </summary>
              <div className="absolute left-0 w-full bg-white border shadow-lg z-10 p-4">
                {formData.deviceCompany ? (
                  deviceCompaniesWithDevices[formData.deviceCompany]?.map((device, index) => (
                    <label key={index} className="flex items-center gap-2 p-2 hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedDevices.some(
                          (d) => d.device === device && d.manufacturer === formData.deviceCompany
                        )}
                        onChange={() => handleDeviceCheckboxChange(formData.deviceCompany, device)}
                        className="accent-primary"
                      />
                      <span className="text-gray-700">{device}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500">Please select a device company first.</p>
                )}
                <button
                  type="button"
                  onClick={closeDropdown}
                  className="w-full mt-2 bg-primary text-white py-2 rounded hover:bg-primary-dark"
                >
                  Done
                </button>
              </div>
            </details>
          </div>
        </div>
      )}

      {/* Selected Devices List */}
      {selectedDevices.length > 0 ? (
        <div className="mt-6 flex justify-center">
          <div className="text-center w-full max-w-md">
            <p className="text-lg font-semibold dark:text-white">Selected Devices:</p>
            <div className="flex flex-col gap-2 mt-2 items-center w-full">
              {selectedDevices.map((deviceObj, index) => (
                <div 
                  key={index} 
                  className="mt-2 bg-primary text-white px-4 py-2 text-sm flex justify-between w-full"
                >
                  <span className="flex-1 text-center">
                    <span className="text-black font-semibold mr-4">
                      {deviceObj.manufacturer}:
                    </span>{" "}
                    <span>{deviceObj.device}</span>
                  </span>
                  <button
                    type="button"
                    className="px-2"
                    onClick={() => handleDeviceCheckboxChange(deviceObj.manufacturer, deviceObj.device)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No devices selected.</p>
      )}
    </>
  );
};

export default DeviceSelection;
