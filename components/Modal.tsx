"use client";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/boardStore";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { FormEvent, Fragment, useRef } from "react";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";

type Props = {};

export default function Modal({}: Props) {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const { isOpen, closeModal } = useModalStore((state) => state);
  const {
    addTask,
    newTaskInput,
    setNewTaskInput,
    image,
    setImage,
    newTaskType,
  } = useBoardStore((state) => state);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTaskInput) return;

    // Add task
    addTask(newTaskInput, newTaskType, image);

    setImage(null);
    closeModal();
  }

  return (
    // Use the `Transition` component at the root level
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-10"
        onClose={closeModal}
        onSubmit={handleSubmit}>
        {/*
            Use one Transition.Child to apply one transition to the backdrop...
          */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 bg-opacity-25" />
        </Transition.Child>

        {/*
            ...and another Transition.Child to apply a separate transition
            to the contents.
          */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full justify-center items-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2">
                  Add a task
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="input a task here..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>
                {/* Task type radio group */}
                <TaskTypeRadioGroup />

                <div className="mt-2">
                  <button
                    type="button"
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      imagePickerRef.current?.click();
                    }}>
                    <PhotoIcon className="w-6 h-6 mr-2 inline-block" />
                    Upload image
                  </button>
                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      width={200}
                      height={200}
                      alt="Uploaded image"
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  )}
                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files?.[0].type.startsWith("image/"))
                        return;
                      setImage(e.target.files?.[0]);
                    }}
                  />
                  <div className="mt-4">
                    <button
                      disabled={!newTaskInput}
                      className="inline-flex justify-center rounded-md border border-transparent text-blue-900 bg-blue-100 hover:bg-blue-200 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed">
                      Add task
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
