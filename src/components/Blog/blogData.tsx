import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "HL7",
    paragraph:
      "Latest updates with HL7.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Tiffani Theissen",
      image: "/images/blog/author-01.png",
      designation: "Heath Today",
    },
    tags: ["Industry"],
    publishDate: "2024",
  },
  {
    id: 2,
    title: "FIHR",
    paragraph:
      "Latest and greatest updates with FIHR.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Ryan Gosling",
      image: "/images/blog/author-02.png",
      designation: "Content Writer",
    },
    tags: ["Industry"],
    publishDate: "2024",
  },
  {
    id: 3,
    title: "Tips to live a long life.",
    paragraph:
      "Basic tips so you do not die.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Ryan Reynolds",
      image: "/images/blog/author-03.png",
      designation: "Heath",
    },
    tags: ["Medical"],
    publishDate: "2024",
  },
];
export default blogData;
