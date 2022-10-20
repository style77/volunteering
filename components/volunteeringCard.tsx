/* eslint-disable react/react-in-jsx-scope */
import { MdOutlineCorporateFare } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

import Image from "next/image";

export const SkeletonVolunteeringCard = () => {
  return (
    <div className="flex flex-row h-52 xl:h-36 w-full bg-main-color rounded-lg mx-6 xl:ml-6 shadow-md">
      <div className="xl:ml-4 mt-6">
        <div className="object-contain h-24 w-24 hidden xl:block animate-pulse rounded-full bg-white" />
      </div>
      <div className="flex flex-col text-white mt-3 xl:mt-0 xl:justify-center ml-4 xl:ml-6">
        <div className="font-semibold text-3xl mb-6 animate-pulse bg-white w-48 h-8 rounded-md"></div>
        <div className="flex flex-col xl:flex-row font-regular gap-1 text-sm">
          <div className="flex flex-row w-40 items-center">
            <MdOutlineCorporateFare className="flex mr-1"></MdOutlineCorporateFare>
            <span className="animate-pulse w-24 h-3 bg-white rounded-md"></span>
          </div>
          <div className="flex flex-row items-center">
            <IoLocationOutline className="flex mr-1"></IoLocationOutline>
            <span className="animate-pulse w-24 h-3 bg-white rounded-md"></span>
          </div>
        </div>
        <div className="xl:hidden select-none flex text-sm flex-row gap-2 mt-5 font-regular text-main-color w-full items-end">
          <div className="rounded-lg bg-white text-center py-2 my-6 animate-pulse h-8 w-16"></div>
          <div className="flex flex-row gap-2 my-6">
            <div className="rounded-lg bg-white px-2 py-2 text-center animate-pulse h-8 w-16"></div>
            <div className="rounded-lg bg-white px-2 py-2 text-center animate-pulse h-8 w-16"></div>
          </div>
        </div>
      </div>
      <div className="hidden xl:flex text-md gap-2 flex-col mt-0 font-regular text-main-color justify-center mr-6 w-full items-end">
        <div className="rounded-lg bg-white text-center w-[14.5rem] py-2 animate-pulse h-8"></div>
        <div className="flex flex-row gap-2 my-2">
          <div className="rounded-lg bg-white w-28 h-8 px-2 py-2 text-center animate-pulse"></div>
          <div className="rounded-lg bg-white w-28 h-8 px-2 py-2 text-center animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

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
      <div className="flex flex-row -z-[1] h-52 xl:h-36 w-screen xl:w-full bg-main-color rounded-lg shadow-md">
        <div className="xl:ml-4 mt-6">
          <Image
            src={volunteeringImage || "/images/placeholder.png"}
            className="object-cover rounded-full shadow-md z-[1]"
            width="128"
            height="128"
            alt={`${volunteeringName} logo`}
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder.png";
            }}
          />
        </div>
        <div className="flex flex-col text-white mt-3 xl:mt-0 xl:justify-center ml-7">
          <div className="font-semibold text-3xl mb-6">{volunteeringName}</div>
          <div className="flex flex-col xl:flex-row font-regular gap-1 text-sm">
            <div className="flex flex-row w-40 items-center">
              <MdOutlineCorporateFare className="flex mr-1 my-1"></MdOutlineCorporateFare>
              <span className="">{orgName}</span>
            </div>
            <div className="flex flex-row items-center">
              <IoLocationOutline className="flex mr-1 my-1"></IoLocationOutline>
              <span className="">{city}</span>
            </div>
          </div>
          <div className="xl:hidden select-none flex text-sm flex-row gap-2 mt-5 px-2 font-regular text-main-color w-full items-end">
            <div className="rounded-lg bg-white text-center py-2 px-2 my-6 shadow-md">
              {isPaid ? "Płatny" : "Bezpłatny"}
            </div>
            <div className="flex flex-row gap-2 my-6">
              <div className="rounded-lg bg-white px-2 py-2 text-center shadow-md">
                {volunteeringType}
              </div>
              <div className="rounded-lg bg-white px-2 py-2 text-center shadow-md">
                {volunteeringTerm}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex text-md gap-2 flex-col mt-0 font-regular text-main-color justify-center mr-6 w-full items-end select-none">
          <div className="rounded-lg bg-white text-center w-[15.5rem] py-2">
            {isPaid ? "Płatny" : "Bezpłatny"}
          </div>
          <div className="flex flex-row gap-2 my-2">
            <div className="rounded-lg bg-white w-28 px-2 py-2 text-center justify-center items-center flex">
              {volunteeringType}
            </div>
            <div className="rounded-lg bg-white w-32 px-4 py-2 text-center justify-center items-center flex">
              {volunteeringTerm}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
