import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";



const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Nexumed"
        description="Either contact us or subscribe to our future updates"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
