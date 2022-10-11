import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaHandHoldingHeart } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Volunteering - Strona główna"
        description="Strona główna serwisu Volunteering. Znajdziesz tutaj informacje o tym jak serwis działa. Zacznij pomagać razem z nami już teraz!"
        canonical="https://volunteering.pl/"
        openGraph={{
          url: "https://volunteering.pl/",
          title: "Volunteering - Strona główna",
          description:
            "Strona główna serwisu Volunteering. Znajdziesz tutaj informacje o tym jak serwis działa. Zacznij pomagać razem z nami już teraz!",
          images: [
            {
              url: "https://volunteering.pl/favicon.ico",
              width: 256,
              height: 256,
              alt: "Volunteering - Strona główna",
            },
          ],
          site_name: "Volunteering",
        }}
      />

      <Head>
        <title>Volunteering</title>
      </Head>
      <main className="flex min-h-screen flex-col py-2">
        <div className="flex flex-col">
          <div className="flex flex-row gap-42 2xl:gap-48 mt-20 justify-center">
            <div className="h-screen">
              <div className="flex flex-col">
                <h1 className="flex font-inter font-semibold select-none text-transparent animate-ltr-linear-infinite bg-clip-text bg-gradient-to-r from-main-color via-main-color-2 to-main-color text-6xl xl:text-9xl -z-1">
                  Wolontariat
                </h1>
                <h2 className="flex font-inter text-main-color select-none text-xl xl:text-4xl -z-1">
                  to nie tylko zajęcie, lecz chęć <br /> pomagania społeczeństwu
                </h2>

                <div className="flex justify-center items-center align-middle mt-56 cursor-pointer">
                  <a
                    href="#what-is-volunteering"
                    className="xl:w-full xl:h-full"
                  >
                    <button
                      id="find-out-more"
                      className="h-16 w-52 text-xl relative font-semibold font-inter bg-main-color hover:bg-main-color-2 transition text-background-color rounded-lg z-0"
                    >
                      Dowiedz się więcej!
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex absolute ml-48 mt-5 -z-10 opacity-50 xl:opacity-100 -rotate-[15deg] xl:relative xl:ml-0 xl:mt-0 xl:rotate-0">
              <FaHandHoldingHeart className="flex text-8xl xl:text-[25rem] text-main-color" />
            </div>
          </div>
        </div>

        <div className="ml-10 select-none" id="what-is-volunteering">
          <span className="text-main-color text-5xl xl:text-7xl font-bold">
            Jak ułatwimy Tobie{" "}
            <span className="text-transparent animate-ltr-linear-infinite bg-clip-text bg-gradient-to-r from-main-color-2 via-main-color-3 to-main-color-2">
              wolontariat
            </span>
          </span>
        </div>

        <div className="flex flex-col xl:flex-row text-main-color gap-20 xl:gap-48 font-inter my-10 w-full justify-center xl:items-center pl-10">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <p className="text-3xl flex">Łatwość</p>
              <FiThumbsUp className="flex text-4xl ml-2"></FiThumbsUp>
            </div>
            <p className="font-regular text-md">
              Nasza aplikacja pozwoli Tobie znaleźć <br /> wolontariat lub
              wolontariuszy w kilku krokach.{" "}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <p className="text-3xl flex">Przejrzystość</p>
              <AiOutlineInfoCircle className="flex text-4xl ml-2"></AiOutlineInfoCircle>
            </div>
            <p className="font-regular text-md">
              Szukający jak i wystawiający się mają dostęp <br /> do informacji
              dot. doświadczenia wolontariusza.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <p className="text-3xl flex">Intuicja</p>
              <AiOutlineEye className="flex text-4xl ml-2"></AiOutlineEye>
            </div>
            <p className="font-regular text-md">
              Nasza aplikacja jest intuicyjna
            </p>
          </div>
        </div>

        <div className="py-40">
          <div className="ml-10">
            <span className="text-main-color text-7xl font-bold">
              Jak to działa?
            </span>
          </div>

          <div className="flex flex-col xl:flex-row pl-10 select-none text-main-color gap-20 xl:gap-48 font-inter my-10 w-full justify-center">
            <div className="flex flex-col basis-1/5">
              <span className="text-3xl z-10">Stwórz konto</span>
              <span className="font-regular text-md z-10">
                Nasza aplikacja pozwoli Tobie znaleźć <br /> wolontariat lub
                wolontariuszy w kilku krokach.{" "}
              </span>
              <span className="absolute ml-20 -mt-4 xl:mt-0 -z-1 text-9xl text-main-color/50 text-inter text-bold">
                1
              </span>
            </div>
            <div className="flex flex-col basis-1/3">
              <span className="text-3xl">
                Wystaw się lub znajdź wolontariat
              </span>
              <span className="font-regular text-md">
                Zadeklaruj swoją chęć do udziału w wolontariacie poprzez
                wystawienie siebie lub znalezienie wolontariatu.
              </span>
              <span className="absolute ml-20 xl:ml-40 -mt-8 xl:-mt-2 -z-1 text-9xl text-main-color/50 text-inter text-bold">
                2
              </span>
            </div>
            <div className="flex flex-col basis-1/3">
              <span className="text-3xl">
                Czekaj na odpowiedź i nieś dobro!
              </span>
              <span className="font-regular text-md">
                Znajdź odpowiadający Tobie wolontariat, czekaj aż ktoś się do
                Ciebie odezwie, dogadaj szczegóły i nieś dobro ludziom!
              </span>
              <span className="absolute ml-20 xl:ml-40 -mt-6 xl:-mt-2 -z-1 text-9xl text-main-color/50 text-inter text-bold">
                3
              </span>
            </div>
          </div>
        </div>
      </main>
      <div
        className="hidden xl:block w-full h-8 absolute  -bottom-3 bg-gradient-to-r from-main-color-2 via-main-color-3 to-main-color-2"
        style={{ backgroundPosition: "20rem 0" }}
      ></div>
    </>
  );
};

export default Home;
