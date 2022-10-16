import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  browserSessionPersistence,
  inMemoryPersistence,
  getMultiFactorResolver,
  PhoneAuthProvider,
  RecaptchaVerifier,
  MultiFactorError,
  PhoneMultiFactorGenerator,
  MultiFactorResolver,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { humanizeError } from "../../constants";
import { auth, db } from "../../saas/firebase";
import { Alert, showAlert } from "../alert";
import ForgotModal from "./forgot";
import { MfaModal } from "./mfa";
import RegisterModal, { registerUser } from "./register";

export const toggleLogin = () => {
  const loginButton = document.getElementById("login-button");
  loginButton?.click();
};

type Props = {
  closeUserDropdown: () => void;
};

const LoginModal = ({ closeUserDropdown }: Props) => {
  const modal = useRef<HTMLDivElement>(null);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const remember = useRef<HTMLInputElement>(null);

  const [showMfaModal, setShowMfaModal] = useState(false);
  const [mfError, setMfError] = useState<MultiFactorError>();
  const [mfaResolver, setMfaResolver] = useState<MultiFactorResolver>();

  const [authType, setAuthType] = useState("")

  const handleToggleModal = (value: boolean) => {
    if (!value) {
      document.body.classList.remove("overflow-y-hidden");
      closeUserDropdown();
    } else {
      document.body.classList.add("overflow-y-hidden");
    }

    // There are some weird problems with "Dowiedz się więcej" button
    // It's not working properly when you open login modal
    // So I need to change its z-index
    // It's junky code but what can I do :(
    const findOutMoreButton = document.getElementById("find-out-more");

    if (value) {
      // show modal
      modal.current!.classList.toggle("hidden");

      setTimeout(() => {
        modal.current!.classList.replace("opacity-0", "opacity-100");
        email.current!.focus();
      }, 1);
      if (findOutMoreButton) {
        findOutMoreButton.classList.replace("z-0", "-z-[1]");
      }
    } else {
      // hide modal
      if (findOutMoreButton) {
        findOutMoreButton.classList.replace("-z-[1]", "z-0");
      }

      modal.current?.classList.replace("opacity-100", "opacity-0");
      setTimeout(() => {
        modal.current!.classList.toggle("hidden");
      }, 500);
    }
  };

  const handleGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider).then(async (result) => {
      const { user } = result;
      console.log(user);
      if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          registerUser(
            user.uid,
            user.displayName!,
            user.email!,
            "",
            user.photoURL!
          );
          showAlert(
            `Zarejestrowano pomyślnie 🎉\nTeraz odśwież stronę`,
            "success"
          );
        } else {
          showAlert(`Zalogowano pomyślnie 🎉`, "success");
        }
      }
      // can do something with this but its not that important rn
    });
  };

  const handleEmail = async () => {
    await signInWithEmailAndPassword(
      auth,
      email.current!.value,
      password.current!.value
    ).then((userCredential) => {
      auth.setPersistence(
        remember.current!.checked
          ? inMemoryPersistence
          : browserSessionPersistence
      );
      showAlert(`Zalogowano pomyślnie 🎉`, "success");
    });
  };

  const handleAuth = async (provider: string) => {
    if (provider == "google") {
      handleGoogle()
        .then(() => {
          handleToggleModal(false);
        })
        .catch((error) => {
          showAlert(humanizeError[error.code], "error-alert");

          if (error.code === "auth/multi-factor-auth-required") {
            const resolver = getMultiFactorResolver(auth, error);
            setMfaResolver(resolver);
            setMfError(error);
            setShowMfaModal(true);
          }
        });
    } else if (provider == "email") {
      handleEmail()
        .then(() => {
          handleToggleModal(false);
        })
        .catch((error) => {
          showAlert(humanizeError[error.code], "error-alert");

          if (error.code === "auth/multi-factor-auth-required") {
            const resolver = getMultiFactorResolver(auth, error);
            setMfaResolver(resolver);
            setMfError(error);
            setShowMfaModal(true);
          }
        });
    }
  };

  return (
    <>
      <a
        className="flex justify-center items-center text-main-color hover:text-main-color-2 transition cursor-pointer"
        id="login-button"
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
          ref={modal}
          tabIndex={-1}
          className="opacity-0 hidden transition duration-300 absolute inset-0 z-[100] font-inter"
        >
          {showMfaModal && (
            <MfaModal
              setShowMfaModal={setShowMfaModal}
              handleParentModalToggle={handleToggleModal}
              mfError={mfError!}
              mfaResolver={mfaResolver!}
            />
          )}

          <div
            className="absolute inset-0 w-full h-screen bg-black/50"
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
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAuth(authType);
                  }}
                >
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
                      ref={email}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
                      placeholder="m.krasucki@gmail.com"
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
                      ref={password}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          ref={remember}
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
                      onClick={() => setAuthType("email")}
                      type="submit"
                    >
                      Zaloguj się
                    </button>

                    <span className="mt-1 text-main-color font-semibold">
                      lub
                    </span>

                    <button
                      className="w-full flex mt-1 items-center transition justify-center text-white bg-main-color hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => setAuthType("google")}
                      type="submit"
                    >
                      Zaloguj się z <FaGoogle className="ml-1 text-xl" />
                    </button>
                  </div>
                  <RegisterModal />
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LoginModal;
