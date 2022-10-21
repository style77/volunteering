/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
import {
  getMultiFactorResolver,
  MultiFactorError,
  MultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from "firebase/auth"
import { useRef, useState } from "react"
import { humanizeError } from "../../constants"
import { auth } from "../../saas/firebase"
import { showAlert } from "../alert"

type Props = {
  setShowMfaModal: Function;
  handleParentModalToggle: Function;
  mfError: MultiFactorError;
  mfaResolver: MultiFactorResolver;
};

export const MfaModal = ({
  setShowMfaModal,
  handleParentModalToggle,
  mfError,
  mfaResolver,
}: Props) => {
  const modal = useRef<HTMLDivElement | null>(null)

  const [otpCode, setOtpCode] = useState("")
  const [inputDisabled, setInputDisabled] = useState(true)
  const [otpSent, setOtpSent] = useState(false)

  const sendMFA = () => {
    const MFArecaptchaVerifier = new RecaptchaVerifier(
      "mfa-recaptcha",
      {
        size: "invisible",
      },
      auth
    )

    const phoneInfoOptions = {
      multiFactorHint: mfaResolver.hints[0],
      session: mfaResolver.session,
    }
    const phoneAuthProvider = new PhoneAuthProvider(auth)
    // Send SMS verification code
    phoneAuthProvider
      .verifyPhoneNumber(phoneInfoOptions, MFArecaptchaVerifier)
      .then((verificationId: string) => {
        setInputDisabled(false)
        setOtpSent(true)
        window.MfaVerificationId = verificationId
      })
  }

  const handleMFA = () => {
    const resolver = getMultiFactorResolver(auth, mfError)

    const cred = PhoneAuthProvider.credential(
      window.MfaVerificationId,
      otpCode
    )
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred)

    resolver
      .resolveSignIn(multiFactorAssertion)
      .then(() => {
        showAlert("Zalogowano pomyślnie 🎉", "success")
        setShowMfaModal(false)
        handleParentModalToggle(false)
      })
      .catch((error) => {
        showAlert(humanizeError[error.code], "error-alert")
      })
  }

  const handleToggleModal = (value: boolean) => {
    if (modal.current) {
      if (value) modal.current.classList.toggle("hidden")
      setTimeout(() => {
        if (value) {
          modal.current?.classList.replace("opacity-0", "opacity-100")
        } else {
          modal.current?.classList.replace("opacity-100", "opacity-0")
          setTimeout(() => {
            modal.current?.classList.toggle("hidden")
            setShowMfaModal(false)
          }, 500)
        }
      }, 1)
    }
  }

  return (
    <>
      <div
        id="forgot-password-modal"
        ref={modal}
        tabIndex={-1}
        className="opacity-100 transition fixed inset-0 z-[1000] font-inter"
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
                 Weryfikacja dwuetapowa
              </h3>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="forgot-mail"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    Kod
                  </label>
                  <input
                    type="text"
                    name="otp-code"
                    id="otp-code"
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full h-12 p-2.5 disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                    placeholder="193487"
                    disabled={inputDisabled}
                    required
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  {otpSent ? (
                    <button
                      className="w-full text-white bg-main-color transition hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleMFA()}
                      id="mfa-recaptcha"
                    >
                      Sprawdź kod
                    </button>
                  ) : (
                    <button
                      className="w-full text-white bg-main-color transition hover:bg-main-color-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => sendMFA()}
                      id="mfa-recaptcha"
                    >
                      Wyślij kod
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
