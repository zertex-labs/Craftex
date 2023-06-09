"use client";

import { twMerge } from "tailwind-merge";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`h-fit w-full bg-neutral-900 rounded-lg border-2 px-5 py-4 border-neutral-800`, className)}>
      {children}
    </div>
  );
};

export default Container;