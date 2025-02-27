import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: "/images/features/drs.jpg",
    title: "Healthcare professionals",
    paragraph: {
      text: "Access patient information in real-time, streamline workflows, and enhance patient care with Nexumed’s healthcare integration platform.",
      list: [
        "Real-time access to patient data",
        "Simplified workflow integration",
        "Enhanced patient care coordination",
      ],
    },
  },
  {
    id: 2,
    icon: "/images/features/emr.jpg",
    title: "EMR providers",
    paragraph: {
      text: "Nexumed empowers EMR providers with a robust medical integration solution that connects your systems with medical devices, hospital networks, and other critical healthcare applications.",
      list: [
        "Seamless integration with medical devices",
        "Enhanced system interoperability",
        "Increased client satisfaction and retention",
      ],
    },
  },
  {
    id: 3,
    icon: "/images/features/equip.jpg",
    title: "Medical device producers",
    paragraph: {
      text: "Ensure your medical devices are seamlessly integrated into the healthcare ecosystem.",
      list: [
        "Seamless medical device integration with EMR providers",
        "Real-time data exchange",
        "Improved device performance and utility",
      ],
    },
  },
  {
    id: 4,
    icon: "/images/features/dist.jpg",
    title: "Distribution",
    paragraph: {
      text: "Are you interested in becoming a distributor?",
      list: [], // Empty list in case it's optional
    },
  },
];

export default featuresData;






  
