import { NextPage } from "next";
import Head from "next/head";
import { VolunteeringCard } from "../components/volunteeringCard";
import { CardEvents } from "../components/cardEvents";



const Volunteering: NextPage = () => {
    
    return (
        <>
        <main className="flex min-h-screen flex-col items-center justify-center py-2">
            <div>
                <VolunteeringCard volunteeringName="Kropeczka" orgName="Fundacja drzewo" city="Bydgoszcz" isPaid={false} volunteeringType="Hospicyjny" volunteeringTerm="Cykliczny" volunteeringImage="/nowe_logo_caritas.jpeg"></VolunteeringCard>
                <CardEvents isFavorite={false} isNotifications={false}></CardEvents>
            </div>
        </main>
        </>
    )
}
export default Volunteering