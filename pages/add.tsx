import { addDoc, collection, doc, terminate } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { showAlert } from "../components/alert";
import { toggleLogin } from "../components/modals/login";
import { volunteeringTypesArray } from "../constants";
import useAuth from "../hooks/useAuth";
import { db } from "../saas/firebase";

const Add: NextPage = () => {
  const { user, isLoggedIn } = useAuth();

  const [volunteeringName, setVolunteeringName] = useState("");
  const [fundationName, setFundationName] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [term, setTerm] = useState("");
  const [paid, setPaid] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setIsVerified(user?.isVerified);
    }
  }, [isLoggedIn, user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    addDoc(collection(db, "volunteering"), {
      volunteeringName,
      fundationName,
      city,
      type: type || "hospice",
      term: term || "one-time",
      paid: paid || "unpaid",
      image,
      description,
      organisator: user.uid,
    })
      .then(() => {
        setVolunteeringName("");
        setFundationName("");
        setCity("");
        setType("");
        setTerm("");
        setPaid("");
        setImage("");
        setDescription("");
        showAlert("Dodano ogłoszenie wolontariatu!", "success");
      })
      .catch((error) => {
        showAlert(error.message, "error-alert");
      });
  };

  return (
    <>
      <Head>
        <title>Volunteering - Dodawanie</title>
      </Head>

      {isLoggedIn && isVerified ? (
        <main className="font-inter flex min-h-screen flex-col py-2">
          <div className="font-semibold text-4xl xl:text-6xl text-main-color my-6 ml-6">
            Dodawanie nowego wolonariatu
          </div>
          <div className="flex flex-row basis-3/5 mx-0 xl:mx-6 justify-center">
            <div className="flex flex-col w-4/5 xl:w-4/6 gap-3">
              <form className="space-y-2" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col w-full">
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
                    <option selected disabled>
                      Wybierz
                    </option>
                    {volunteeringTypesArray.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
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
                    <option selected disabled>
                      Wybierz
                    </option>
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
                    <option selected disabled>
                      Wybierz
                    </option>
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
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
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
