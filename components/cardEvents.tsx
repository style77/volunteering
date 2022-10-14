import { useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { MdChatBubbleOutline } from "react-icons/md";
import { EventButton } from "../components/eventButton";
import { toggleLogin } from "./modals/login";

type Props = {
  isFavorite: boolean;
  isNotifications: boolean;
};

export const NotAuthorizedCardEvents = () => {
  return (
    <>
      <div className="flex flex-col">
        <button
          className="flex flex-row rounded-lg bg-main-color h-20 xl:h-36 xl:w-56 justify-center items-center shadow-md text-background-color transition ease-in-out hover:bg-main-color-2 duration-300"
          onClick={() => toggleLogin()}
        >
          <div className="flex text-xl justify-center cursor-pointer  transition">
            Zaloguj się, aby wyświetlić opcję
          </div>
        </button>
      </div>
    </>
  );
};

export const SkeletonCardEvents = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row rounded-lg bg-main-color h-20 w-full xl:h-36 xl:w-56 justify-center items-center shadow-md">
          <div className="flex flex-row gap-3 text-main-color">
            <div className="shadow-lg rounded-full">
              <div className="rounded-full bg-white h-12 w-12 animate-pulse text-4xl p-2 transition ease-in-out duration-300" />
            </div>
            <div className="shadow-lg rounded-full">
              <div className="rounded-full bg-white h-12 w-12 animate-pulse text-4xl p-2 transition ease-in-out duration-300" />
            </div>
            <div className="rounded-full bg-white h-12 w-12 animate-pulse text-4xl p-2 transition ease-in-out duration-300" />
          </div>
        </div>
      </div>
    </>
  );
};

export const CardEvents = ({ isFavorite, isNotifications }: Props) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [notification, setNotification] = useState(isNotifications);

  const handleNotifications = (isSelected: boolean) => {
    setNotification(isSelected);

    // there will be all the logic to handle the notifications switch
  };

  const handleFavorite = (isSelected: boolean) => {
    setFavorite(isSelected);

    // there will be all the logic to handle the favorite switch
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row rounded-lg bg-main-color h-20 w-full xl:h-36 xl:w-56 justify-center items-center shadow-md">
          <div className="flex flex-row gap-3 text-main-color">
            <EventButton
              icon="favorite"
              isSelected={favorite}
              handleEvent={handleFavorite}
            />
            <EventButton
              icon="notifications"
              isSelected={notification}
              handleEvent={handleNotifications}
            />
            <button className="rounded-full bg-white text-4xl p-2 transition ease-in-out hover:scale-110 duration-300">
              <MdChatBubbleOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
