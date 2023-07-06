import "./styles.css";
import Book from "./Book";
import Tag from "./Tag";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import { books, tags } from "./lib/data";
import { generateTagId } from "./lib/utils";

export default function App() {
  const [allBooks, setAllBooks] = useState(books);
  const [isDraggingTag, setIsDraggingTag] = useState(false);

  const onDragStart = () => {
    setIsDraggingTag(true);
  };

  const onDragEnd = (result) => {
    setIsDraggingTag(false);

    const { source, destination } = result;

    // prevent dragging tag from one book to another, drag tag only from the list
    if (
      destination &&
      destination.droppableId.includes("book") &&
      source.droppableId.includes("book")
    )
      return;

    if (result.destination) {
      // new tag dropped into the drop area
      const draggedTag = tags[source.index];
      const updatedBook = allBooks.find(
        (book) => book.id === destination.droppableId
      );

      const isTagExist = updatedBook.tags.find(
        (item) => item.title === draggedTag.title
      );

      // add tag if does not exist
      if (!isTagExist) {
        // create new tag object
        const copyTag = { id: generateTagId(), title: draggedTag.title };

        const updatedBooks = allBooks.map((book) => {
          if (book.id === updatedBook.id) {
            return {
              ...book,
              tags: [...updatedBook.tags, copyTag],
            };
          }
          return book;
        });
        setAllBooks(updatedBooks);
      }
    } else {
      // tag dropped outside of the drop area

      // check if any book object was changed
      const updatedBook = allBooks.find(
        (book) => book.id === source.droppableId
      );
      if (updatedBook) {
        // tag removed from drop book area
        const removedTag = updatedBook.tags.find(
          (tag) => result.draggableId === tag.id
        );

        const updatedBooks = allBooks.map((book) => {
          const updatedTags = updatedBook.tags.filter(
            (tag) => tag.title !== removedTag.title
          );
          if (book.id === updatedBook.id) {
            return {
              ...book,
              tags: [...updatedTags],
            };
          }
          return book;
        });
        setAllBooks(updatedBooks);
      }
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="TagsContainer">
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag} index={index} />
          ))}
        </div>
        <div className="BooksContainer">
          {allBooks.map((book, index) => (
            <Book
              key={index}
              book={book}
              index={index}
              isDraggingTag={isDraggingTag}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
