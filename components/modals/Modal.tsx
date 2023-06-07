"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

export interface ModalProps {
  description?: string;
  title?: string;

  isOpen: boolean;
  onChange: (open: boolean) => void;
  
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className="
            fixed 
            drop-shadow-md 
            text-white
            top-[50%] 
            left-[50%] 
            max-h-full 
            h-full 
            md:h-auto 
            md:max-h-[85vh] 
            w-full 
            md:w-[90vw] 
            md:max-w-[450px] 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-md 
            bg-neutral-900 
            p-6
            focus:outline-none
          "
        >
          {title && (
            <Dialog.Title className="mb-2 text-xl font-bold text-center ">
              {title}
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="mb-5 text-sm leading-normal text-center text-gray-400">
              {description}
            </Dialog.Description>
          )}
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
                text-neutral-400 
                hover:text-sky-400 
                absolute 
                top-[10px] 
                right-[10px] 
                appearance-none 
                rounded-full 
                focus:outline-none
              "
              aria-label="Close"
            >
              <IoMdClose size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
