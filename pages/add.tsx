import { terminate } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Add: NextPage = () => {
  const [volunteeringName, setVolunteeringName] = useState("");
  const [fundationName, setFundationName] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [term, setTerm] = useState("");
  const [paid, setPaid] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <Head>
        <title>Volunteering - Dodawanie</title>
      </Head>
      <main className="font-inter flex min-h-screen flex-col py-2">
        <div className="font-semibold text-4xl xl:text-6xl text-main-color my-6 ml-6">
          Dodawanie nowego wolonariatu
        </div>
        <div className="flex flex-row basis-3/5 mx-0 xl:mx-6 justify-center">
          <div className="flex flex-col w-4/5 xl:w-4/6 gap-3">
            <div className="flex flex-col w-full">
              <label htmlFor="volunteering-name" className="text-main-color ">
                Nazwa wolontariatu
              </label>
              <input
                id="volunteering-name"
                value={volunteeringName}
                onChange={(e) => setVolunteeringName(e.target.value)}
                className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
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
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="volunteering-city" className="text-main-color ">
                Miasto
              </label>
              <input
                id="volunteering-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="volunteering-type" className="text-main-color ">
                Wolontariat
              </label>
              <select
                id="volunteering-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
              >
                <option selected disabled>
                  Wybierz
                </option>
                <option value="sport">sportowy</option>
                <option value="hospice">w hospicjum</option>
                <option value="child-care-house">w domu dziecka</option>
                <option value="hospital">w szpitalu</option>
                <option value="ngo">w NGO</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="volunteering-term" className="text-main-color ">
                Czas pełnienia wolontariatu
              </label>
              <select
                id="volunteering-term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
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
              >
                <option selected disabled>
                  Wybierz
                </option>
                <option value="not-paid">Bezpłatne </option>
                <option value="paid">Płatne </option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="volunteering-image" className="text-main-color ">
                Link do zdjęcia
              </label>
              <input
                id="volunteering-image"
                onChange={(e) => setImage(e.target.value)}
                value={image}
                placeholder="wymiary obrazu muszą być kwadratem np. 64px x 64px"
                className="resize-none rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Add;
