/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "react"
import {
  MdNotificationsActive,
  MdNotificationsNone,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md"

type Props = {
  icon: string;
  isSelected: boolean;
  handleEvent: Function;
};

const icons: Record<string, ReactNode> = {
  favoriteNotSelected: <MdOutlineFavoriteBorder />,
  favoriteSelected: <MdOutlineFavorite />,
  notificationsNotSelected: <MdNotificationsNone />,
  notificationsSelected: <MdNotificationsActive />,
}

export const EventButton = ({ icon, isSelected, handleEvent }: Props) => {
  return (
    <>
      <div className="shadow-lg rounded-full">
        <button
          className="rounded-full bg-white text-4xl p-2 transition ease-in-out hover:scale-110 duration-300"
          onClick={() => handleEvent(!isSelected)}
        >
          {isSelected ? icons[`${icon}Selected`] : icons[`${icon}NotSelected`]}
        </button>
      </div>
    </>
  )
}
