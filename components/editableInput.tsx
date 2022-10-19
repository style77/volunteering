/* eslint-disable react/react-in-jsx-scope */
// I think it's pretty cool looking so why not implement it in our app

import { useRef, useState } from "react"

type Props = {
  label: string;
  setText: (text: string) => void;
};

export const EditableInput = ({ label, setText }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const backdropRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <div
        id="backdrop"
        ref={backdropRef}
        className="fixed w-full h-screen hidden z-10"
        onClick={() => {
          backdropRef.current?.classList.add("hidden")
          setIsEditing(false)
        }}
      ></div>
      {isEditing ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value)
              backdropRef.current?.classList.remove("hidden")
            }}
            value={label}
            className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block z-50 p-2.5 shadow-md"
          />
        </>
      ) : (
        <span
          className="font-semibold text-3xl mt-2 cursor-text"
          onClick={() => setIsEditing(true)}
        >
          {label}{" "}
        </span>
      )}
    </>
  )
}
