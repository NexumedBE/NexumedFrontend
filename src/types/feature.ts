export type Feature = {
  id: number;
  icon: string; // Image path as a string
  title: string;
  paragraph: {
    text: string; // Main paragraph text
    list?: string[]; // Optional list of items
  };
};