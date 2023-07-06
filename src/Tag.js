import { Draggable, Droppable } from "react-beautiful-dnd";
import "./styles.css";

export default function Tag({ tag, index }) {
  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "#868E97" : "#E1E4E7",
    color: isDragging ? "#FFFFFF" : "#6F757A",
    boxShadow: isDragging ? "0px 0px 6px #868E97" : "",
    ...draggableStyle,
  });

  return (
    <Droppable droppableId={tag.id} isDropDisabled={true}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Draggable key={tag.id} draggableId={tag.id} index={index}>
            {(provided, snapshot) => (
              <>
                <div
                  className="Tag"
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  {tag.title}
                </div>
                {snapshot.isDragging && (
                  <div className="CopyTag">{tag.title}</div>
                )}
              </>
            )}
          </Draggable>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
