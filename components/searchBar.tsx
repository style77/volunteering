import { FormEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  cities,
  volunteeringTerms,
  volunteeringTypes,
} from "../constants";

type Props = {
  volunteeringsData: any;
  setVolunteeringsData: any;
  allVolunteeringsData: any;
};

export const SearchBar = ({
  allVolunteeringsData,
  volunteeringsData,
  setVolunteeringsData,
}: Props) => {
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("Bydgoszcz");
  const [searchType, setSearchType] = useState("Hospicyjny");
  const [searchTerm, setSearchTerm] = useState("Jednorazowy");
  const [filtered, setFiltered]: any = useState([]);
  useEffect(() => {
    console.log(allVolunteeringsData);
      let toFiltered = allVolunteeringsData.filter((data: any) => {
        return data.city === searchCity && data.type===searchType && data.term===searchTerm
      });
      
      setFiltered(toFiltered);
  }, [searchName, searchCity, searchType, searchTerm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault;
    setVolunteeringsData(filtered);
  };

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
              onChange={(e) => setSearchName(e.target.value)}
              className="h-12 text-lg rounded-lg text-main-color bg-white border-2 border-main-color focus:border-main-color-2 focus:rounded-xl p-2"
            />
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="search-city" className="text-main-color ">
              Miasto
            </label>
            <select
              id="search-city"
              onChange={(e) => setSearchCity(e.target.value)}
              className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
            >
              {cities.map((city: any) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="search-type" className="text-main-color ">
              Typ
            </label>
            <select
              id="search-type"
              onChange={(e) => setSearchType(e.target.value)}
              className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
            >
              {Object.entries(volunteeringTypes).map(([key, value]: any, i) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="search-term" className="text-main-color ">
              Okres
            </label>
            <select
              id="search-term"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
            >
              {Object.entries(volunteeringTerms).map(([key, value]: any, i) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button
            className="flex flex-row rounded-lg bg-main-color text-white h-12 w-40 text-xl justify-center items-center mt-[1.9rem] transition ease-in-out hover:scale-110 hover:bg-main-color-2 duration-300 my-2"
            onClick={handleSubmit}
          >
            <div className="px-2">Szukaj</div>
            <div>
              <FiSearch />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
