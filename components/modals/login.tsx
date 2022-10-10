import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { humanizeError } from "../../constants";
import { auth } from "../../saas/firebase";
import { Alert, showAlert } from "../alert";
import ForgotModal from "./forgot";
import RegisterModal from "./register";

const LoginModal = () => {
  const handleToggleModal = (value: boolean) => {
    const modal = document.getElementById("authentication-modal");

    if (modal) {
      if (value) modal.classList.toggle("hidden");
      document.body.classList.toggle("overflow-y-hidden");
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

  const handleGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider).then((result) => {
      const { user } = result;
      // can do something with this but its not that important rn
    });
  };

  const handleEmail = async () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const remember = document.getElementById("remember") as HTMLInputElement;
    await signInWithEmailAndPassword(auth, email.value, password.value).then(
      (userCredential) => {
        const user = userCredential.user;
        auth.setPersistence(
          remember.checked ? inMemoryPersistence : browserSessionPersistence
        );
        showAlert(`Zalogowano pomyślnie 🎉`, "success");
      }
    );
  };

  const handleAuth = async (provider: string) => {
    let handle;
    if (provider == "google") {
      handle = handleGoogle;
    } else if (provider == "email") {
      handle = handleEmail;
    }
    if (handle) {
      handle()
        .then(() => {
          handleToggleModal(false);
        })
        .catch((error) => {
          showAlert(humanizeError[error.code], "error-alert");
        });
    }
  };

  return (
    <>
      <a
        className="flex justify-center items-center text-main-color hover:text-main-color-2 transition cursor-pointer"
        onClick={(e) => {
          handleToggleModal(true);
        }}
      >
        <div className="flex flex-row justify-center ml-4 items-center text-main-color hover:text-main-color-2 transition cursor-pointer">
          <MdOutlineLogin />
          <a className="flex ml-2 mr-1 font-inter font-semibold">Zaloguj</a>
        </div>
      </a>
      {
        <div
          id="authentication-modal"
          tabIndex={-1}
          className="opacity-0 hidden transition fixed inset-0 z-[100] font-inter"
        >
          <div
            className="fixed w-full h-screen bg-black opacity-50"
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
                  Zaloguj się do{" "}
                  <span className="text-main-color-2">Volunteering</span>
                </h3>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
                      placeholder="mail@volunteering.pl"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Hasło
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-50 rounded border border-gray-300"
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        Zapamiętaj mnie
                      </label>
                    </div>
                    <ForgotModal />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <button
                      className="w-full text-white bg-main-color transition hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleAuth("email")}
                    >
                      Zaloguj się
                    </button>

                    <span className="mt-1 text-main-color font-semibold">
                      lub
                    </span>

                    <button
                      className="w-full flex mt-1 items-center transition justify-center text-white bg-main-color hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleAuth("google")}
                    >
                      Zaloguj się z <FaGoogle className="ml-1 text-xl" />
                    </button>
                  </div>
                  <RegisterModal />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LoginModal;
