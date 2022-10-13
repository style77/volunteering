import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextPage } from "next";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { showAlert } from "../components/alert";
import useAuth from "../hooks/useAuth";
import { db } from "../saas/firebase";

import { DateTime } from "luxon";
import { toggleLogin } from "../components/modals/login";

const Profile: NextPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const [data, setData]: any = useState({});

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getAccount = async () => {
      setLoading(true);
      if (user) {
        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("uid", "==", user.uid))
        );
        const snapshotData = querySnapshot.docs[0].data();

        setData(Object.assign({}, snapshotData, user));
      }

      setLoading(false);
    };

    if (Object.keys(data).length === 0) getAccount();
  }, [user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateDoc(doc(db, "users", user.uid), {
      ...data,
    }).then(() => {
      setEdit(false);
      showAlert("Zaaktualizowano informacje pomyślnie 🎉", "success");
    });
  };

  const timeSince = (date: number) => {
    new Date(date * 1);
    return DateTime.fromMillis(date * 1).toRelative({ locale: "pl" }); // BUG I have no idea why do i need to multiply timestamp by 1 to make it work. Probably some bug in JS
  };

  console.log(data);

  const getBirthday = (bday: number) => {
    const date = new Date(bday*1)

    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${date.getFullYear()}/${month}/${day}`;
  }

  return (
    <>
      {isLoggedIn ? (
        <main className="font-inter flex flex-col py-2 ml-6 items-center text-main-color">
          <div className="font-semibold text-4xl xl:text-6xl my-6">
            Twój profil
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col gap-4 rounded-md border-2 p-6 pb-10 bg-background-color-2">
              <div className="flex flex-col items-center">
                <img
                  className="h-32 w-32 bg-white rounded-full shadow-md"
                  src={data.photo}
                />
                <div className="flex flex-col items-center border-2 rounded-md bg-zinc-200 mt-2 px-4 pb-2 shadow-md">
                  <span className="font-semibold text-3xl mt-2">
                    {data.name}
                  </span>
                  <span>
                    Konto na Volunteering założone{" "}
                    {data.metadata?.createdAt &&
                      timeSince(data.metadata?.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <textarea
                  value={data.description}
                  placeholder="Podaj opis"
                  disabled={!edit}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  className="w-full h-20 rounded-md shadow-md bg-gray-50 border-[1px] pl-1"
                  style={{ resize: "none" }}
                />
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) =>
                    setData({ ...data, location: e.target.value })
                  }
                  placeholder="Wybierz swoją lokalizację"
                  disabled={!edit}
                  className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5 shadow-md"
                />
                <input
                  type="date"
                  value={getBirthday(data.birthday)}
                  onChange={(e) =>
                    setData({ ...data, birthday: e.target.value })
                  }
                  placeholder="Wybierz swoją datę urodzenia"
                  disabled={!edit}
                  className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5 shadow-md"
                />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="my-6">
            <span className="font-semibold text-main-color text-4xl">
              <span onClick={() => toggleLogin()} className="text-main-color-2 hover:text-main-color-3 cursor-pointer transition">Zaloguj się</span>, aby zobaczyć swój profil
            </span>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
