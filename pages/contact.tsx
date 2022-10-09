import { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";

import emailjs from "@emailjs/browser";
import { Alert, showAlert } from "../components/alert";

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
      <Head>
        <title>Volunteering - Kontakt</title>
      </Head>
      <div className="flex flex-wrap md:flex-nowrap min-h-screen min-w-screen items-center py-2">
        <div className="flex flex-col basis-1/3 ml-12 mb-52">
          <h1 className="text-8xl font-inner font-semibold text-main-color">
            Twoje zdanie
          </h1>
          <h6 className="flex mt-3 font-inner font-regular text-main-color">
            jest dla nas bardzo ważne, więc jeżeli odkryłeś/aś jakiś błąd lub
            masz propozycję co możemy dodać, pisz śmiało!
          </h6>
        </div>
        <div className="flex basis-1/3"></div>
        <div className="flex basis-1/3 ml-10 -mt-32">
          <form onSubmit={handleSubmit} ref={form}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-inner font-medium text-main-color"
              >
                Twój adres e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-[18rem] md:w-[32rem] mr-20 h-11 border-2 pl-2 border-main-color rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-md font-inner font-medium text-main-color"
              >
                Twoje imię
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-[18rem] md:w-[32rem] mr-20 h-11 border-2 pl-2 border-main-color rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block mb-2 text-md font-inner font-medium text-main-color"
              >
                Rodzaj zapytania
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-[18rem] md:w-[32rem] mr-20 h-11 border-2 pl-2 border-main-color rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-md font-inner font-medium text-main-color"
              >
                Opis
              </label>
              <textarea
                id="message"
                name="message"
                className="w-[18rem] md:w-[32rem] h-52 mr-20 border-2 pl-2 border-main-color rounded-md"
              ></textarea>
            </div>
            <div className="mb-8 w-full">
              <button
                type="submit"
                id="submit"
                className="mr-20 w-36 h-11 border-2 pl-2 bg-main-color text-background-color text-inner text-semibold border-main-color rounded-md"
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
