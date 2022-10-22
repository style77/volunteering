import { MdOutlineCorporateFare } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"
import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import {
  collection,
  DocumentData,
  getDocs,
  QuerySnapshot,
  updateDoc
} from "firebase/firestore"
import { db } from "../saas/firebase"
import Fuse from "fuse.js"
import Image from "next/image"
import { FiX } from "react-icons/fi"
import { FaTrash } from "react-icons/fa"

type Props = {
  volunteeringName: string
  volunteeringID: string
  orgName: string
  city: string
  isPaid: boolean
  volunteeringType: string
  volunteeringTerm: string
  volunteeringImage: string
  description: string
  defParticipants: string[]
  removeVolunteering: Function
}

type SelectProps = {
  users: Array<Record<string, any>>
  participants: Array<Record<string, any>>
  addToParticipants: Function
}

const SelectUser = ({
  users,
  addToParticipants,
  participants
}: SelectProps) => {
  const [foundUsers, setFoundUsers] = useState<Record<string, any>[]>([])
  const InputRef = useRef<HTMLInputElement>(null)

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const participantsIds = participants.map((participant) => participant.id)
    const filteredUsers = users.filter(
      (user) => !participantsIds.includes(user.id)
    )
    const fuse = new Fuse(filteredUsers, {
      keys: ["email"]
    })
    const result = fuse.search(e.target.value, { limit: 3 })
    setFoundUsers(result.map((user) => user.item))
  }

  return (
    <>
      <input
        type="text"
        ref={InputRef}
        onChange={(e: any) => onChange(e)}
        placeholder="Wyszukaj użytkownika po emailu"
        className="h-8 pl-1 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="text-black bg-white absolute w-[31rem]">
        {foundUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-row items-center justify-between p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => {
              addToParticipants(user)
              setFoundUsers([])
              InputRef.current!.value = ""
            }}
          >
            {user.email}
          </div>
        ))}
      </div>
    </>
  )
}

export const OrganisatorVolunteeringBox = ({
  volunteeringName,
  volunteeringID,
  orgName,
  city,
  isPaid,
  volunteeringType,
  volunteeringTerm,
  description,
  defParticipants,
  removeVolunteering
}: Props) => {
  const [selectedUser, setSelectedUser] = useState<Record<string, any>>({})
  const [editMode, setEditMode] = useState<boolean>(false)
  const [participants, setParticipants] = useState<string[]>(defParticipants)
  const [participantsUsers, setParticipantsUsers] = useState<
    Record<string, any>[]
  >([])

  const [users, setUsers] = useState<Record<string, any>[]>([])
  const [allUsers, setAllUsers] = useState<Record<string, any>[]>([])

  const removeParticipant = (user: Record<string, any>) => {
    const newParticipants = participants.filter(
      (participant) => participant !== user.id
    )
    setParticipants(newParticipants)

    getDocs(collection(db, "volunteerings")).then(
      (querySnapshot: QuerySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === volunteeringID) {
            updateDoc(doc.ref, {
              usersAppending: newParticipants
            })
          }
        })
      }
    )

  getDocs(collection(db, "users")).then((querySnapshot: QuerySnapshot) => {
    querySnapshot.forEach((doc: DocumentData) => {
      if (doc.data().uid === user.uid) {
        updateDoc(doc.ref, {
          heldVolunteering: [...newParticipants]
        })
      }
    })
  })

  }

  const addToParticipants = (user: Record<string, any>) => {
    setParticipants([...participants, user.id])
    setUsers(users.filter((dUser) => dUser.id !== user.id))

    getDocs(collection(db, "volunteerings")).then(
      (querySnapshot: QuerySnapshot) => {
        querySnapshot.forEach((doc: DocumentData) => {
          if (doc.id === volunteeringID) {
            updateDoc(doc.ref, {
              usersAppending: [...participants, user.uid]
            })
          }
        })
      }
    )

    getDocs(collection(db, "users")).then((querySnapshot: QuerySnapshot) => {
      querySnapshot.forEach((doc: DocumentData) => {
        if (doc.data().uid === user.uid) {
          updateDoc(doc.ref, {
            heldVolunteering: [...user.heldVolunteering, volunteeringID]
          })
        }
      })
    })
  }

  useEffect(() => {
    const fetchUsers = async () => {
      getDocs(collection(db, "users")).then((querySnapshot) => {
        const users: Record<string, any>[] = []
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.data().uid, ...doc.data() })
        })

        const participUsers =
          (participants.map((participantId) => {
            return users.find((user) => user.id === participantId)
          }) as Record<string, any>[]) || []

        setParticipantsUsers(participUsers)

        setUsers(users.filter((user) => !participants.includes(user.id)))
      })
    }

    fetchUsers()
  }, [participants])

  return (
    <div className="font-inter flex">
      <div className="flex bg-main-color rounded-xl p-4">
        <div className="flex flex-col mt-3 gap-2">
          <div className="flex flex-row w-full">
            <span className="flex font-semibold text-3xl text-white items-center">
              {volunteeringName}
            </span>
            <div className="flex font-semibold text-2xl text-white/50 hover:text-red-600 transition cursor-pointer w-full justify-end items-center">
              <FaTrash onClick={() => removeVolunteering(volunteeringID)} />
            </div>
          </div>
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
              disabled
            >
              {description}
            </textarea>
          </div>
          <div className="flex flex-col">
            <span className="text-white">
              Uczestnicy: {participants.length}
            </span>
            <div className="h-48 my-2 overflow-y-auto">
              {participantsUsers.map((participant) => {
                return (
                  <div
                    key={participant.id}
                    className="flex flex-row my-2 bg-white text-zinc-700 rounded-lg p-2 overflow-y-auto"
                    onClick={() => setSelectedUser(participant)}
                  >
                    <div className="flex basis-4/5 items-center">
                      <Image
                        src={participant.photoURL}
                        alt="user"
                        className="rounded-full"
                        height="32"
                        width="32"
                        onError={(e) => {
                          e.currentTarget.src = "/images/blank.png"
                        }}
                      />
                      <span className="ml-2">{participant.email}</span>
                    </div>
                    <div
                      className="flex basis-1/5 items-center justify-end"
                      onClick={() => removeParticipant(participant)}
                    >
                      <FiX className="text-xl cursor-pointer hover:text-red-600 transition" />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="my-2">
              <SelectUser
                users={users}
                participants={participantsUsers}
                addToParticipants={addToParticipants}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrganisatorVolunteeringBox
