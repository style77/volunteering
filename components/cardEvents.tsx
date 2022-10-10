import { useState } from "react"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { MdOutlineFavorite } from "react-icons/md"
import { MdNotificationsNone } from "react-icons/md"
import { MdNotificationsActive } from "react-icons/md"
import { MdChatBubbleOutline } from "react-icons/md"
import {EventButton} from "../components/eventButton"

type Props = {
    isFavorite: boolean
    isNotifications: boolean
}




export const CardEvents = ({ isFavorite, isNotifications }: Props) => {
    const [favorite, setFavorite] = useState(isFavorite)
    const [notification, setNotification]=useState(isNotifications)
    
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row rounded-lg bg-main-color h-28 w-56 justify-center items-center">
                    <div className="flex gap-3 text-main-color">
                        <EventButton icon="favorite" isSelected={favorite} setSelected={setFavorite} />
                        <EventButton icon="notifications" isSelected={notification} setSelected={setNotification} />
                        <button className="rounded-full bg-white text-4xl p-2 transition ease-in-out hover:scale-110 duration-300">
                            <MdChatBubbleOutline />
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}