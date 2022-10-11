import { MdOutlineCorporateFare } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";

type Props = {
  volunteeringName: string;
  orgName: string;
  city: string;
  isPaid: boolean;
  volunteeringType: string;
  volunteeringTerm: string;
  volunteeringImage: string;
};

export const VolunteeringCard = ({
  volunteeringName,
  orgName,
  city,
  isPaid,
  volunteeringType,
  volunteeringTerm,
  volunteeringImage,
}: Props) => {
  return (
    <>
      <div className="flex flex-row h-52 xl:h-36 w-full bg-main-color rounded-lg ml-6">
        <div className="xl:ml-2 mt-2">
          <img
            src={volunteeringImage}
            className="object-contain h-24 hidden xl:block"
          />
        </div>
        <div className="flex flex-col text-white mt-3 xl:mt-0 xl:justify-center ml-4 xl:ml-6">
          <div className="font-semibold text-3xl mb-6">{volunteeringName}</div>
          <div className="flex flex-col xl:flex-row font-regular gap-1 text-sm">
            <div className="flex flex-row w-40 items-center">
              <MdOutlineCorporateFare className="flex mr-1"></MdOutlineCorporateFare>
              <span className="">{orgName}</span>
            </div>
            <div className="flex flex-row items-center">
              <IoLocationOutline className="flex mr-1"></IoLocationOutline>
              <span className="">{city}</span>
            </div>
          </div>
          <div className="xl:hidden select-none flex text-sm flex-row gap-2 mt-5 font-regular text-main-color w-full items-end">
            <div className="rounded-lg bg-white text-center py-2 my-6">
              {isPaid ? "Płatny" : "Bezpłatny"}
            </div>
            <div className="flex flex-row gap-2 my-6">
              <div className="rounded-lg bg-white px-2 py-2 text-center">
                {volunteeringType}
              </div>
              <div className="rounded-lg bg-white px-2 py-2 text-center">
                {volunteeringTerm}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex text-md gap-2 flex-col mt-0 font-regular text-main-color justify-center mr-6 w-full items-end">
          <div className="rounded-lg bg-white text-center w-[14.5rem] py-2">
            {isPaid ? "Płatny" : "Bezpłatny"}
          </div>
          <div className="flex flex-row gap-2 my-2">
            <div className="rounded-lg bg-white w-28 px-2 py-2 text-center">
              {volunteeringType}
            </div>
            <div className="rounded-lg bg-white w-28 px-2 py-2 text-center">
              {volunteeringTerm}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
