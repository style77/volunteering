import {FiSearch} from "react-icons/fi"

export const SearchBar= () => {
    return (
      <>
        <div className="flex flex-col md:flex-row font-inter font-light justify-center mx-12">
          <div className="flex flex-col md:flex-row gap-3 w-full items-center">
            <div className="flex flex-col w-80">
              <label htmlFor="search-volunteering" className="text-main-color ">
                Znajdź wolontariat...
              </label>
              <input
                type="text"
                id="search-volunteering"
                className="h-12 text-lg rounded-lg text-main-color bg-white border-2 border-main-color focus:border-main-color-2 focus:rounded-xl p-2"
              />
            </div>
            <div className="flex flex-col w-80">
              <label htmlFor="search-city" className="text-main-color ">
                Miasto
              </label>
              <select
                id="search-city"
                className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
              />
            </div>
            <div className="flex flex-col w-80">
              <label htmlFor="search-type" className="text-main-color ">
                Typ
              </label>
              <select
                id="search-type"
                className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
              />
            </div>
            <div className="flex flex-col w-80">
              <label htmlFor="search-term" className="text-main-color ">
                Okres
              </label>
              <select
                id="search-term"
                className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
              />
            </div>
            <button className="flex flex-row rounded-lg bg-main-color text-white h-12 w-40 text-xl justify-center items-center mt-[1.9rem] transition ease-in-out hover:scale-110 hover:bg-main-color-2 duration-300 my-2">
              <div className="px-2">Szukaj</div>
              <div>
                <FiSearch />
              </div>
            </button>
          </div>
        </div>
      </>
    );
}