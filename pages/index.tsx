import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaHandHoldingHeart } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Volunteering</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        <div>
          <p className="font-inner font-semibold text-main-color text-9xl">
            Wolontariat
          </p>
          <p className="font-inner text-main-color text-4xl">
            to nie tylko zajęcie, lecz chęć <br /> pomagania społeczeństwu
          </p>
        </div>
        <div>
          <FaHandHoldingHeart className="text-[25rem] text-main-color"></FaHandHoldingHeart>
        </div>
        <div className="text-main-color text-7xl mt-28" >
          <p>Jak ułatwimy Tobie <span className="text-main-color-2">wolontariat</span></p>
        </div>
        <div className="flex flex-row text-main-color gap-48 font-inner">
          <div>
            <FiThumbsUp className="text-8xl"></FiThumbsUp>
            <p className="text-6xl">Łatwość</p>
            <p className="font-regular text-lg">
              Nasza aplikacja pozwoli Tobie znaleźć <br /> wolontariat lub
              wolontariuszy w kilku krokach.{" "}
            </p>
          </div>
          <div>
            <AiOutlineInfoCircle className="text-8xl "></AiOutlineInfoCircle>
            <p className="text-6xl ">Przejrzystość</p>
            <p className="font-regular text-lg">
              Szukający jak i wystawiający się mają dostęp <br /> do informacji
              dot. doświadczenia wolontariusza.
            </p>
          </div>
          <div>
            <AiOutlineInfoCircle className="text-8xl "></AiOutlineInfoCircle>
            <p className="text-6xl ">Wygoda i intuicja</p>
            <p className="font-regular text-lg">
              Nasza aplikacja jest intuicyjna i wygodna
            </p>
          </div>

        </div>
        <div className="mt-28">
          <p className="text-main-color text-7xl">Jak to działa?</p>
        </div>
        <div className="font-inner flex flex-row text-main-color gap-48">
          <div>
            <p className="text-6xl font-regular">1</p>
            <p className="text-4xl">Stwórz konto</p>
            <p className="text-lg font-regular">Stwórz konto na naszej stronie i uzupełnij swoje dane.</p>
          </div>
          <div>
            <p className="text-6xl font-regular">2</p>
            <p className="text-4xl">Wystaw się lub znajdź wolontariat</p>
            <p className="text-lg font-regular">Zadeklaruj swoją chęć do udziału w wolontariacie poprzez wystawienie siebie lub znalezienie wolontariatu.</p>
          </div>
          <div>
            <p className="text-6xl font-regular">3</p>
            <p className="text-4xl">Czekaj na odpowiedź i nieś dobro!</p>
            <p className="text-lg font-regular">Czekaj aż ktoś się do Ciebie odezwie, dogadaj szczegóły i nieś dobro ludziom!</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
