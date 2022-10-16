import { verify } from "crypto";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  getAuth,
  GoogleAuthProvider,
  EmailAuthProvider,
  UserCredential,
  reauthenticateWithPopup,
  User,
  sendEmailVerification,
} from "firebase/auth";
import {
  collection,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { DateTime } from "luxon";
import { FormEvent, useRef, useState } from "react";
import { humanizeError } from "../../constants";
import { auth, db } from "../../saas/firebase";
import { showAlert } from "../alert";
import { Badge } from "../badge";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import useAuth from "../../hooks/useAuth";

type Props = {
  user: any;
};

export const VerificationModal = ({ user }: Props) => {
  const verificationModalRef = useRef<HTMLDivElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);

  const [phoneNumber, setPhoneNumber]: any = useState("");
  const [showOtpInput, setShowOTPInput] = useState(false);

  const [OTPCode, setOTPCode] = useState("");

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

  const updateUser = () => {
    getDocs(query(collection(db, "users"), where("uid", "==", user.uid))).then(
      (querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          updateDoc(doc.ref, { isVerified: true, phoneNumber: phoneNumber })
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

  const verifyOTP = (verificationId: string, verificationCode: string) => {
    const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
    multiFactor(user.auth.currentUser)
      .enroll(multiFactorAssertion)
      .then(() => {
        updateUser();
        showAlert("Zweryfikowano konto!", "error-alert");
      })
      .catch((error: any) => {
        showAlert(humanizeError[error.code], "error-alert");
      });
  };

  const handleOTP = (user: User) => {
    multiFactor(user)
      .getSession()
      .then((multiFactorSession) => {
        const phoneInfoOptions = {
          phoneNumber: "+" + phoneNumber,
          session: multiFactorSession,
        };
        const phoneProvider = new PhoneAuthProvider(auth);
        phoneProvider
          .verifyPhoneNumber(phoneInfoOptions, window.recaptchaVerifier)
          .then((verificationId) => {
            window.verificationId = verificationId;
            setShowOTPInput(true);
          })
          .catch((error: any) => {
            if (error.code === "auth/unverified-email") {
              sendEmailVerification(user).then(() => {
                showAlert(
                  "Na twój email została wysłana wiadomość z linkiem do weryfikacji.",
                  "error-alert"
                );
              });
            }
            setTimeout(() => {
              console.log(error.code);
              showAlert(humanizeError[error.code], "error-alert")
            }, 3500);
          });
      });
  };

  const onSolvedRecaptcha = () => {
    let provider;
    if (user.providerData[0].providerId === "google.com") {
      provider = new GoogleAuthProvider();
      reauthenticateWithPopup(user.auth.currentUser, provider).then(
        (userCredential: UserCredential) => {
          handleOTP(userCredential.user);
        }
      ).catch((error: any) => {
        showAlert(humanizeError[error.code], "error-alert");
      });
    } else {
      provider = new EmailAuthProvider();
      handleOTP(user.auth.currentUser);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(123);

    if (OTPCode.length === 6) {
      verifyOTP(window.verificationId, OTPCode);
    } else {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "verify-button",
        {
          size: "invisible",
          callback: (response: any) => {},
          "expired-callback": function () {
            showAlert("Captcha wygasła, spróbuj ponownie", "error-alert");
          },
        },
        auth
      );

      getDocs(
        query(collection(db, "users"), where("phoneNumber", "==", phoneNumber))
      )
        .then((querySnapshot: any) => {
          if (querySnapshot.empty) {
            onSolvedRecaptcha()
          } else {
            showAlert("Ten numer telefonu jest już w użyciu", "error-alert");
          }
        })
        .catch((error: any) => {
          console.log(error)
          showAlert(humanizeError[error.code], "error-alert");
        });
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
                      country={"pl"}
                      placeholder="503245945"
                      value={phoneNumber}
                    />

                    {showOtpInput && (
                      <div className="mt-2">
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
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <>
                      {showOtpInput ? (
                        <button
                          id="verify-button"
                          className="w-full text-white bg-main-color transition hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          onClick={() =>
                            verifyOTP(window.verificationId, OTPCode)
                          }
                        >
                          Weryfikuj
                        </button>
                      ) : (
                        <button
                          id="verify-button"
                          className="w-full text-white bg-main-color transition hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          type="submit"
                        >
                          Wyślij kod weryfikacyjny
                        </button>
                      )}
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
