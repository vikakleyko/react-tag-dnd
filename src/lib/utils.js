import { v4 as uuidv4 } from "uuid";

export const generateTagId = () => {
  return `tag-${uuidv4()}`;
};

export const generateBookId = () => {
  return `book-${uuidv4()}`;
};
