import { NextPage } from "next";
import Head from "next/head";

const Contact: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center py-2">
      <Head>
        <title>Volunteering - Kontakt</title>
      </Head>
      <div className="flex flex-row">
        <h1 className="text-6xl font-inner font-semibold text-main-color">
          Twoje zdanie
        </h1>
      </div>
      <div className="flex flex-row">
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">
              Twój adres e-mail
            </label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2">
              Twoje imię
            </label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="mb-6">
            <label htmlFor="question_type" className="block mb-2">
              Rodzaj zapytania
            </label>
            <select id="question_type" name="question_type">
              <option value="question">Pytanie</option>
              <option value="suggestion">Sugestia</option>
              <option value="complaint">Reklamacja</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2">
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
  );
};

export default Contact;
