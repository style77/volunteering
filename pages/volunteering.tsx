import { NextPage } from "next";
import Head from "next/head";
import { VolunteeringCard } from "../components/volunteeringCard";
import { CardEvents } from "../components/cardEvents";
import { SearchBar } from "../components/searchBar";


const Volunteering: NextPage = () => {
    
    return (
        <>
        <Head>
        <title>Volunteering - Wolontariaty</title>
         </Head>
        <main className="font-inter flex min-h-screen flex-col py-2">
            <div className="font-semibold text-6xl text-main-color m-6">
                Wyszukiwanie wolontariatu
            </div>
            <SearchBar />
            <div className="text-main-color text-3xl text-regular m-6">
                Wyniki wyszukiwania
            </div>
            <div className="flex flex-row gap-6 justify-center mt-4">
                <VolunteeringCard volunteeringName="Kropeczka" orgName="Fundacja drzewo" city="Bydgoszcz" isPaid={false} volunteeringType="Hospicyjny" volunteeringTerm="Cykliczny" volunteeringImage="/nowe_logo_caritas.jpeg"></VolunteeringCard>
                <CardEvents isFavorite={false} isNotifications={false}></CardEvents>
            </div>
        </main>
        </>
    )
}
export default Volunteering