export const Navbar = () => {
  return (
    <>
      <nav className="bg-background-color px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a className="flex items-center"></a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-background-color bg-main-color hover:bg-main-color-2 transition focus:outline-none font-medium font-inter rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
            >
              Napisz do nas
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-zinc-400 rounded-lg md:hidden hover:text-zinc-300 transition"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Otwórz menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 gap-1">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                  aria-current="page"
                >
                  O NAS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                  aria-current="page"
                >
                  ZNAJDŹ WOLONTARIUSZA
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 text-main-color hover:text-main-color-2 transition font-inter font-semibold"
                  aria-current="page"
                >
                  ZGŁOŚ WOLONTARIAT
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
