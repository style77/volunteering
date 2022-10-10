import {
  collection,
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import Volunteering from "../pages/volunteering";
import { auth, db } from "../saas/firebase";
import { Alert, showAlert } from "./alert";
import LoginModal from "./modals/login";

export const handleDropdownToggle = () => {
  const dropdown = document.getElementById("user-dropdown");

  dropdown!.classList.toggle("hidden");

  setTimeout(() => {
    // We need to wait 1frame before we can replace that class
    if (!dropdown?.classList.contains("hidden")) {
      dropdown?.classList.replace("opacity-0", "opacity-100");
    } else {
      dropdown?.classList.replace("opacity-100", "opacity-0");
    }
  }, 1);
};

export const NavbarUser = (account: {
  photo: string;
  name: string;
  email: string;
}) => {
  useEffect(() => {
    const backdrop = document.getElementById("user-menu-backdrop");
    document.addEventListener("click", (e) => {
      const dropdown = document.getElementById("user-dropdown");

      if (e.target === backdrop && !dropdown!.classList.contains("hidden")) {
        handleDropdownToggle();
      }
    });
  }, []);

  return (
    <>
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-600 rounded-full md:mr-0 focus:ring-2 focus:ring-main-color"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={() => handleDropdownToggle()}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={account.photo}
          alt="user photo"
        />
      </button>
      {
        <div
          className="hidden fixed opacity-0 transition duration-300 mt-60 mr-10 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow"
          id="user-dropdown"
        >
          <div className="py-3 px-4">
            <span className="block text-sm text-main-color-2 font-inter font-semibold">
              {account.name}
            </span>
            <span className="block text-sm text-main-color font-inter font-regular">
              {account.email}
            </span>
          </div>
          <ul className="py-1" aria-labelledby="user-menu-button">
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profil
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
              >
                coś do dodania
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  auth.signOut();
                  showAlert(
                    "Wylogowano pomyślnie. Wracaj do nas jak najszybciej!",
                    "logout-alert"
                  );
                }}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
              >
                Wyloguj się
              </a>
            </li>
          </ul>
        </div>
      }
    </>
  );
};

export const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const [account, setAccount] = useState({ photo: "", name: "", email: "" });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAccount = async () => {
      setLoading(true);
      if (user) {
        if (user.providerData[0].providerId === "google.com") {
          setAccount({
            name: user.displayName,
            photo: user.photoURL,
            email: user.email,
          });
        } else if (user.providerData[0].providerId === "password") {
          const querySnapshot = await getDocs(
            query(collection(db, "users"), where("uid", "==", user.uid))
          );
          const data = querySnapshot.docs[0].data();
          setAccount({
            name: data.name,
            photo: data.photo || "/blank.png",
            email: data.email,
          });
        }
      }
      setLoading(false);
    };

    getAccount();
  }, [user]);

  const toggleNavbar = () => {
    const navbar = document.getElementById("navbar-sticky");
    if (navbar) {
      navbar.classList.toggle("hidden");
    }
  };

  return (
    <>
      <div
        id="user-menu-backdrop"
        className="h-screen w-screen opacity-0 fixed -z-1"
      ></div>
      <nav
        className="bg-background-color py-2.5 z-20 top-0 left-0 w-full drop-shadow-lg"
        id="nav"
      >
        <div className="container flex justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="/volunteering.svg"
              className="h-8 bg-main-color rounded-full px-2 py-2"
              alt="Volunteering"
            />
          </a>
          <div className="flex md:order-2">
            <Link href="/contact">
              <button
                type="button"
                className="text-background-color bg-main-color hover:bg-main-color-2 transition focus:outline-none font-medium font-inter rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
              >
                Napisz do nas
              </button>
            </Link>
            {isLoggedIn ? (
              <div className="flex flex-row justify-center items-center text-main-color hover:text-main-color-2 transition cursor-pointer ml-4">
                <div className="flex flex-row justify-center items-center">
                  {loading ? (
                    <>
                      <div className="animate-pulse rounded-full h-10 w-10 flex mr-2 bg-zinc-400"></div>
                    </>
                  ) : (
                    <>
                      <NavbarUser {...account} />
                    </>
                  )}
                </div>
              </div>
            ) : (
              <LoginModal />
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 mr-2 text-sm text-zinc-400 rounded-lg md:hidden hover:text-zinc-300 transition"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => toggleNavbar()}
            >
              <span className="sr-only font-inter font-semibold">
                Otwórz menu
              </span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden flex flex-col justify-between items-center w-full md:flex md:w-auto md:order-1 md:ml-20 absolute top-11 md:static z-50"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 border-t-2 border-zinc-200 w-full bg-background-color shadow-lg md:shadow-none md:bg-transparent md:w-auto md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 gap-1">
              <li>
                <Link href="/">
                  <a
                    className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                    aria-current="page"
                  >
                    O NAS
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/volunteering">
                  <a
                    className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                    aria-current="page"
                  >
                    ZNAJDŹ WOLONTARIAT
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/submit">
                  <a
                    className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                    aria-current="page"
                  >
                    ZGŁOŚ WOLONTARIAT
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Alert color="bg-red-500" alertId="logout-alert"></Alert>
      <Alert color="bg-main-color" alertId="success"></Alert>
      <Alert alertId="forgot-error-alert" color="bg-red-500"></Alert>
      <Alert alertId="forgot-success-alert" color="bg-red-500"></Alert>
      <Alert color="bg-red-500" alertId="error-alert"></Alert>
      <Alert color="bg-red-500" alertId="register-error-alert"></Alert>
      <Alert color="bg-main-color" alertId="register-success"></Alert>
    </>
  );
};
