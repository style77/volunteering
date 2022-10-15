import { CardEvents } from "../cardEvents";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineCorporateFare } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

type Props = {
  volunteeringName: string;
  orgName: string;
  city: string;
  isPaid: boolean;
  volunteeringType: string;
  volunteeringTerm: string;
  volunteeringImage: string;
  isFavorite:boolean
  isNotifications:boolean
  description:string
}

export const VolunteeringAnnoucement = ({volunteeringName,orgName,city,isPaid,volunteeringType,volunteeringTerm, volunteeringImage,isFavorite,isNotifications,description}:Props) => {
  return (
    <>
      <main className="flex min-h-screen font-inter">
        <div className="bg-main-color rounded-lg h-[46rem] w-2/3">
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 justify-end m-3">
              <button className="text-4xl text-white transition ease-in-out hover:scale-110 duration-300 delay-100">
                <AiOutlineCloseCircle />
              </button>
            </div>
            <span className="text-white text-4xl font-semibold ml-6 my-2">
              {volunteeringName}
            </span>
            <div className="flex flex-row justify-end mr-12 gap-3 text-main-color">
              <span className="rounded-lg bg-white w-28 px-2 py-2 text-center justify-center items-center flex my-2 select-none">
                {isPaid ? "Płatny":"Bezpłatny"}
              </span>
              <span className="rounded-lg bg-white w-28 px-2 py-2 text-center justify-center items-center flex my-2 select-none">
                {volunteeringTerm}
              </span>
              <span className="rounded-lg bg-white w-28 px-2 py-2 text-center justify-center items-center flex my-2 select-none">
                {volunteeringType}
              </span>
            </div>

            <div className="flex flex-row text-white mx-6 my-3">
              <MdOutlineCorporateFare className="flex mr-1 my-1" />
              <span>{orgName}</span>
              <IoLocationOutline className="flex mr-1 my-1"/>
              <span>{city}</span>
            </div>
            <span className="text-white mx-6">Opis</span>
            <div className="rounded-lg bg-white h-[20rem] w-1/2 mx-6 my-2 text-main-color p-2">{description}</div>
            
          </div>
          <div className="flex w-full justify-center">
              <CardEvents isFavorite={isFavorite} isNotifications={isNotifications} />
          </div>
        </div>
      </main>
    </>
  );
};
