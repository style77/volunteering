import {
  createUserWithEmailAndPassword,
  EmailAuthCredential,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { humanizeError } from "../../constants";
import { auth, db } from "../../saas/firebase";
import { Alert, showAlert } from "../alert";

import PasswordStrengthBar from "react-password-strength-bar";

export const registerUser = async (uid: string, name: string, mail: string, birthday: string, photo?: string) => {
  await addDoc(collection(db, "users"), {
    name: name,
    email: mail,
    uid: uid,
    createdAt: new Date(),
    eventsData: {notifications: [], favorite: []}, // There will be saved id of volonteerings that are marked as favorite or that user is subscribed to notifications
    badges: [], // There will be saved badges that user has earned. Hopefully we will have enough time to implement it cuz im obsessed with badges :(
    photo: photo || "https://volunteering.pl/images/blank.png",
    isVerified: false, // This will be used to check if user has verified his phone number
    location: "", // This will be used to save user location
    birthday: birthday, // This will be used to calculate user age
    description: "", // This will be used to save user description
    heldVolunteering: [], // There will be saved id of volunteering that user has held
  });
};

const RegisterModal: NextPage = () => {
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  const username = useRef<HTMLInputElement | null>(null);

  const [verifiedPassword, setVerifiedPassword] = useState("");
  const passwordVerification = useRef<HTMLInputElement | null>(null);

  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday]: any = useState();  // timestamp

  useEffect(() => {
    setTimeout(() => {
      if (username.current) username.current!.focus();
    }, 500);
  }, []);

  const registerWithEmailAndPassword = async () => {
    await createUserWithEmailAndPassword(auth, mail, password)
      .then(async (userCredential) => {
        registerUser(
          userCredential.user.uid,
          name,
          mail,
          birthday,
        ).then(() => {
          showAlert("Zarejestrowano pomyślnie", "register-success");
          return userCredential;
        });
      })
      .catch((error) => {
        showAlert(humanizeError[error.code], "register-error-alert");
      });
    handleToggleModal(false);
  };

  const handleToggleModal = (value: boolean) => {
    const modal = document.getElementById("register-modal");

    if (modal) {
      if (value) modal.classList.toggle("hidden");
      setTimeout(() => {
        if (value) {
          modal.classList.replace("opacity-0", "opacity-100");
        } else {
          modal.classList.replace("opacity-100", "opacity-0");
          setTimeout(() => {
            modal.classList.toggle("hidden");
          }, 500);
        }
      }, 1);
    }
  };

  const handlePasswordVerification = () => {
    if (password === verifiedPassword) {
      passwordVerification.current!.classList.replace(
        "border-red-500",
        "border-gray-300"
      );
      passwordRef.current!.classList.replace(
        "border-red-500",
        "border-gray-300"
      );
    } else {
      passwordVerification.current!.classList.replace(
        "border-gray-300",
        "border-red-500"
      );
      passwordRef.current!.classList.replace(
        "border-gray-300",
        "border-red-500"
      );
    }
  };

  useEffect(() => {
    handlePasswordVerification();
  }, [verifiedPassword, password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password === verifiedPassword) {
      registerWithEmailAndPassword();
    } else {
      showAlert("Hasła nie są takie same", "register-error-alert");
    }
  };

  return (
    <>
      <div className="text-sm font-medium text-gray-800">
        Pierwszy raz?{" "}
        <a
          href="#"
          className="text-blue-700 hover:text-blue-900"
          onClick={() => handleToggleModal(true)}
        >
          Zarejestruj się
        </a>
      </div>
      {
        <div
          id="register-modal"
          tabIndex={-1}
          className="opacity-0 hidden transition fixed inset-0 z-[100] font-inter"
        >
          <div
            className="fixed w-screen h-screen bg-black opacity-50 top-0"
            onClick={() => handleToggleModal(false)}
          ></div>
          <div className="relative p-4 w-full max-w-md h-full grid place-items-center mx-auto">
            <div className="relative bg-background-color rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent transition hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="authentication-modal"
                onClick={() => handleToggleModal(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Zamknij</span>
              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-main-color ">
                  Dołącz do{" "}
                  <span className="text-main-color-2">Volunteering</span>
                </h3>
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <label
                      htmlFor="register-username"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Nazwa
                    </label>
                    <input
                      type="username"
                      name="username"
                      min={6}
                      id="register-username"
                      ref={username}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Marcin Krasucki"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="register-email"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="register-email"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
                      placeholder="m.krasucki@gmail.com"
                      onChange={(e) => setMail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="register-password"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Hasło
                    </label>
                    <input
                      type="password"
                      name="password"
                      minLength={6}
                      id="register-password"
                      ref={passwordRef}
                      placeholder="••••••••"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="register-password"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Powtórz hasło
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="verify-register-password"
                      ref={passwordVerification}
                      placeholder="••••••••"
                      onChange={(e) => {
                        setVerifiedPassword(e.target.value);
                      }}
                      className="bg-gray-50 border border-red-500 text-gray-800 text-sm rounded-lg block w-full p-2.5"
                      required
                    />
                    <PasswordStrengthBar
                      password={password}
                      minLength={6}
                      scoreWords={[
                        "słabe",
                        "słabe",
                        "średnie",
                        "silne",
                        "bardzo silne",
                      ]}
                      shortScoreWord="za krótkie"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="birthday"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Data urodzenia
                    </label>
                    <input
                      id="birthday"
                      type="date"
                      className="rounded-md w-full h-10 text-center"
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <button
                      type="submit"
                      className="w-full text-white bg-main-color transition hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Zarejestruj się
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default RegisterModal;
