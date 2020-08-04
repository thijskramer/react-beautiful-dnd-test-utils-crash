import React, { useState } from "react";
import { Item } from "./Item";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export function Container({
  initialMedia = [],
}) {
  const [media, setMedia] = useState(initialMedia);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const mediaOrdered = reorder(
      media,
      result.source.index,
      result.destination.index
    );

    setMedia(mediaOrdered);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="fileupload-container">
        <Droppable droppableId="media">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="list-group"
            >
              {media.map((item, index) => (
                <Item key={item.pk} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
