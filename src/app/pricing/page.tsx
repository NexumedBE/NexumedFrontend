
import Pricing from "@/components/Pricing";
import CircleBackground from "@/components/Decorations/CircleBackground/CircleBackground";



const AboutPage = () => {
  return (
    <>
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container mt-16">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <Pricing />
            <CircleBackground />
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutPage;