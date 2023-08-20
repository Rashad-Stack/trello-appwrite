"use client";
import { useBoardStore } from "@/store/boardStore";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {};

export default function TaskTypeRadioGroup({}: Props) {
  const { newTaskType, setNewTaskType } = useBoardStore((state) => state);

  return (
    <div className="w-full py-5">
      <div className="max-w-md w-full mx-auto">
        <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}>
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ checked, active }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  } ${
                    checked ? `${type.color} opacity-75 text-white` : "bg-white"
                  } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }>
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium ${
                              checked ? "text-white" : "text-slate-900"
                            }`}>
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="p"
                            className={`inline ${
                              checked ? "text-white" : "text-gray-500"
                            }`}>
                            {type.description}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {active && (
                        <div className="shrink-0 text-white">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task that needs to be done.",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A Task that currently being worked on.",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A Task that has been completed.",
    color: "bg-green-500",
  },
];
