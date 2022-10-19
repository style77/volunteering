import { useState } from "react";

type Props = {
  text: any;
  message: string;
  children: React.ReactNode;
  className?: string;
};

export const Tooltip = ({ children, message }: Props) => {

  return (
    <>
        <div className="relative flex flex-col items-center group">
            {children}
            <div className="absolute bottom-36 flex flex-col items-center group-hover:opacity-100 opacity-0 transition cursor-default select-none">
                <span className="absolute w-32 h-20 z-10 p-2 text-xs text-white whitespace-no-wrap bg-main-color-2 shadow-lg rounded-md">{message}</span>
                <div className="w-3 h-3 mt-[4.5rem] absolute rotate-45 bg-main-color-2"></div>
            </div>
        </div>
    </>
  );
};

