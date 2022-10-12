import { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";

import emailjs from "@emailjs/browser";
import { Alert, showAlert } from "../components/alert";
import { NextSeo } from "next-seo";

const Contact: NextPage = () => {
  const form: React.RefObject<HTMLFormElement> = useRef(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
      title: { value: string };
    };

    const data = {
      name: target.name.value,
      title: target.title.value,
      email: target.email.value,
      message: target.message.value,
    };

    emailjs
      .sendForm(
        `${process.env.emailJsServiceId}`,
        `${process.env.emailJsTemplateId}`,
        form.current!,
        `${process.env.emailJsPublicKey}`
      )
      .then(
        () => {
          // clear form inputs
          target.name.value = "";
          target.title.value = "";
          target.email.value = "";
          target.message.value = "";

          showAlert("Wiadomość wysłana! Dziękujemy 💖");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <main className="bg-background-color">
      <NextSeo 
        title="Volunteering - Kontakt"
        description="Strona kontaktowa serwisu Volunteering. Znajdziesz tutaj informacje o tym jak możesz się z nami skontaktować w celu zgłoszenia błedu lub propozycji do dodania. Zacznij pomagać razem z nami już teraz!"
        canonical="https://volunteering.pl/contact"
        openGraph={{
          url: "https://volunteering.pl/contact",
          title: "Volunteering - Kontakt",
          description: "Strona kontaktowa serwisu Volunteering. Znajdziesz tutaj informacje o tym jak możesz się z nami skontaktować w celu zgłoszenia błedu lub propozycji do dodania. Zacznij pomagać razem z nami już teraz!",
          images: [
            {
              url: "https://volunteering.pl/favicon.ico",
              width: 256,
              height: 256,
              alt: "Volunteering - Kontakt",
            },
          ],
          site_name: "Volunteering",
        }}
      />
      <Head>
        <title>Volunteering - Kontakt</title>
      </Head>
      <div className="flex flex-wrap md:flex-nowrap h-full min-w-screen items-center justify-center xl:justify-start mt-8 md:mt-48">
        <div className="flex flex-col basis-1/3 ml-0 xl:ml-12 mb-52">
          <h1 className="text-8xl font-inter font-semibold text-main-color">
            Twoje zdanie
          </h1>
          <h6 className="flex mt-3 font-inter font-regular text-main-color">
            jest dla nas bardzo ważne, więc jeżeli odkryłeś/aś jakiś błąd lub
            masz propozycję co możemy dodać, pisz śmiało!
          </h6>
        </div>
        <div className="flex basis-1/3"></div>
        <div className="flex basis-1/3 -mt-32 w-full mr-4">
          <form
            onSubmit={handleSubmit}
            ref={form}
            className="ml-0 xl:ml-12 "
          >
            <div className="mb-6">
              <label
                htmlFor="contact-email"
                className="block mb-2 text-md font-inter font-medium text-main-color"
              >
                Twój adres e-mail
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                className="w-[18rem] md:w-[32rem]  h-11 border-2 border-main-color rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-md font-inter font-medium text-main-color"
              >
                Twoje imię
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-[18rem] md:w-[32rem] h-11 border-2 border-main-color rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block mb-2 text-md font-inter font-medium text-main-color"
              >
                Rodzaj zapytania
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-[18rem] md:w-[32rem] h-11 border-2 border-main-color rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-md font-inter font-medium text-main-color"
              >
                Opis
              </label>
              <textarea
                id="message"
                name="message"
                className="w-[18rem] md:w-[32rem] h-52  border-2 border-main-color rounded-md"
              ></textarea>
            </div>
            <div className="mb-8 w-full">
              <button
                type="submit"
                id="submit"
                className="w-36 h-11 border-2 bg-main-color hover:bg-main-color-2 transition text-background-color text-inner text-semibold rounded-lg"
              >
                Wyślij
              </button>
            </div>
          </form>
        </div>
      </div>
      <Alert alertId="alert" color="bg-main-color"></Alert>
    </main>
  );
};

export default Contact;
