import { MdOutlineCorporateFare } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"
import React, { ChangeEvent, useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../saas/firebase"
import Fuse from "fuse.js"
import Image from "next/image"

type Props = {
  volunteeringName: string
  orgName: string
  city: string
  isPaid: boolean
  volunteeringType: string
  volunteeringTerm: string
  volunteeringImage: string
  description: string
  defParticipants: Array<Record<string, any>>
}

type SelectProps = {
  users: Array<Record<string, any>>
}

const SelectUser = ({users}: SelectProps) => {
  const [foundUsers, setFoundUsers] = useState<Record<string, any>[]>([])

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const fuse = new Fuse(users, {
      keys: ["email"]
    })
    const result = fuse.search(e.target.value, { limit: 3 })
    setFoundUsers(result.map((result) => result.item))
  }

  return (
    <>
      <input
        type="text"
        onChange={(e: any) => onChange(e)}
        className="h-8 pl-1"
      />
      <div className="text-main-color bg-white">
        {foundUsers.map((user) => (
          <div key={user.id} className="cursor-pointer p-1 border-t-[1px]">
            {user.email}
          </div>
        ))}
      </div>
    </>
  )
}

export const OrganisatorVolunteeringBox = ({
  volunteeringName,
  orgName,
  city,
  isPaid,
  volunteeringType,
  volunteeringTerm,
  description,
  defParticipants
}: Props) => {

  const [selectedUser, setSelectedUser] = useState<Record<string, any>>({})
  const [editMode, setEditMode] = useState<boolean>(false)

  const [participants, setParticipants] =
    useState<Record<string, any>[]>(defParticipants)

  const [users, setUsers] = useState<Record<string, any>[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      getDocs(collection(db, "users")).then((querySnapshot) => {
        const users: Record<string, any>[] = []
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() })
        })
        setUsers(users)
      })
    }
    fetchUsers()
  }, [])

  return (
    <div className="font-inter flex">
      <div className="flex bg-main-color rounded-xl p-4">
        <div className="flex flex-col mt-3 gap-2">
          <span className="font-semibold text-3xl text-white">
            {volunteeringName}
          </span>
          <div className="flex flex-col xl:flex-row font-regular gap-1 text-md text-white">
            <div className="flex flex-row items-center">
              <MdOutlineCorporateFare className="flex mr-1 my-1" />
              <span className="">{orgName}</span>
            </div>
            <div className="flex flex-row items-center ml-2">
              <IoLocationOutline className="flex mr-1 my-1" />
              <span className="">{city}</span>
            </div>
          </div>
          <div className="flex flex-row w-full text-md gap-2 font-regular text-main-color justify-center">
            <div className="rounded-lg bg-white text-center w-40 py-2">
              {isPaid ? "Płatny" : "Bezpłatny"}
            </div>
            <div className="rounded-lg bg-white w-40 px-2 py-2 text-center">
              {volunteeringType}
            </div>
            <div className="rounded-lg bg-white w-40 px-4 py-2 text-center ">
              {volunteeringTerm}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white">Opis</span>
            <textarea
              className="bg-white rounded-lg p-2"
              style={{ resize: "none" }}
            >
              {description}
            </textarea>
          </div>
          <div className="flex flex-col">
            <span className="text-white">
              Uczestnicy: {participants.length}
            </span>
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex flex-row"
                onClick={() => setSelectedUser(participant)}
              >
                <Image
                  src={participant.photoURL}
                  alt="user"
                  className="rounded-full"
                  height="32"
                  width="32"
                />
                <span className="ml-2">{participant.email}</span>
              </div>
            ))}
            <SelectUser users={users} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrganisatorVolunteeringBox
