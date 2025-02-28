"use client";


const thirdPartyConfig = () => {
    
  return (
    <>
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28 mt-16">
        <div className="flex justify-center">
            <h2 className="mb-2 text-4xl font-bold text-black dark:text-white sm:text-4xl lg:text-4xl xl:text-4xl">
                Third Party
            </h2>
        </div>
        <div className="container flex justify-center">
            <p className="mb-2 text-lg font-bold text-black dark:text-white sm:text-xl lg:text-xl xl:text-xl">
                Below is a list of EMRs and Device Manufacturers for configuration purposes with Nexcore by Nexumed.
            </p>
        </div>
        <div className="container mb-8 w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="flex mt-16">
                <h2 className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-2xl lg:text-2xl xl:text-2xl">
                    EMR
                </h2>
            </div>
            <ul className="mt-2">
                <li>
                <a href="/docs/CareConnectConfigWithNexcore.pdf" download>
                    ⬇️ Care Connect Configuration Guide
                </a>
                </li>
            </ul>
        </div>
        <div className="container mb-8 w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="flex mt-16">
                <h2 className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-2xl lg:text-2xl xl:text-2xl">
                    Device Manufacturers
                </h2>
            </div>
            <ul className="mt-2">
                <li>
                <a href="/docs/Mesi configuration with Nexcore.pdf" download>
                    ⬇️ Mesi Configuration Guide
                </a>
                </li>
            </ul>
        </div>
      </section>
    </>
  );
};

export default thirdPartyConfig;