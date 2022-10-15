import { verify } from "crypto";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { identitytoolkit } from "@googleapis/identitytoolkit";
import { DateTime } from "luxon";
import { FormEvent, useRef, useState } from "react";
import { humanizeError } from "../../constants";
import { auth, db } from "../../saas/firebase";
import { showAlert } from "../alert";
import { Badge } from "../badge";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

type Props = {
  user: any;
};

export const VerificationModal = ({ user }: Props) => {
  const verificationModalRef = useRef<HTMLDivElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);

  const [phoneNumber, setPhoneNumber]: any = useState("");
  const [showOtpInput, setShowOTPInput] = useState(false);

  const [OTPCode, setOTPCode] = useState("");
  const [verifyButtonText, setVerifyButtonText] = useState(
    "Wyślij kod weryfikacyjny"
  );

  const identityToolkit = identitytoolkit({
    auth: process.env.googleApiKey,
    version: "v3",
  });

  const handleToggleModal = (value: boolean) => {
    const modal = verificationModalRef.current;

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

  const updateUser = async () => {
    getDocs(query(collection(db, "users"), where("uid", "==", user.uid))).then(
      (querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          updateDoc(doc.ref, { verified: true })
            .then(() => {
              showAlert("Zweryfikowano konto!", "success");
              handleToggleModal(false);
            })
            .catch((error: any) => {
              showAlert(error.message, "error-alert");
            });
        });
      }
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(OTPCode);
    if (OTPCode.length === 6) {
        identityToolkit.relyingparty
          .verifyPhoneNumber({
            sessionInfo: window.sessionInfo,
            code: OTPCode,
          })
          .then((res) => {
            console.log(res);
            if (res.data.verified) {
              updateUser();
            }
          })
          .catch((err) => {
            console.log(err);
          });
    } else {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "verify-button",
        {
          size: "invisible",
          callback: (recaptchaToken: any) => {
            identityToolkit.relyingparty
              .sendVerificationCode({
                phoneNumber,
                recaptchaToken: recaptchaToken,
              })
              .then((response: any) => {
                if (response.data.error) {
                  showAlert(
                    humanizeError[response.data.error.message],
                    "error-alert"
                  );
                } else {
                  window.sessionInfo = response.data.sessionInfo;
                  showAlert("Wysłano kod weryfikacyjny!", "success");
                  setVerifyButtonText("Zweryfikuj");
                  setShowOTPInput(true);
                }
              });
          },
        },
        auth
      );
    }
  };

  return (
    <>
      <Badge bgColor="bg-zinc-400">
        <a onClick={() => handleToggleModal(true)} className="cursor-pointer">
          Niezweryfikowany
        </a>
      </Badge>

      {
        <div
          id="verification-modal"
          ref={verificationModalRef}
          tabIndex={-1}
          className="opacity-0 hidden transition fixed inset-0 z-[100] font-inter"
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
                  Zweryfikuj konto
                </h3>
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <label
                      htmlFor="forgot-mail"
                      className="block mb-2 text-sm font-medium text-main-color"
                    >
                      Numer telefonu
                    </label>

                    <PhoneInput
                      onChange={(e) => setPhoneNumber(e)}
                      defaultCountry="PL"
                      id="phone-input"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full h-12 p-2.5"
                      placeholder="+48503245945"
                      value={phoneNumber}
                    />

                    {showOtpInput && (
                      <>
                        <label
                          htmlFor="otp-code"
                          className="block mb-2 text-sm font-medium text-main-color"
                        >
                          Kod
                        </label>
                        <div className="flex flex-row justify-center items-center">
                          <input
                            type="text"
                            id="otp-code"
                            className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full h-12 p-2.5"
                            placeholder="Kod z SMS"
                            onChange={(e) => setOTPCode(e.target.value)}
                          />
                          <button
                            className="w-30 ml-2 h-12 text-white bg-main-color transition hover:bg-main-color-2 font-medium rounded-lg text-sm p-2 text-center"
                            type="submit"
                          >
                            Zweryfikuj konto
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <>
                      <button
                        id="verify-button"
                        className="w-full text-white bg-main-color transition hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                      >
                        {verifyButtonText}
                      </button>
                    </>
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
