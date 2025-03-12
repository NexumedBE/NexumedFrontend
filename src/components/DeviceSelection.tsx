"use client";

import React, { useRef, useState, useEffect } from "react";

// ✅ Define manufacturers and their devices
const deviceManufacturers: Record<string, string[]> = {
  BAXTER: ["BP", "TEMP", "ECG"],
  MENDY: ["X-Ray", "MRI", "Ultrasound"],
  MESI: ["ECG", "Spiro", "BP", "SPO2", "Temp"],
  MIR: ["ESI", "Spiro"],
  MORTARA: ["Blood Pressure", "EKG", "ECG"],
  SCHILLER: ["ECG", "Blood Pressure", "Holter"],
};

// ✅ Define file formats for each manufacturer
const deviceFormatMapping: Record<string, string> = {
  BAXTER: "HL7",
  MESI: "Mesi GDT",
  MIR: "XML",
  MENDY: "FIHR",
  MORTARA: "HL7",
  SCHILLER: "FIHR",
};

interface SelectedDevice {
  manufacturer: string;
  device: string;
  deviceId: string;
  format: string;
}

const DeviceSelection = ({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) => {
  const deviceDropdownRef = useRef<HTMLDetailsElement>(null);
  const deviceListDropdownRef = useRef<HTMLDetailsElement>(null);

  const [selectedDevices, setSelectedDevices] = useState<SelectedDevice[]>([]);

  // ✅ Load selected devices from formData
  useEffect(() => {
    if (formData.selectedDevices && formData.selectedDevices.length > 0) {
      setSelectedDevices(formData.selectedDevices);
    }
  }, [formData.selectedDevices]);

  // ✅ Update formData when selectedDevices change
  useEffect(() => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      selectedDevices,
    }));
  }, [selectedDevices, setFormData]);

  const handleDeviceSelection = (manufacturer: string, device: string) => {
    setSelectedDevices((prevDevices) => {
      const isAlreadySelected = prevDevices.some(
        (d) => d.device === device && d.manufacturer === manufacturer
      );

      // ✅ Assign the correct format based on the manufacturer
      const deviceFormat = deviceFormatMapping[manufacturer] || "UNKNOWN";

      // If device is already selected, remove it; otherwise, add it
      const updatedDevices = isAlreadySelected
        ? prevDevices.filter((d) => !(d.device === device && d.manufacturer === manufacturer))
        : [
            ...prevDevices,
            {
              manufacturer,
              device,
              deviceId: `${manufacturer}-${device}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, // ✅ Manufacturer + Device + Unique ID
              format: deviceFormat, // ✅ Assign correct format
            },
          ];

      return updatedDevices;
    });
  };

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
          <p className="text-lg font-semibold dark:text-white">Device Manufacturer</p>
        </div>
        <div className="col-span-8">
          <details className="relative border shadow-sm" ref={deviceDropdownRef}>
            <summary className="cursor-pointer bg-gray-200 p-3 text-gray-700">
              <span>{formData.manufacturer || "Select Device Company"}</span>
            </summary>
            <ul className="absolute left-0 w-full bg-white border shadow-lg z-10">
              {Object.keys(deviceManufacturers).map((manufacturer, index) => (
                <li key={index} className="p-2 hover:bg-gray-100">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prev) => ({ ...prev, manufacturer }));

                      // ✅ Close dropdown after selection
                      setTimeout(() => {
                        deviceDropdownRef.current?.removeAttribute("open");
                      }, 100);
                    }}
                    className="block text-gray-700"
                  >
                    {manufacturer}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>

      {/* Device Selection */}
      {formData.manufacturer && (
        <div className="grid grid-cols-12 gap-4 mt-6">
          <div className="col-span-4 flex items-center justify-center">
            <p className="text-lg font-semibold dark:text-white">{formData.manufacturer} Devices</p>
          </div>
          <div className="col-span-8">
            <details className="relative border shadow-sm" ref={deviceListDropdownRef}>
              <summary className="cursor-pointer bg-gray-200 p-3 text-gray-700">
                <span>Select Devices</span>
              </summary>
              <div className="absolute left-0 w-full bg-white border shadow-lg z-10 p-4">
                {deviceManufacturers[formData.manufacturer]?.map((device, index) => (
                  <label key={index} className="flex items-center gap-2 p-2 hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={selectedDevices.some(
                        (d) => d.device === device && d.manufacturer === formData.manufacturer
                      )}
                      onChange={() => handleDeviceSelection(formData.manufacturer, device)}
                      className="accent-primary"
                    />
                    <span className="text-gray-700">{device}</span>
                  </label>
                ))}
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
                    <span>{deviceObj.device} (ID: {deviceObj.deviceId}, Format: {deviceObj.format})</span>
                  </span>
                  <button
                    type="button"
                    className="px-2"
                    onClick={() => handleDeviceSelection(deviceObj.manufacturer, deviceObj.device)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default DeviceSelection;

