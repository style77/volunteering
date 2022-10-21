import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from "firebase/firestore"
import { NextPage } from "next"
import React, { FormEvent, useEffect, useRef, useState } from "react"
import { FaCheck, FaEdit } from "react-icons/fa"
import { showAlert } from "../components/alert"
import useAuth, { IUser } from "../hooks/useAuth"
import { db, storage } from "../saas/firebase"

import { DateTime } from "luxon"
import { toggleLogin } from "../components/modals/login"
import { Badge } from "../components/badge"
import { VerificationModal } from "../components/modals/verification"
import { EditableInput } from "../components/editableInput"
import { updateProfile } from "firebase/auth"
import { humanizeError } from "../constants"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FirebaseError } from "firebase/app"

import Image from "next/image"

const Profile: NextPage = () => {
  const { user, isLoggedIn } = useAuth()
  const [, setLoading] = useState(false)
  const inputFile = useRef<HTMLInputElement | null>(null) // for image upload

  const [data, setData] = useState<IUser | Record<string, any>>({})

  const [edit, setEdit] = useState(false)

  const [saveButtonType, setSaveButtonType] = useState<any>("button")

  const [displayName, setDisplayName] = useState("")

  useEffect(() => {
    const getAccount = async () => {
      setLoading(true)
      if (user) {
        setData(user)

        setDisplayName(user.displayName)
      }

      setLoading(false)
    }

    if (Object.keys(data).length === 0) getAccount()
  }, [user, data])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setSaveButtonType("button")

    getDocs(query(collection(db, "users"), where("uid", "==", user!.uid))).then(
      (querySnapshot: QuerySnapshot) => {
        querySnapshot.forEach((doc: DocumentData) => {
          const dataToSave = {
            birthday: data!.birthday,
            description: data!.description,
            location: data!.location,
            displayName: displayName
          }

          updateDoc(doc.ref, dataToSave)
            .then(() => {
              updateProfile(user!.auth.currentUser, {
                displayName: displayName,
              })
                .then(() => {
                  setEdit(false)
                  showAlert(
                    "Zaaktualizowano informacje pomyślnie 🎉",
                    "success"
                  )
                })
                .catch((error: FirebaseError) => {
                  console.log(error)
                  showAlert(humanizeError[error.code], "error-alert")
                })
            })
            .catch((error: FirebaseError) => {
              showAlert(humanizeError[error.code], "error-alert")
            })
        })
      }
    )
  }

  const timeSince = (date: number) => {
    new Date(date * 1)
    return DateTime.fromMillis(date * 1).toRelative({ locale: "pl" }) // BUG I have no idea why do i need to multiply timestamp by 1 to make it work. Probably some bug in JS
  }

  const countAge = (date: string): number => {
    new Date(date)
    return DateTime.fromISO(date).diffNow("years").toObject().years!
  }

  const updateAvatar = (url: string) => {
    getDocs(query(collection(db, "users"), where("uid", "==", user!.uid))).then(
      (querySnapshot: QuerySnapshot) => {
        querySnapshot.forEach((doc: DocumentData) => {
          updateDoc(doc.ref, { photoURL: url })
        })
      }
    )
  }

  const uploadNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const ext = file.type.replace(/(.*)\//g, "")
    if (!user) {
      showAlert("Musisz się zalogować aby zmienić avatar", "error-alert")
      return
    }
    const storageRef = ref(storage, "avatars/" + user.uid + ext)
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef)
        .then((imageURL: string) => {
          updateProfile(user.auth.currentUser, { photoURL: imageURL }).then(
            () => {
              updateAvatar(imageURL)
              showAlert("Zaktualizowano awatar pomyślnie 🎉", "success")
            }
          )
          setData({ ...data!, photoURL: imageURL })
          // .catch((error: Error) => {
          //   console.error(error);
          //   showAlert(
          //     "Wystąpił błąd podczas aktualizacji awatara",
          //     "error-alert"
          //   );
          // });
        })
        .catch((error: FirebaseError) => {
          showAlert(humanizeError[error.code], "error-alert")
        })
    })
  }

  const openFileBrowser = () => {
    inputFile.current!.click()
  }

  return (
    <>
      {isLoggedIn ? (
        <main className="font-inter flex flex-col py-2 mx-6 items-center text-main-color">
          <div className="font-semibold text-4xl xl:text-6xl mt-6">
            Twój profil
          </div>
          <div className="flex flex-row mt-10">
            <div className="flex flex-col gap-4 rounded-md border-2 p-6 pb-10 bg-background-color-2 ">
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  accept="image/*"
                  onChange={(e) => uploadNewAvatar(e)}
                  style={{ display: "none" }}
                />
                <Image
                  className="rounded-full shadow-lg cursor-pointer"
                  alt="user avatar"
                  height="128"
                  width="128"
                  src={data!.photoURL}
                  onClick={() => openFileBrowser()}
                  onError={(e: any) => {
                    e.currentTarget.src = "/images/blank.png"
                  }}
                />
                <div className="my-2 gap-2 flex flex-row" id="badges">
                  {data!.isVerified ? (
                    <Badge bgColor="bg-lime-500" leftIcon={<FaCheck />}>
                      Zweryfikowany
                    </Badge>
                  ) : (
                    <VerificationModal user={data!} />
                  )}
                  {data!.badges?.map((badge: Record<string, string>) => (
                    <Badge bgColor={badge.color} key={badge.name}>
                      {badge.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col items-center border-2 rounded-md bg-zinc-200 mt-2 px-4 pb-2 shadow-md">
                  <EditableInput label={displayName} setText={setDisplayName} />
                  <span className="hidden xl:flex">
                    Konto na Volunteering założone{" "}
                    {data!.metadata?.createdAt &&
                      timeSince(data!.metadata?.createdAt)}
                  </span>
                  <span className="flex xl:hidden">
                    Konto założone{" "}
                    {data!.metadata?.createdAt &&
                      timeSince(data!.metadata?.createdAt)}
                  </span>
                  {Math.abs(countAge(data!.birthday)) > 0 && (
                    <span>
                      Wiek: {Math.floor(Math.abs(countAge(data!.birthday)))} lat{" "}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <label htmlFor="description" className="flex flex-col mt-2">
                    Opis
                  </label>
                  <textarea
                    id="description"
                    value={data!.description}
                    placeholder="Podaj opis"
                    disabled={!edit}
                    onChange={(e) =>
                      setData({ ...data!, description: e.target.value })
                    }
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
                    onChange={(e) =>
                      setData({ ...data!, location: e.target.value })
                    }
                    placeholder="Wybierz swoją lokalizację"
                    disabled={!edit}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5 shadow-md"
                  />
                  <label htmlFor="birthday" className="flex flex-col mt-2">
                    Data urodzenia
                  </label>
                  <input
                    id="birthday"
                    type="date"
                    value={data!.birthday}
                    onChange={(e) => {
                      console.log(e.target.value)
                      setData({ ...data!, birthday: e.target.value })
                    }}
                    max={DateTime.now().toISODate()}
                    min="1900-01-01"
                    placeholder="Wybierz swoją datę urodzenia"
                    disabled={!edit}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5 shadow-md"
                  />
                  <div className="flex flex-row gap-2 mt-4">
                    <button
                      type={saveButtonType}
                      onClick={() => {
                        if (edit) {
                          setSaveButtonType("submit")
                        } else {
                          setSaveButtonType("button")
                        }
                        setEdit(!edit)
                      }}
                      className="bg-zinc-200 border border-zinc-200 text-zinc-800 text-sm rounded-lg block w-full p-2.5 shadow-md"
                    >
                      <FaEdit className="inline-block" />{" "}
                      {edit ? "Zapisz" : "Edytuj"}
                    </button>
                    {edit && (
                      <button
                        type="button"
                        onClick={() => setEdit(false)}
                        className="bg-zinc-200 border border-zinc-200 text-zinc-800 text-sm rounded-lg block w-full p-2.5 shadow-md"
                      >
                        Anuluj
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <a href={`/profile/${data.uid}`} className="text-zinc-400/50 text-sm">
            UID {data.uid}
          </a>
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
              , aby zobaczyć swój profil
            </span>
          </div>
        </div>
      )}
    </>
  )
}
export default Profile
