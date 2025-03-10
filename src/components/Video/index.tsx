"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";


const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="We are ready to help"
          paragraph="Let us help you the best way that anyone can."
          center
          mb="30px"
        />
        <div className="flex items-center justify-center">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="mx-auto max-w-[770px] overflow-hidden rounded-md"
                data-wow-delay=".15s"
              >
                <div className="relative aspect-[77/40] items-center justify-center">
                  <div className="relative w-[400px] h-[400px]">
                    <Image src="/images/video/carl.png" alt="video image" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
