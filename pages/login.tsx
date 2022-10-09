import { NextPage } from "next";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Alert, showAlert } from "../components/alert";
import useAuth from "../hooks/useAuth";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../saas/firebase";
import { humanizeError } from "../constants";

const Login: NextPage = () => {
  const { user, isLoggedIn } = useAuth();

  const handleAuth = async (provider: string) => {
    if (provider == "google") {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider)
        .then((result) => {
          const { user } = result;
          console.log(user);
        })
        .catch((error) => {
          showAlert(error.message);
        });
    } else if (provider == "email") {
      const email = document.getElementById("email") as HTMLInputElement;
      const password = document.getElementById("password") as HTMLInputElement;
      await signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          showAlert(humanizeError[error.code], "error-alert");
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      showAlert(
        "Jesteś już zalogowany! Za 3 sekundy zostaniesz przeniesiony.",
        "error-alert"
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-top">
      <div className="flex basis-1/5 mt-28">
        <h1 className="text-main-color text-8xl font-inner font-semibold">
          Zaloguj się
        </h1>
      </div>
      <div className="flex mt-16">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row">
            <div className="flex flex-col gap-2 items-center justify-center">
              <input
                type="text"
                placeholder="Email"
                id="email"
                className="h-11 border-2 pl-2 border-main-color rounded-md"
              ></input>
              <input
                type="password"
                id="password"
                placeholder="Hasło"
                className="h-11 border-2 pl-2 border-main-color rounded-md"
              ></input>
            </div>
            <div
              onClick={() => handleAuth("email")}
              className="flex flex-row cursor-pointer absolute ml-52 mt-7 items-center justify-center bg-main-color hover:bg-main-color-2 transition rounded-full w-10 h-10 text-background-color text-2xl"
            >
              <IoMdArrowRoundForward />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex mt-3">
              <a
                href="#"
                className="text-main-color hover:text-main-color-2 transition font-inner font-regular"
              >
                Przypomnij hasło
              </a>
            </div>
            <div className="flex mt-3">
              <a
                className="text-main-color hover:text-main-color-2 transition font-inner font-regular"
              >
                Zarejestruj się
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center align-center mt-3">
            <h2 className="flex text-xl font-bold font-inner text-main-color mb-3">
              LUB
            </h2>
            <button
              type="button"
              className="text-white bg-main-color hover:bg-main-color-2 transition gap-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-2"
              onClick={() => handleAuth("google")}
            >
              <FaGoogle />
              {""}Zaloguj się
            </button>
          </div>
        </div>
      </div>
      <Alert color="bg-red-500" alertId="error-alert"></Alert>
      <Alert color="bg-main-color" alertId="success"></Alert>
    </main>
  );
};

export default Login;
