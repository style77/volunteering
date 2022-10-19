/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "react"

type Props = {
  text: string;
  message: string;
  children: ReactNode;
  className?: string;
};

export const Tooltip = ({ children, message }: Props) => {
  return (
    <>
      <div className="relative flex flex-col items-center group">
        {children}
        <div className="absolute bottom-36 flex flex-col items-center group-hover:opacity-100 opacity-0 transition cursor-default select-none">
          <span className="absolute w-48 z-10 px-2 py-1 text-sm text-white whitespace-no-wrap bg-main-color-2 shadow-lg rounded-md whitespace-pre-wrap">
            {message}
          </span>
          <div className="w-3 h-3 mt-[3.9rem] absolute rotate-45 bg-main-color-2"></div>
        </div>
      </div>
    </>
  )
}
