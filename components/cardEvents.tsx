import { MdOutlineFavoriteBorder } from "react-icons/md"
import { MdOutlineFavorite } from "react-icons/md"
import { MdNotificationsNone } from "react-icons/md"
import { MdNotificationsActive } from "react-icons/md"
import { BsFillChatLeftDotsFill } from "react-icons/bs"


type Props = {
    isFavorite: boolean
    isNotifications: boolean
}

export const CardEvents = ({ isFavorite, isNotifications }: Props) => {
    return (
        <>
            <main className="flex min-h-screen flex-col">
                <div className="flex flex-row rounded-lg bg-main-color h-28 w-[15vw]">
                    <div className="items-stretch">
                        <button className="rounded-full bg-white">
                            {isFavorite ? <MdOutlineFavorite></MdOutlineFavorite> : <MdOutlineFavoriteBorder></MdOutlineFavoriteBorder>}
                        </button>
                        <button className="rounded-full bg-white">
                            {isNotifications ? <MdNotificationsActive></MdNotificationsActive> : <MdNotificationsNone></MdNotificationsNone>}
                        </button>
                        <button>
                            <BsFillChatLeftDotsFill className="rounded-full bg-white"></BsFillChatLeftDotsFill>
                        </button>
                    </div>

                </div>
            </main>
        </>
    )
}