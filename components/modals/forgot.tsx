import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { humanizeError } from "../../constants";
import { auth } from "../../saas/firebase";
import { Alert, showAlert } from "../alert";

const ForgotModal = () => {
    const [email, setEmail] = useState('');
    const emailRef = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    setTimeout(() => {
      if (emailRef.current) emailRef.current!.focus();
    }, 500);
  }, []);

  const handleToggleModal = (value: boolean) => {
    const modal = document.getElementById("forgot-password-modal");

    if (modal) {
      if (value) modal.classList.toggle("hidden"); document.body.classList.toggle("overflow-y-hidden");
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

  const handleSendPasswordResetEmail = async () => {
    await sendPasswordResetEmail(auth, email)
        .then(() => {
            showAlert(
              "Wysłano link do resetowania hasła",
              "forgot-success-alert"
            );
        })
        .catch((error) => {
            showAlert(humanizeError[error.code], "forgot-error-alert");
        })
        handleToggleModal(false)
    }

  return (
    <>
      <a
        onClick={() => handleToggleModal(true)}
        className="ml-2 text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
      >
        Zapomniałeś hasła?
      </a>
      {
        <div
          id="forgot-password-modal"
          tabIndex={-1}
          className="opacity-0 hidden transition fixed inset-0 z-[100] font-inner"
        >
          <div
            className="fixed w-screen h-screen bg-black opacity-50"
            onClick={() => handleToggleModal(false)}
          ></div>
          <div className="relative p-4 w-full max-w-md h-full grid place-items-center mx-auto">
            <div className="relative bg-background-color rounded-lg shadow">
              <button
                type="submit"
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
                  Przypomnij hasło do konta
                </h3>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="register-username"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      type="mail"
                      name="forgot-mail"
                      id="forgot-mail"
                      ref={emailRef}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
                      placeholder="m.krasucki@gmail.com"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <button
                      className="w-full text-white bg-main-color transition hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleSendPasswordResetEmail()}
                    >
                      Przypomnij hasło
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ForgotModal;
