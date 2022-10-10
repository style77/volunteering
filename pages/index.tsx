import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaHandHoldingHeart } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Volunteering</title>
      </Head>
      <main className="flex min-h-screen flex-col py-2">
        <div className="flex flex-row gap-48 mt-20 justify-center">
          <div className="h-screen">
            <div className="flex flex-col">
              <h1 className="flex font-inner font-semibold select-none text-transparent animate-ltr-linear-infinite bg-clip-text bg-gradient-to-r from-main-color via-main-color-2 to-main-color text-6xl 2xl:text-9xl -z-1">
                Wolontariat
              </h1>
              <h2 className="flex font-inner text-main-color select-none text-xl 2xl:text-4xl -z-1">
                to nie tylko zajęcie, lecz chęć <br /> pomagania społeczeństwu
              </h2>
            </div>
          </div>
          <div className="flex absolute ml-48 mt-5 -z-10 opacity-50 2xl:opacity-100 -rotate-[15deg] 2xl:relative 2xl:ml-0 2xl:mt-0 2xl:rotate-0">
            <FaHandHoldingHeart className="flex text-8xl 2xl:text-[25rem] text-main-color" />
          </div>
        </div>

        <div className="ml-10">
          <span className="text-main-color text-5xl 2xl:text-7xl font-bold">
            Jak ułatwimy Tobie{" "}
            <span className="text-main-color-2">wolontariat</span>
          </span>
        </div>

        <div className="flex flex-col 2xl:flex-row text-main-color gap-20 2xl:gap-48 font-inner my-10 w-full justify-center items-center">
          <div className="flex flex-col">
            <FiThumbsUp className="text-6xl"></FiThumbsUp>
            <p className="text-5xl">Łatwość</p>
            <p className="font-regular text-lg">
              Nasza aplikacja pozwoli Tobie znaleźć <br /> wolontariat lub
              wolontariuszy w kilku krokach.{" "}
            </p>
          </div>
          <div className="flex flex-col">
            <AiOutlineInfoCircle className="text-6xl "></AiOutlineInfoCircle>
            <p className="text-5xl ">Przejrzystość</p>
            <p className="font-regular text-lg">
              Szukający jak i wystawiający się mają dostęp <br /> do informacji
              dot. doświadczenia wolontariusza.
            </p>
          </div>
          <div className="flex flex-col">
            <AiOutlineEye className="text-6xl "></AiOutlineEye>
            <p className="text-5xl ">Wygoda i intuicja</p>
            <p className="font-regular text-lg">
              Nasza aplikacja jest intuicyjna i wygodna
            </p>
          </div>
        </div>

        <div className="my-20">
          <div className="ml-10">
            <span className="text-main-color text-7xl font-bold">
              Jak to działa?
            </span>
          </div>

          <div className="flex flex-col 2xl:flex-row text-main-color gap-20 2xl:gap-48 font-inner my-10 w-full justify-center items-center">
            <div className="flex flex-col">
              <span className="text-5xl">Stwórz konto</span>
              <span className="font-regular text-lg">
                Nasza aplikacja pozwoli Tobie znaleźć <br /> wolontariat lub
                wolontariuszy w kilku krokach.{" "}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-5xl ">
                Wystaw się lub znajdź wolontariat
              </span>
              <span className="font-regular text-lg">
                Zadeklaruj swoją chęć do udziału w wolontariacie poprzez
                wystawienie siebie lub znalezienie wolontariatu.
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-5xl ">
                Czekaj na odpowiedź i nieś dobro!
              </span>
              <span className="font-regular text-lg">
                Znajdź odpowiadający Tobie wolontariat, czekaj aż ktoś się do
                Ciebie odezwie, dogadaj szczegóły i nieś dobro ludziom!
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
