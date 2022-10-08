import { NextPage } from "next";
import Head from "next/head";

const Contact: NextPage = () => {
  return (
    <main className="bg-background-color">
      <Head>
        <title>Volunteering - Kontakt</title>
      </Head>
      <div className="flex min-h-screen min-w-screen items-center py-2">
        <div className="flex flex-col basis-1/3 ml-10 mb-56">
          <h1 className="text-8xl font-inner font-semibold text-main-color">
            Twoje zdanie
          </h1>
          <h6 className="flex mt-3 font-inner font-regular text-main-color">
            jest dla nas bardzo ważne, więc jeżeli odkryłeś/aś jakiś błąd lub
            masz propozycję co możemy dodać, pisz śmiało!
          </h6>
        </div>
        <div className="flex basis-2/3 ml-10">
          <form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-inner font-medium text-main-color"
              >
                Twój adres e-mail
              </label>
              <input type="email" id="email" name="email" className="w-full h-11 border-2 border-main-color rounded-md" />
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-md font-inner font-medium text-main-color"
              >
                Twoje imię
              </label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block mb-2 text-md font-inner font-medium text-main-color"
              >
                Rodzaj zapytania
              </label>
              <input type="text" id="title" name="title" />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-md font-inner font-medium text-main-color"
              >
                Opis
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
