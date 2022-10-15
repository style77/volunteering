import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  leftIcon?: any;
  bgColor?: string;
};

export const Badge = ({ children, bgColor = "bg-violet-500", leftIcon }: Props) => {
  return (
    <>
      <div
        id="badge"
        className={
          "rounded-lg px-2 py-1 flex items-center justify-center z-10 " +
          bgColor
        }
      >
        <span className="text-white text-sm font-semibold flex flex-row justify-center items-center">
          {leftIcon &&
            <div className="mr-1">{leftIcon}</div>
          }
          {children}
        </span>
      </div>
    </>
  );
};