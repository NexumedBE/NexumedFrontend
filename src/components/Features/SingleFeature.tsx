import { Feature } from "@/types/feature";
import Image from "next/image";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;

  return (
    <div className="w-full mb-[50px]">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-10 flex w-full items-center justify-center">
          <div className="mb-10 flex w-[300px] h-[300px] items-center justify-center bg-opacity-10">
            <Image
              src={icon}
              alt={title}
              width={350}
              height={350}
              className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[300px] rounded-full shadow-[0_8px_35px_#00adb5] ring-[1px] ring-[#00adb5]"
            />
          </div>
        </div>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph.text}
        </p>
        {paragraph.list && paragraph.list.length > 0 && (
          <ul className="list-disc ml-5 mt-5">
            {paragraph.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SingleFeature;


