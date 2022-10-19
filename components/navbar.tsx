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
import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdOutlineLogin } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import Volunteering from "../pages/volunteering";
import { auth, db } from "../saas/firebase";
import { Alert, showAlert } from "./alert";
import LoginModal from "./modals/login";

export const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const [userDropdownShown, setUserDropdownShown] = useState(false);

  const userDropdown = useRef<HTMLDivElement>(null);
  const userMenuBackdrop = useRef<HTMLDivElement>(null);

  // mobile menu state
  const navbar = useRef<HTMLDivElement>(null);
  const [navbarShown, setShowNavbar] = useState(false);

  useEffect(() => {
    const getAccount = async () => {
      setLoading(true);
      if (user) {
        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("uid", "==", user.uid))
        );
        const snapshotData = querySnapshot.docs[0].data();

        setData(Object.assign({}, snapshotData, user));
      }

      setLoading(false);
    };

    if (Object.keys(data).length === 0) getAccount();
  }, [user]);

  const showDropdown = () => {
    setUserDropdownShown(true);

    // change backdrop's z-index
    userMenuBackdrop.current!.classList.replace("-z-[1]", "z-0");

    userDropdown.current!.classList.toggle("hidden");
    setTimeout(() => {
      userDropdown.current!.classList.replace("opacity-0", "opacity-100");
      userMenuBackdrop.current!.classList.replace("opacity-0", "opacity-100");
    }, 1);
  };

  const hideDropdown = () => {
    setUserDropdownShown(false);

    // change backdrop's z-index
    userMenuBackdrop.current?.classList.replace("z-0", "-z-[1]");

    userDropdown.current?.classList.replace("opacity-100", "opacity-0");
    userMenuBackdrop.current?.classList.replace("opacity-100", "opacity-0");
    setTimeout(() => {
      userDropdown.current?.classList.toggle("hidden");
    }, 300);
  };

  const handleDropdownToggle = () => {
    if (!userDropdownShown) showDropdown();
    else hideDropdown();
  };

  const showNavbar = () => {
    setShowNavbar(true);

    // change backdrop's z-index
    userMenuBackdrop.current!.classList.replace("-z-[1]", "z-0");

    navbar.current!.classList.remove("hidden");
    setTimeout(() => {
      navbar.current!.classList.replace("opacity-0", "opacity-100");
      navbar.current!.classList.replace("translate-y-0", "translate-y-1");
    }, 1);
  };

  const hideNavbar = () => {
    setShowNavbar(false);

    // change backdrop's z-index
    userMenuBackdrop.current!.classList.replace("z-0", "-z-[1]");

    navbar.current!.classList.replace("opacity-100", "opacity-0");
    navbar.current!.classList.replace("translate-y-1", "translate-y-0");
    setTimeout(() => {
      navbar.current!.classList.add("hidden");
    }, 300);
  };

  const toggleNavbar = () => {
    if (!navbarShown) showNavbar();
    else hideNavbar();
  };

  const handleBackdrop = () => {
    if (userDropdownShown) {
      hideDropdown();
    }

    if (navbarShown) {
      hideNavbar();
    }
  };

  return (
    <>
      <div
        id="user-menu-backdrop"
        ref={userMenuBackdrop}
        className="h-screen w-screen opacity-0 fixed -z-[1]"
        onClick={() => handleBackdrop()}
      ></div>
      <nav
        className="bg-background-color py-2.5 z-20 top-0 left-0 w-full drop-shadow-lg"
        id="nav"
      >
        <div className="container flex justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <div className="ml-2 hidden lg:block">
              <img
                src="/volunteering.svg"
                className="h-6"
                alt="Volunteering logo"
              />
            </div>
            <div className="p-3 ml-2 block lg:hidden">
              <img src="/icon.svg" className="h-5" alt="Volunteering logo" />
            </div>
          </a>
          <div className="flex xl:order-2">
            <Link href="/contact">
              <button
                type="button"
                className="hidden xl:block shadow-md text-background-color bg-main-color hover:bg-main-color-2 transition focus:outline-none font-medium font-inter rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Napisz do nas
              </button>
            </Link>
            {isLoggedIn ? (
              <div className="flex flex-row justify-center items-center text-main-color hover:text-main-color-2 transition ml-4">
                <div className="flex flex-row justify-center items-center">
                  {loading ? (
                    <>
                      <div className="animate-pulse rounded-full h-10 w-10 flex mr-2 bg-zinc-400 shadow-md"></div>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="flex mr-3 text-sm bg-gray-600 rounded-full xl:mr-0 focus:ring-2 shadow-md focus:ring-main-color"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                        onClick={() => handleDropdownToggle()}
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={data.photoURL}
                          alt="user avatar"
                        />
                      </button>
                      <div
                        className="hidden fixed opacity-0 transition duration-300 mt-60 mr-44 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-md"
                        id="user-dropdown"
                        ref={userDropdown}
                      >
                        <div className="py-3 px-4">
                          <span className="block text-sm text-main-color-2 font-inter font-semibold">
                            {data.displayName}
                          </span>
                          <span className="block text-sm text-main-color font-inter font-regular">
                            {data.email}
                          </span>
                        </div>
                        <ul className="py-1" aria-labelledby="user-menu-button">
                          <li>
                            <Link href="profile">
                              <a
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => hideDropdown()}
                              >
                                Profil
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="myList">
                              <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                Moja lista
                              </a>
                            </Link>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                auth.signOut();
                                showAlert(
                                  "Wylogowano pomyślnie. Wracaj do nas jak najszybciej!",
                                  "logout-alert"
                                );
                                hideDropdown();
                              }}
                              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              Wyloguj się
                            </a>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <LoginModal closeUserDropdown={hideDropdown} />
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 mr-2 text-sm text-zinc-400 rounded-lg xl:hidden hover:text-zinc-300 transition"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => toggleNavbar()}
            >
              <span className="sr-only font-inter font-semibold">
                Otwórz menu
              </span>
              <FiMenu className="text-main-color hover:text-main-color-2 text-xl" />
            </button>
          </div>
          <div
            className="hidden flex opacity-0 xl:opacity-100 transition duration-300 flex-col justify-between items-center w-full xl:flex xl:w-auto xl:order-1 xl:ml-20 absolute top-11 xl:static z-50"
            id="navbar-sticky"
            ref={navbar}
          >
            <ul className="flex flex-col p-4 mt-4 border-t-2 border-zinc-200 w-full bg-background-color xl:bg-transparent xl:w-auto xl:flex-row xl:space-x-8 xl:mt-0 xl:text-sm xl:font-medium xl:border-0 gap-1 shadow xl:shadow-none">
              <li>
                <Link href="/">
                  <a
                    className="block py-2 pr-4 pl-3 rounded xl:bg-transparent xl:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                    aria-current="page"
                    onClick={() => toggleNavbar()}
                  >
                    O NAS
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/volunteering">
                  <a
                    className="block py-2 pr-4 pl-3 rounded xl:bg-transparent xl:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                    aria-current="page"
                    onClick={() => toggleNavbar()}
                  >
                    ZNAJDŹ WOLONTARIAT
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/add">
                  <a
                    className="block py-2 pr-4 pl-3 rounded xl:bg-transparent xl:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                    aria-current="page"
                    onClick={() => toggleNavbar()}
                  >
                    ZGŁOŚ WOLONTARIAT
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a
                    className="block xl:hidden py-2 pr-4 pl-3 rounded xl:bg-transparent xl:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                    aria-current="page"
                    onClick={() => toggleNavbar()}
                  >
                    KONTAKT
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
