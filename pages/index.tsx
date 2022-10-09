import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaHandHoldingHeart } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import {AiOutlineEye} from "react-icons/ai"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Volunteering</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        <div className="flex flex-row gap-48 mt-20">
          <div className="h-screen">
            <div className="flex flex-col">
              <h1 className="flex font-inner font-semibold text-transparent animate-ltr-linear-infinite bg-clip-text bg-gradient-to-r from-main-color to-main-color-2 text-6xl lg:text-9xl z-30">
                Wolontariat
              </h1>
              <h2 className="flex font-inner text-main-color text-xl lg:text-4xl z-30">
                to nie tylko zajęcie, lecz chęć <br /> pomagania społeczeństwu
              </h2>
            </div>
          </div>
          <div className="flex absolute ml-48 mt-5 z-10 opacity-50 md:opacity-100 -rotate-[15deg] lg:relative lg:ml-0 lg:mt-0 lg:rotate-0">
            <FaHandHoldingHeart className="flex text-8xl lg:text-[25rem] text-main-color"></FaHandHoldingHeart>
          </div>
        </div>

        <div className="text-main-color text-7xl ">
          <p>
            Jak ułatwimy Tobie{" "}
            <span className="text-main-color-2 font-bold">wolontariat</span>
          </p>
        </div>
        <div className="flex flex-row text-main-color gap-48 font-inner my-10">
          <div>
            <FiThumbsUp className="text-6xl"></FiThumbsUp>
            <p className="text-5xl">Łatwość</p>
            <p className="font-regular text-lg">
              Nasza aplikacja pozwoli Tobie znaleźć <br /> wolontariat lub
              wolontariuszy w kilku krokach.{" "}
            </p>
          </div>
          <div>
            <AiOutlineInfoCircle className="text-6xl "></AiOutlineInfoCircle>
            <p className="text-5xl ">Przejrzystość</p>
            <p className="font-regular text-lg">
              Szukający jak i wystawiający się mają dostęp <br /> do informacji
              dot. doświadczenia wolontariusza.
            </p>
          </div>
          <div>
            <AiOutlineEye className="text-6xl "></AiOutlineEye>
            <p className="text-5xl ">Wygoda i intuicja</p>
            <p className="font-regular text-lg">
              Nasza aplikacja jest intuicyjna i wygodna
            </p>
          </div>
        </div>
        <div className="my-10">
          <p className="text-main-color text-7xl">Jak to działa?</p>
        </div>
        <div className="flex flex-row font-inne text-main-color gap-32  mx-32">
          <div>
            <p className="text-6xl font-regular">1</p>
            <p className="text-4xl">Stwórz konto</p>
            <p className="text-lg font-regular">
              Stwórz konto na naszej stronie i uzupełnij swoje dane.
            </p>
          </div>
          <div>
            <p className="text-6xl font-regular">2</p>
            <p className="text-4xl">Wystaw się lub znajdź wolontariat</p>
            <p className="text-lg font-regular">
              Zadeklaruj swoją chęć do udziału w wolontariacie poprzez
              wystawienie siebie lub znalezienie wolontariatu.
            </p>
          </div>
          <div>
            <p className="text-6xl font-regular">3</p>
            <p className="text-4xl">Czekaj na odpowiedź i nieś dobro!</p>
            <p className="text-lg font-regular">
              Znajdź odpowiadający Tobie wolontariat, czekaj aż ktoś się do
              Ciebie odezwie, dogadaj szczegóły i nieś dobro ludziom!
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
