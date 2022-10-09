import { type } from "os";
import {MdOutlineCorporateFare} from "react-icons/md"
import {IoLocationOutline} from "react-icons/io5"


type Props = {
    volunteeringName: string
    orgName:string
    // city:string
    // isPaid:boolean
    // volunteeringType:string
    // volunteeringTerm:string
}

export const volunteeringCard = ({ volunteeringName, orgName }: Props) => {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center py-2">
                <div className="flex basis-4/5">
                    <div className="flex flex-row h-28 w-full bg-main-color rounded-lg">
                        <div className="rounded-lg">
                            <p>ZDJ</p>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                {volunteeringName}
                            </div>
                            <div className="flex flex-row">
                                <div>
                                    <IoLocationOutline></IoLocationOutline>
                                </div>
                                <div>
                                    {orgName}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}