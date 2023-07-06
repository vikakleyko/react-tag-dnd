import { Draggable, Droppable } from "react-beautiful-dnd";
import "./styles.css";

export default function Book({ book, index, isDraggingTag }) {
  const getBackgroundColor = (isDraggingOver) => {
    if (isDraggingOver) {
      return "rgba(249, 167, 2, 0.1)";
    }
    if (isDraggingTag) {
      return "rgba(210, 227, 233, 0.5)";
    } else {
      return "#FFFFFF";
    }
  };

  const getBorderStyle = (isDraggingOver) => {
    if (isDraggingOver) {
      return "1pt solid #F9A702";
    }
    if (isDraggingTag) {
      return "1pt dashed #187F9A";
    } else {
      return "1px solid lightgrey";
    }
  };

  const getItemStyle = (isDraggingOver) => ({
    backgroundColor: getBackgroundColor(isDraggingOver),
    border: getBorderStyle(isDraggingOver),
    borderRadius: "12px",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "20px",
    padding: "12px",
  });

  return (
    <div className="BookContainer">
      <img src={book.img} alt="Book Cover" className="Book" />
      <Droppable droppableId={book.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getItemStyle(snapshot.isDraggingOver)}
          >
            {book.tags.length === 0 && (
              <div className="AssignAreaText">Drop tags here</div>
            )}
            {book.tags.map((tag, index) => (
              <Draggable key={tag.id} draggableId={tag.id} index={index}>
                {(provided) => (
                  <>
                    <div
                      className="AssignedTag"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {tag.title}
                    </div>
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
