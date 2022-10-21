import { NextPage } from "next"
import React, { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { IUser } from "../../hooks/useAuth"

import Image from "next/image"
import { DateTime } from "luxon"
import { toggleLogin } from "../../components/modals/login"
import { Badge } from "../../components/badge"
import { useRouter } from "next/router"
import { collection, DocumentData, getDocs, query, QuerySnapshot, where } from "firebase/firestore"
import { db } from "../../saas/firebase"

import useAuth from "../../hooks/useAuth"

const Profile: NextPage = () => {
  const { isLoggedIn } = useAuth()
  const [, setLoading] = useState(false)
  const [data, setData] = useState<IUser | Record<string, any>>({})

  const router = useRouter()
  const { uid } = router.query

  useEffect(() => {
    const getAccount = async () => {
      setLoading(true)
      if (uid) {
        
        const q = query(collection(db, "users"), where("uid", "==", uid))
        getDocs(q).then((querySnapshot: QuerySnapshot) => {
          querySnapshot.forEach((doc: DocumentData) => {
            console.log(doc.data())
            setData(doc.data())
          })
        })
      }

      setLoading(false)
    }

    if (Object.keys(data).length === 0) getAccount()
  }, [uid, data])

  const timeSince = (date: number) => {
    return DateTime.fromMillis(date * 1000).toRelative({ locale: "pl" }) // BUG I have no idea why do i need to multiply timestamp by 1 to make it work. Probably some bug in JS
  }

  const countAge = (date: string): number => {
    new Date(date)
    return DateTime.fromISO(date).diffNow("years").toObject().years!
  }

  console.log(data)

  return (
    <>
      {isLoggedIn ? (
        <main className="font-inter flex flex-col py-2 mx-6 items-center text-main-color">
          <div className="font-semibold text-4xl xl:text-6xl mt-6">
            Profil {data.displayName}
          </div>
          <div className="flex flex-row mt-10">
            <div className="flex flex-col gap-4 rounded-md border-2 p-6 pb-10 bg-background-color-2 ">
              <div className="flex flex-col items-center">
                <Image
                  className="rounded-full shadow-lg cursor-pointer"
                  alt="user avatar"
                  height="128"
                  width="128"
                  src={data!.photoURL}
                  onError={(e) => {
                    e.currentTarget.src = "../images/blank.png"
                  }}
                />
                <div className="my-2 gap-2 flex flex-row" id="badges">
                  {data!.isVerified ? (
                    <Badge bgColor="#84cc16" leftIcon={<FaCheck />}>
                      Zweryfikowany
                    </Badge>
                  ) : (
                    <Badge bgColor="#a1a1aa">Niezweryfikowany</Badge>
                  )}
                  {data!.badges?.map((badge: Record<string, string>) => (
                    <Badge bgColor={badge.color} key={badge.name}>
                      {badge.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col items-center border-2 rounded-md bg-zinc-200 mt-2 px-4 pb-2 shadow-md">
                  <span className="font-semibold text-3xl mt-2 cursor-text">
                    {data?.displayName}{" "}
                  </span>
                  <span className="hidden xl:flex">
                    Konto na Volunteering założone{" "}
                    {data!.createdAt && timeSince(data!.createdAt.seconds)}
                  </span>
                  <span className="flex xl:hidden">
                    Konto założone{" "}
                    {data!.createdAt && timeSince(data!.createdAt.seconds)}
                  </span>
                  {Math.abs(countAge(data!.birthday)) > 0 && (
                    <span>
                      Wiek: {Math.floor(Math.abs(countAge(data!.birthday)))} lat{" "}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <label htmlFor="description" className="flex flex-col mt-2">
                    Opis
                  </label>
                  <textarea
                    id="description"
                    value={data!.description}
                    placeholder="Nie podano opisu"
                    disabled={true}
                    className="w-full h-20 rounded-md shadow-md bg-gray-50 border-[1px] pl-1"
                    style={{ resize: "none" }}
                  />
                  <label htmlFor="location" className="flex flex-col">
                    Miasto
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={data!.location}
                    placeholder="Nie podano lokalizacji"
                    disabled={true}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5 shadow-md"
                  />
                  <label htmlFor="birthday" className="flex flex-col mt-2">
                    Data urodzenia
                  </label>
                  <input
                    id="birthday"
                    type="date"
                    value={data!.birthday}
                    placeholder="Nie podano daty urodzenia"
                    disabled={true}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5 shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="my-6">
            <span className="font-semibold text-main-color text-4xl">
              <span
                onClick={() => toggleLogin()}
                className="text-main-color-2 hover:text-main-color-3 cursor-pointer transition"
              >
                Zaloguj się
              </span>
              , aby zobaczyć profil tego użytkownika
            </span>
          </div>
        </div>
      )}
    </>
  )
}
export default Profile
