"use client";
import { useBoardStore } from "@/store/boardStore";
import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { clearScreenDown } from "readline";
import { finished } from "stream";

export default function Board() {
  const { getBoard, board, setBoardState, updateTodoInDb } = useBoardStore(
    (state) => state
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    //  Check if user dragged the card outside of the column
    if (!destination) return;

    //   Handling the column drag
    if (type === "columns") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }

    //  This step needed as the indexes are sorted as numbers 0,1,2 etc. instead of ids with DND Library
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };
    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;
    if ((source.index && destination.index) || startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [moveTodo] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      //  Same column task drag
      newTodos.splice(destination.index, 0, moveTodo);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...Board, columns: newColumns });
    } else {
      //  Dragging to another column
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, moveTodo);
      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      updateTodoInDb(moveTodo, finishCol.id);

      setBoardState({ ...Board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="columns">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
