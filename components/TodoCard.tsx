import { useBoardStore } from "@/store/boardStore";
import getUrl from "@/utils/getUrl";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export default function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const { deleteTask } = useBoardStore((state) => state);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(
    function () {
      if (todo.image) {
        const fetchImage = async () => {
          const url = getUrl(todo.image!);
          if (url) {
            setImageUrl(url.toString());
          }
        };
        fetchImage();
      }
    },
    [todo]
  );

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}>
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => deleteTask(index, todo, id)}>
          <XCircleIcon className="ml-5 w-8 h-8" />
        </button>
      </div>
      {imageUrl && (
        <div className="w-full h-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task image"
            width={400}
            height={200}
            className="w-full object-cover rounded-b-md"
          />
        </div>
      )}
    </div>
  );
}
