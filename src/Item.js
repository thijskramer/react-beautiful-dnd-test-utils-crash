import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from './Card';

export function Item({ item, index }) {
  return (
    <Draggable draggableId={`media_${item.pk}`} index={index}>
      {(provided) => {
        return (
          <Card
            title={item.title}
            ref={provided.innerRef}
            dragHandleProps={provided.dragHandleProps}
            {...provided.draggableProps}
          />
        );
      }}
    </Draggable>
  );
}
