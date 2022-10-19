/* eslint-disable react/react-in-jsx-scope */
import { AiOutlineCloseCircle } from "react-icons/ai"
import { MdOutlineCorporateFare } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"
import { EventButton } from "../eventButton"
import { MdChatBubbleOutline } from "react-icons/md"
import { useEffect, useRef, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { collection, DocumentData, getDocs, query, QuerySnapshot, updateDoc, where } from "firebase/firestore"
import { db } from "../../saas/firebase"
import { Tooltip } from "../tooltip"

type Props = {
  volunteeringName: string;
  orgName: string;
  city: string;
  isPaid: boolean;
  volunteeringType: string;
  volunteeringTerm: string;
  isFavorite: boolean;
  isNotifications: boolean;
  description: string;
  showVolunteeringAnnoucementModal: boolean;
  setShowVolunteeringAnnoucementModal: Function;
  volunteeringId: string;
  user: Record<string, any>;
  email: string;
  phone: string;
};

export const VolunteeringAnnoucement = ({
	volunteeringName,
	orgName,
	city,
	isPaid,
	volunteeringType,
	volunteeringTerm,
	description,
	showVolunteeringAnnoucementModal,
	setShowVolunteeringAnnoucementModal,
	volunteeringId,
	email,
	phone,
	user,
}: Props) => {
	const { isLoggedIn } = useAuth()
	const modal = useRef<HTMLDivElement>(null)
	const backdrop = useRef<HTMLDivElement>(null)

	const [favorite, setFavorite] = useState(false)
	const [notification, setNotification] = useState(false)

	useEffect(() => {
		const fetchFavorite = () => {
			if (user?.favorites?.includes(volunteeringId)) {
				setFavorite(true)
			} else {
				setFavorite(false)
			}
		}

		const fetchNotification = () => {
			if (user?.notifications?.includes(volunteeringId)) {
				setNotification(true)
			} else {
				setNotification(false)
			}
		}

		fetchFavorite()
		fetchNotification()
	}, [volunteeringId, user])

	const updateEventsData = (type: string, action: string) => {
		if (user) {
			if (action === "add") {
				getDocs(
					query(collection(db, "users"), where("uid", "==", user.uid))
				).then((querySnapshot: QuerySnapshot) => {
					querySnapshot.forEach((doc: DocumentData) => {
						updateDoc(doc.ref, {
							[type]: [...doc.data()[type], volunteeringId],
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
								.data()[type].filter((id: string) => id !== volunteeringId),
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

	const handleToggleModal = (value: boolean) => {
		if (value) {
			modal.current?.classList.remove("hidden")
			backdrop.current?.classList.remove("hidden")
		}

		setTimeout(() => {
			if (value) {
				modal.current?.classList.replace("opacity-0", "opacity-100")
			} else {
				modal.current?.classList.replace("opacity-100", "opacity-0")
				setTimeout(() => {
					modal.current?.classList.add("hidden")
					backdrop.current?.classList.add("hidden")
				}, 500)
			}
		}, 1)
	}

	useEffect(() => {
		setTimeout(() => {
			if (showVolunteeringAnnoucementModal) {
				handleToggleModal(true)
			} else {
				handleToggleModal(false)
			}
		}, 1)
	}, [showVolunteeringAnnoucementModal])

	console.log(favorite)
	return (
		<>
			<div
				id="annoucement-modal"
				ref={modal}
				tabIndex={-1}
				className="opacity-0 duration-300 transition fixed inset-0 font-inter justify-center items-center h-screen w-screen hidden flex"
			>
				<div
					className="fixed hidden w-screen h-screen -z-[1] bg-black opacity-50"
					onClick={() => {
						setShowVolunteeringAnnoucementModal(false)
						handleToggleModal(false)
					}}
					ref={backdrop}
				></div>
				<div className="bg-main-color rounded-lg w-11/12 xl:w-3/5 z-20 justify-center items-center">
					<div className="flex flex-col">
						<div className="flex flex-row gap-2 justify-end m-3">
							<button
								className="text-4xl text-white transition ease-in-out hover:scale-110 duration-300 delay-100"
								onClick={() => setShowVolunteeringAnnoucementModal(false)}
							>
								<AiOutlineCloseCircle />
							</button>
						</div>
						<span className="text-white text-4xl font-semibold ml-6">
							{volunteeringName}
						</span>

						<div className="flex flex-col xl:flex-row">
							<div className="flex flex-row gap-2 text-white mx-6 my-3 basis-1/2">
								<div className="flex">
									<MdOutlineCorporateFare className="flex my-1 mr-1" />
									<span>{orgName}</span>
								</div>
								<div className="flex">
									<IoLocationOutline className="flex my-1 mr-1" />
									<span>{city}</span>
								</div>
							</div>
							<div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-end mr-4 xl:mr-12 mx-6 gap-3 text-main-color pb-4">
								<span className="rounded-lg bg-white w-28 px-2 py-2 text-center justify-center items-center flex select-none">
									{isPaid ? "Płatny" : "Bezpłatny"}
								</span>
								<span className="rounded-lg bg-white w-28 px-20 py-2 text-center justify-center items-center flex select-none">
									{volunteeringTerm}
								</span>
								<span className="rounded-lg bg-white w-28 px-2 py-2 text-center justify-center items-center flex select-none">
									{volunteeringType}
								</span>
							</div>
						</div>
						<span className="text-white mx-6 flex">Opis</span>
						<div>
							<textarea
								placeholder="Brak opisu 😢"
								disabled
								className="rounded-lg bg-white h-[30vh] w-10/12 xl:w-1/2 mx-6 my-2 text-main-color p-2"
								style={{ resize: "none" }}
							>
								{description}
							</textarea>
						</div>
					</div>
					<div className="flex w-full justify-center gap-3 text-main-color my-4">
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
						{isLoggedIn ? (
							<Tooltip
								text=""
								message={`Dane kontaktowe\n📨: ${
									email || "Brak danych"
								}\n📞: ${phone || "Brak danych"}`}
							>
								<div className="rounded-full bg-white text-4xl p-2 transition ease-in-out hover:scale-110 duration-300">
									<MdChatBubbleOutline />
								</div>
							</Tooltip>
						) : (
							<Tooltip
								text=""
								message="Zaloguj się, aby zobaczyć dane kontaktowe"
							>
								<div className="rounded-full bg-white text-4xl p-2 transition ease-in-out hover:scale-110 duration-300">
									<MdChatBubbleOutline />
								</div>
							</Tooltip>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
