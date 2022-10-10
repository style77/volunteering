import { MdOutlineCorporateFare } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"
import Image from "next/image"

type Props = {
    volunteeringName: string
    orgName: string
    city: string
    isPaid: boolean
    volunteeringType: string
    volunteeringTerm: string
    volunteeringImage: string
}


export const VolunteeringCard = ({ volunteeringName, orgName, city, isPaid, volunteeringType, volunteeringTerm, volunteeringImage }: Props) => {
    return (
        <>
            <div>
                <div className="flex w-[75vw] font-inter">
                    <div className="flex flex-row h-28 w-[86rem] bg-main-color rounded-lg">
                        <div className="rounded-lg">
                            <Image width={153} height={110} src={volunteeringImage}></Image>
                        </div>
                        <div className="flex flex-col text-white justify-center ml-6 my-12">
                            <div className="font-semibold text-3xl mb-6">
                                {volunteeringName}
                            </div>
                            <div className="flex flex-row font-regular gap-1 text-sm ">
                                <div className="flex flex-row w-40">
                                    <MdOutlineCorporateFare className="flex align-middle mr-1"></MdOutlineCorporateFare>
                                    <span className="text-nowrap">{orgName}</span>
                                </div>
                                <div className="flex flex-row">
                                    <IoLocationOutline className="mr-1"></IoLocationOutline>
                                    {city}
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col font-regular text-main-color justify-center mr-6 w-full items-end">
                            <div className="rounded-lg bg-white text-center w-[10.9rem] py-2">
                                {isPaid ? "Płatny":"Bezpłatny"}
                            </div>
                            <div className="flex flex-row gap-2 text-sm my-2 text-cente">
                                <div className="rounded-lg bg-white gap-2 px-2 text-center py-2">
                                    {volunteeringType}
                                </div>
                                <div className="rounded-lg bg-white px-2 py-2">
                                    {volunteeringTerm}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}