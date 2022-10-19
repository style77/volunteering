/* eslint-disable react/react-in-jsx-scope */
import type { NextPage } from "next"
import Head from "next/head"
import { FaHandHoldingHeart } from "react-icons/fa"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { BiTimer } from "react-icons/bi"
import { AiOutlineEye } from "react-icons/ai"
import { NextSeo } from "next-seo"
import { useEffect } from "react"

const Home: NextPage = () => {
  useEffect(() => {
    const replace = () => {
      setTimeout(function () {
        const replacers = document.querySelectorAll("[data-replace]")
        for (const replacer of replacers) {
          if (replacer instanceof HTMLElement) {
            const replacerDataset = replacer.dataset.replace!
            const replaceClasses = JSON.parse(
              replacerDataset.replace(/'/g, "\"")
            )
            Object.keys(replaceClasses).forEach(function (key) {
              replacer.classList.remove(key)
              replacer.classList.add(replaceClasses[key])
            })
          }
        }
      }, 1)
    }
    replace()
  }, [])

  return (
    <>
      <NextSeo
        title="Volunteering - Zacznij pomagać razem z nami!"
        description="Strona główna serwisu Volunteering. Znajdziesz tutaj informacje o tym jak serwis działa. Zacznij pomagać razem z nami już teraz!"
        canonical="https://volunteering.pl/"
        openGraph={{
          url: "https://volunteering.pl/",
          title: "Volunteering - Zacznij pomagać razem z nami!",
          description:
            "Strona główna serwisu Volunteering. Znajdziesz tutaj informacje o tym jak serwis działa. Zacznij pomagać razem z nami już teraz!",
          images: [
            {
              url: "https://volunteering.pl/favicon.ico",
              width: 256,
              height: 256,
              alt: "Volunteering - Zacznij pomagać razem z nami!",
            },
          ],
          site_name: "Volunteering",
        }}
      />

      <Head>
        <title>Volunteering - Zacznij pomagać razem z nami!</title>
      </Head>
      <main className="flex min-h-screen flex-col py-2">
        <section className="flex flex-col">
          <div className="flex flex-row gap-42 2xl:gap-48 mt-20 justify-center">
            <div className="h-screen">
              <div className="flex flex-col">
                <h1
                  className="flex flex-col font-inter font-semibold select-none text-transparent animate-ltr-linear-infinite bg-clip-text bg-gradient-to-r from-main-color via-main-color-2 to-main-color 
                  text-5xl lg:text-7xl xl:text-9xl -z-[1] duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Wolontariat
                  <span
                    className="flex font-inter text-main-color font-light select-none text-2xl xl:text-4xl -z-[1] delay-300 duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                    data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                  >
                    to nie tylko zajęcie, lecz chęć <br /> pomagania
                    społeczeństwu
                  </span>
                </h1>

                <div
                  className="flex justify-center items-center align-middle mt-56 z-0 cursor-pointer"
                  id="find-out-more"
                >
                  <a
                    href="#what-is-volunteering"
                    className="xl:w-full xl:h-full delay-500 duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                    data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                  >
                    <button className="h-14 w-48 text-md xl:h-18 xl:w-52 xl:text-xl relative font-semibold font-inter bottom-20 xl:bottom-0 bg-main-color hover:bg-main-color-2 transition text-background-color rounded-lg">
                      Dowiedz się więcej!
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex absolute ml-48 mt-5 -z-[1] opacity-50 xl:opacity-100 -rotate-[15deg] xl:relative xl:ml-0 xl:mt-0 xl:rotate-0">
              <FaHandHoldingHeart className="flex text-8xl xl:text-[25rem] -z-[1] text-main-color" />
            </div>
          </div>
        </section>

        <section className="mt-10 xl:mt-0">
          <div className="ml-10 select-none" id="what-is-volunteering">
            <h2
              className="text-main-color text-5xl xl:text-6xl font-bold duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
              data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
            >
              Nasze zalety podczas szukania{" "}
              <span className="text-transparent animate-ltr-linear-infinite bg-clip-text bg-gradient-to-r from-main-color-2 via-main-color-3 to-main-color-2">
                wolontariatu
              </span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row text-main-color gap-20 xl:gap-48 font-inter my-10 w-full justify-center xl:items-center px-10 select-none">
            <div className="flex flex-col">
              <div className="flex flex-row xl:justify-items-start justify-items-center">
                <div
                  className="delay-100 duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  <BiTimer className="flex text-4xl mr-2 my-2" />
                </div>
                <p
                  className="text-4xl flex delay-100 duration-700 transform opacity-0 transition-all translate-y-12 ease-out my-2"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Szybkość
                </p>
              </div>
              <p
                className="font-regular text-lg delay-200 duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
              >
                Nasza aplikacja pozwoli Tobie znaleźć <br /> wolontariat lub
                wolontariuszy w kilku krokach.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div
                  className="delay-300 duration-700 transform opacity-0 transition-all translate-y-12 ease-out my-2"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  <AiOutlineInfoCircle className="flex text-4xl mr-2" />
                </div>
                <p
                  className="text-4xl flex delay-300 duration-700 transform opacity-0 transition-all translate-y-12 ease-out my-2"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Przejrzystość
                </p>
              </div>
              <p
                className="font-regular text-lg delay-[400ms] duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
              >
                Szukający jak i wystawiający się mają dostęp <br /> do
                informacji dot. doświadczenia wolontariusza.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div
                  className="delay-500 duration-700 transform opacity-0 transition-all translate-y-12 ease-out my-2"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  <AiOutlineEye className="flex text-4xl mr-2" />
                </div>
                <p
                  className="text-4xl flex delay-500 duration-700 transform opacity-0 transition-all translate-y-12 ease-out my-2"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Intuicja
                </p>
              </div>
              <p
                className="font-regular text-lg delay-[600ms] duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
              >
                Nasza aplikacja jest prosta w użyciu i bardzo intuicyjna.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-10 xl:mt-0">
          <div className="select-none">
            <div className="ml-10">
              <h2
                className="text-main-color text-6xl font-bold delay-700 duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
              >
                Jak to{" "}
                <span className="text-transparent animate-ltr-linear-infinite bg-clip-text bg-gradient-to-r from-main-color-2 via-main-color-3 to-main-color-2">
                  działa?
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row px-10 select-none text-main-color gap-10 xl:gap-36 font-inter my-10 w-full justify-center items-start">
              <div className="flex flex-col basis-1/3 ">
                <span
                  className="text-4xl z-10 delay-[800ms] duration-700 transform opacity-0 transition-all translate-y-12 ease-out my-2"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Stwórz konto
                </span>
                <span
                  className="font-regular text-lg z-10 delay-[900ms] duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Nasza aplikacja pozwoli Tobie znaleźć <br /> wolontariat lub
                  wolontariuszy w kilku krokach.{" "}
                </span>
              </div>
              <div className="flex flex-col basis-1/3">
                <span
                  className="text-4xl delay-1000 duration-700 transform opacity-0 transition-all translate-y-12 ease-out my-2"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Wystaw się lub znajdź wolontariat
                </span>
                <span
                  className="font-regular text-lg delay-[1100ms] duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Zadeklaruj swoją chęć do udziału w wolontariacie poprzez
                  wystawienie siebie lub znalezienie wolontariatu.
                </span>
              </div>
              <div className="flex flex-col basis-1/3">
                <span
                  className="text-4xl delay-[1200ms] duration-700 transform opacity-0 transition-all translate-y-12 ease-out my-2"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Czekaj na odpowiedź i nieś dobro!
                </span>
                <span
                  className="font-regular text-lg delay-[1300ms] duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
                  data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
                >
                  Znajdź odpowiadający Tobie wolontariat, czekaj aż ktoś się do
                  Ciebie odezwie, dogadaj szczegóły i nieś dobro ludziom!
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <div
        className="hidden xl:block w-full h-8 absolute  -bottom-3 bg-gradient-to-r from-main-color-2 via-main-color-3 to-main-color-2"
        style={{ backgroundPosition: "20rem 0" }}
      ></div> */}
      <div className="custom-shape-divider-bottom-1666200219 z-1">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="custom-shape-divider-top-1666200276 mt-[100vh] z-1">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </>
  )
}

export default Home
