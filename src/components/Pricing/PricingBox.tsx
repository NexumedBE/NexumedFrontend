"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PricingBox = (props: {
  price: string;
  duration: string;
  packageName: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  const { price, duration, packageName, subtitle, children } = props;
  const router = useRouter();

  const [deviceCount, setDeviceCount] = useState<number>(0);

  const handleActivateClick = () => {
    const totalAmount = Number(price) * 100 + deviceCount * 1000; // Price in cents, 10€ per device

    router.push(
      `/checkout?packageName=${encodeURIComponent(packageName)}&amount=${totalAmount}&devices=${deviceCount}&price=${price}`
    );
  };

  return (
    <div className="w-full">
      <div className="relative z-10 rounded-sm bg-white px-8 py-10 shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two dark:hover:shadow-gray-dark">
        <div className="flex items-center justify-between">
          <h3 className="price mb-2 text-[32px] font-bold text-black dark:text-white">
            $<span className="amount">{price}</span>
            <span className="time text-lg font-medium text-body-color">/{duration}</span>
          </h3>
          <h4 className="mb-2 text-xl font-bold text-dark dark:text-white">{packageName}</h4>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="deviceCount" className="text-sm font-medium text-body-color dark:text-white">
            Add Devices, 10 &euro; per device/month.
          </label>
          <input
            id="deviceCount"
            type="number"
            min="0"
            placeholder="0"
            value={deviceCount === 0 ? "" : deviceCount} 
            onFocus={() => deviceCount === 0 && setDeviceCount(undefined)}
            onChange={(e) => {
              const value = e.target.value;
              setDeviceCount(value === "" ? 0 : parseInt(value, 10) || 0);
            }}
            className="my-2 w-10 rounded-sm px-2 py-1 text-center text-primary dark:bg-gray-800 dark:primary focus:border-primary focus:ring-primary appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield"
          />
        </div>

        <p className="mb-7 text-base text-body-color">{subtitle}</p>

        <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
          <button
            onClick={handleActivateClick}
            className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
          >
            Activate
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PricingBox;
