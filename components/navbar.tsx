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
import { db } from "../saas/firebase";
import LoginModal from "./modals/login";

export const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const [account, setAccount] = useState({ photo: "", name: "" });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAccount = async () => {
      setLoading(true);
      if (user) {
        if (user.providerData[0].providerId === "google.com") {
          setAccount({
            name: user.displayName,
            photo: user.photoURL,
          });
        } else if (user.providerData[0].providerId === "password") {
          const querySnapshot = await getDocs(
            query(collection(db, "users"), where("uid", "==", user.uid))
          );
          const data = querySnapshot.docs[0].data();
          setAccount({
            name: data.name,
            photo: data.photo || "/blank.png",
          });
        }
      }
      setLoading(false);
    };

    getAccount();
  }, [user]);

  const toggleNavbar = () => {
    const navbar = document.getElementById("navbar-sticky")
    if (navbar) {
      navbar.classList.toggle("hidden");
    }
  }

  return (
    <>
      <nav
        className="bg-background-color py-2.5 w-full z-20 top-0 left-0 shadow-md"
        id="nav"
      >
        <div className="container flex justify-between items-center mx-auto">
          <a className="flex items-center"></a>
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
                <Link href="/profile">
                  <div className="flex flex-row justify-center items-center">
                    {loading ? (
                      <>
                        <div className="animate-pulse rounded-full h-10 w-10 flex mr-2 bg-zinc-400"></div>
                        <div className="animate-pulse font-inner font-medium text-main-color-1 bg-zinc-400 transition h-3 w-24 rounded-md"></div>
                      </>
                    ) : (
                      <>
                        <div className="rounded-full h-10 w-10 flex mr-2">
                          <img src={account?.photo} className="rounded-full" />
                        </div>
                        <span className="font-inner font-medium text-main-color-1 hover:text-main-color-2 transition text-lg">
                          {account?.name}
                        </span>
                      </>
                    )}
                  </div>
                </Link>
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
            <ul className="flex flex-col p-4 mt-4 rounded-lg border w-full bg-background-color shadow-lg md:shadow-none  md:bg-transparent md:w-auto md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 gap-1">
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
                    ZNAJDŹ WOLONTARIUSZA
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
    </>
  );
};
