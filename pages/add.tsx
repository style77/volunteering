import { addDoc, collection, doc, terminate } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { showAlert } from "../components/alert";
import { toggleLogin } from "../components/modals/login";
import { volunteeringTypes, volunteeringTypesArray } from "../constants";
import useAuth from "../hooks/useAuth";
import { db, storage } from "../saas/firebase";
import { VolunteeringAnnoucement } from "../components/modals/volunteeringAnnoucement";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Add: NextPage = () => {
  const { user, isLoggedIn } = useAuth();

  const [volunteeringName, setVolunteeringName] = useState("");
  const [fundationName, setFundationName] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [term, setTerm] = useState("");
  const [paid, setPaid] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar]: any = useState(null);

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setIsVerified(user?.isVerified);
    }
  }, [isLoggedIn, user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let ext = avatar.type.replace(/(.*)\//g, "");
    const storageRef = ref(storage, "volunteeringAvatars/" + uuidv4() + ext);
    uploadBytes(storageRef, avatar).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, "volunteering"), {
          volunteeringName,
          fundationName,
          city,
          type: type || "hospice",
          term: term || "one-time",
          paid: paid || "unpaid",
          image: url,
          description,
          phone: phone,
          email: email,
          organisator: user.uid,
        })
          .then(() => {
            setVolunteeringName("");
            setFundationName("");
            setCity("");
            setType("");
            setTerm("");
            setPaid("");
            setAvatar(null);
            setDescription("");
            showAlert("Dodano ogłoszenie wolontariatu!", "success");
          })
          .catch((error) => {
            showAlert(error.message, "error-alert");
          });
      });
    });
  };

  return (
    <>
      <Head>
        <title>Volunteering - Dodawanie</title>
      </Head>

      {isLoggedIn && isVerified ? (
        <main className="font-inter flex min-h-screen flex-col py-2">
          <h1 className="text-4xl xl:text-6xl font-semibold text-main-color my-6 ml-6">
            Dodawanie nowego wolonariatu
          </h1>
          <div className="flex flex-row basis-3/5 mx-0 xl:mx-6 justify-center">
            <div className="flex flex-col w-4/5 xl:w-4/6 gap-3">
              <form
                className="space-y-2"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="flex flex-col w-full">
                  <h2 className="text-2xl xl:text-4xl font-regular pt-6 text-main-color">
                    Informacje o wolontariacie
                  </h2>
                  <label
                    htmlFor="volunteering-name"
                    className="text-main-color "
                  >
                    Nazwa wolontariatu
                  </label>
                  <input
                    id="volunteering-name"
                    value={volunteeringName}
                    onChange={(e) => setVolunteeringName(e.target.value)}
                    className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="fundation-name" className="text-main-color ">
                    Nazwa fundacji
                  </label>
                  <input
                    id="fundation-name"
                    value={fundationName}
                    onChange={(e) => setFundationName(e.target.value)}
                    className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="volunteering-city"
                    className="text-main-color "
                  >
                    Miasto
                  </label>
                  <input
                    id="volunteering-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="volunteering-type"
                    className="text-main-color "
                  >
                    Wolontariat
                  </label>
                  <select
                    id="volunteering-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
                    required
                  >
                    <option selected>Wybierz</option>
                    {Object.entries(volunteeringTypes).map(
                      ([key, value]: any, i) => (
                        <option value={key} key={key}>
                          {value}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="volunteering-term"
                    className="text-main-color "
                  >
                    Czas pełnienia wolontariatu
                  </label>
                  <select
                    id="volunteering-term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
                    required
                  >
                    <option selected>Wybierz</option>
                    <option value="one-time">Jednorazowy</option>
                    <option value="periodic">Okresowy</option>
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="paid" className="text-main-color ">
                    Płatne
                  </label>
                  <select
                    id="paid"
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                    className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
                    required
                  >
                    <option selected>Wybierz</option>
                    <option value="unpaid">Bezpłatne</option>
                    <option value="paid">Płatne </option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="volunteering-image"
                    className="text-main-color "
                  >
                    Link do zdjęcia
                  </label>
                  <input
                    id="volunteering-image"
                    type="file"
                    onChange={(e:any) => setAvatar(e.target?.files[0])}
                    placeholder="wymiary obrazu muszą być kwadratem np. 64px x 64px"
                    className="resize-none rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="volunteering-description"
                    className="text-main-color "
                  >
                    Opis (opcjonalnie)
                  </label>
                  <textarea
                    id="volunteering-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2 h-32"
                  />
                  <h2 className="text-2xl xl:text-4xl font-regular pt-6 text-main-color">
                    Dane kontaktowe
                  </h2>
                  <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-main-color ">
                      Adres e-mail
                    </label>
                    <input
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="volunteering@mail.com"
                      className="resize-none rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="phone" className="text-main-color ">
                      Numer telefonu
                    </label>
                    <input
                      id="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      placeholder="000-000-000"
                      className="resize-none rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
                      required
                    />
                  </div>
                </div>
                <button className="flex flex-row rounded-lg bg-main-color text-white h-12 w-full text-xl justify-center items-center mt-[1.9rem] transition ease-in-out hover:scale-110 hover:bg-main-color-2 duration-300 my-2">
                  <div className="px-2">Dodaj</div>
                </button>
              </form>
            </div>
          </div>
        </main>
      ) : (
        <>
          <main className="font-inter flex min-h-screen flex-col items-center py-2">
            <div className="font-semibold text-4xl text-main-color items-center my-6 ml-6">
              <span
                onClick={() => toggleLogin()}
                className="text-main-color-2 hover:text-main-color-3 cursor-pointer transition"
              >
                Zaloguj się
              </span>
              , albo{" "}
              <a
                href="/profile"
                className="text-main-color-2 hover:text-main-color-3 cursor-pointer transition"
              >
                zweryfikuj konto
              </a>{" "}
              numerem telefonu aby dodać wolontariat
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Add;
