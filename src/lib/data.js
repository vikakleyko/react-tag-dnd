import Cover1 from "../assets/cover1.jpg";
import Cover2 from "../assets/cover2.jpg";
import { generateBookId, generateTagId } from "./utils";

export const tags = [
  {
    id: generateTagId(),
    title: "travel",
  },
  {
    id: generateTagId(),
    title: "sports",
  },
  {
    id: generateTagId(),
    title: "winter",
  },
  {
    id: generateTagId(),
    title: "spring",
  },
  {
    id: generateTagId(),
    title: "summer",
  },
  {
    id: generateTagId(),
    title: "autumn",
  },
];

export const books = [
  {
    id: generateBookId(),
    title: "Book 1",
    tags: [],
    img: Cover1,
  },
  {
    id: generateBookId(),
    title: "Book 2",
    tags: [],
    img: Cover2,
  },
];
