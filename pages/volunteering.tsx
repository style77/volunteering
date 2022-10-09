import { NextPage } from "next";
import Head from "next/head";
import { volunteeringCard } from "../components/volunteeringCard";

const Volunteering: NextPage = () => {
    
    return (
        <>
        <main className="flex min-h-screen flex-col items-center justify-center py-2">
            <div>
                <volunteeringCard volunteeringName="Kropeczka" orgName="Fundacja drzewo"></volunteeringCard>
            </div>
        </main>
        </>
    )
}
export default Volunteering