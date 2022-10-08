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
        <div className="flex flex-row text-main-color">
          <div className="font-inner">
            <FiThumbsUp className="text-6xl"></FiThumbsUp>
            <p className="text-5xl">Łatwość</p>
            <p className="font-regular text-xl">
              Nasza aplikacja pozwoli Tobie znaleźć <br /> wolontariat lub
              wolontariuszy w kilku krokach.{" "}
            </p>
          </div>
          <div className="font-inner">
            <AiOutlineInfoCircle className="text-7xl "></AiOutlineInfoCircle>
            <p className="text-5xl ">Przejrzystość</p>
            <p className="font-regular text-xl">
              Szukający jak i wystawiający się mają dostęp <br /> do informacji
              dot. doświadczenia wolontariusza.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
