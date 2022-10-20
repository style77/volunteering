/* eslint-disable react/react-in-jsx-scope */
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from "firebase/firestore"
import { useState } from "react"
import { MdChatBubbleOutline } from "react-icons/md"
import { EventButton } from "../components/eventButton"
import useAuth from "../hooks/useAuth"
import { db } from "../saas/firebase"
import { toggleLogin } from "./modals/login"

type Props = {
  isFavorite: boolean;
  isNotifications: boolean;
  volunteeringData: Record<string, any>;
  setShowVolunteeringAnnoucementModal?: Function;
  setSelectedVolunteeringData?: Function;
};

export const NotAuthorizedCardEvents = () => {
  return (
    <>
      <div className="flex flex-col">
        <button
          className="flex flex-row rounded-lg bg-main-color h-20 xl:h-36 xl:w-56 justify-center items-center shadow-md transition ease-in-out hover:bg-main-color-2 duration-300"
          onClick={() => toggleLogin()}
        >
          <div className="flex text-white text-xl xl:px-0 px-3 justify-center cursor-pointer  transition">
            Zaloguj się, aby wyświetlić opcję
          </div>
        </button>
      </div>
    </>
  )
}

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
  )
}

export const CardEvents = ({
  isFavorite,
  isNotifications,
  volunteeringData,
  setShowVolunteeringAnnoucementModal,
  setSelectedVolunteeringData,
}: Props) => {
  const [favorite, setFavorite] = useState(isFavorite)
  const [notification, setNotification] = useState(isNotifications)

  const { user } = useAuth()

  const updateEventsData = (type: string, action: string) => {
    if (user) {
      if (action === "add") {
        getDocs(
          query(collection(db, "users"), where("uid", "==", user.uid))
        ).then((querySnapshot: QuerySnapshot) => {
          querySnapshot.forEach((doc: DocumentData) => {
            updateDoc(doc.ref, {
              [type]: [...doc.data()[type], volunteeringData.id],
            })
          })
        })
      } else if (action === "remove") {
        getDocs(
          query(collection(db, "users"), where("uid", "==", user.uid))
        ).then((querySnapshot: QuerySnapshot) => {
          querySnapshot.forEach((doc: DocumentData) => {
            updateDoc(doc.ref, {
              [type]: doc
                .data()[type].filter((id: string) => id !== volunteeringData.id),
            })
          })
        })
      }
    }
  }

  const handleNotifications = (isSelected: boolean) => {
    setNotification(isSelected)

    // there will be all the logic to handle the notifications switch
    updateEventsData("notifications", isSelected ? "add" : "remove")
  }

  const handleFavorite = (isSelected: boolean) => {
    setFavorite(isSelected)

    // there will be all the logic to handle the favorite switch
    updateEventsData("favorites", isSelected ? "add" : "remove")
  }

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
            <button
              className="rounded-full bg-white text-4xl p-2 transition ease-in-out hover:scale-110 duration-300"
              onClick={() => {
                if (
                  setShowVolunteeringAnnoucementModal &&
                  setSelectedVolunteeringData
                ) {
                  setSelectedVolunteeringData(volunteeringData)
                  setShowVolunteeringAnnoucementModal(true)
                }
              }}
            >
              <MdChatBubbleOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
