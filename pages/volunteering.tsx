import { NextPage } from "next";
import Head from "next/head";
import {
  SkeletonVolunteeringCard,
  VolunteeringCard,
} from "../components/volunteeringCard";
import { CardEvents, SkeletonCardEvents } from "../components/cardEvents";
import { SearchBar } from "../components/searchBar";
import { NextSeo } from "next-seo";

const Volunteering: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Volunteering - Wolontariaty"
        description="Wyszukiwarka wolontariatów w Polsce. Znajdź wolontariat dla siebie i zacznij pomagać razem z Volunteering już teraz!"
        canonical="https://volunteering.pl/"
        openGraph={{
          url: "https://volunteering.pl/volunteering",
          title: "Volunteering - Wolontariaty",
          description:
            "Wyszukiwarka wolontariatów w Polsce. Znajdź wolontariat dla siebie i zacznij pomagać razem z Volunteering już teraz!",
          images: [
            {
              url: "https://volunteering.pl/favicon.ico",
              width: 256,
              height: 256,
              alt: "Volunteering - Wolontariaty",
            },
          ],
          site_name: "Volunteering",
        }}
      />

      <Head>
        <title>Volunteering - Wolontariaty</title>
      </Head>
      <main className="font-inter flex min-h-screen flex-col py-2">
        <div className="font-semibold text-4xl xl:text-6xl text-main-color my-6 ml-6">
          Wyszukiwanie wolontariatu
        </div>
        <SearchBar />
        <div className="text-main-color text-3xl text-regular my-6 ml-6">
          Wyniki wyszukiwania
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col xl:flex-row gap-2 w-full">
            <div className="flex basis-11/12 xl:justify-center items-center">
              <VolunteeringCard
                volunteeringName="Kropeczka"
                orgName="Fundacja drzewo"
                city="Bydgoszcz"
                isPaid={false}
                volunteeringType="w hospicjum"
                volunteeringTerm="Okresowy"
                volunteeringImage="https://tinyurl.com/67swpcxj"
              />
            </div>
            <div className="flex justify-center items-center px-6">
              <CardEvents isFavorite={false} isNotifications={false} />
            </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-2 w-full">
            <div className="flex basis-11/12 xl:justify-center items-center">
              <SkeletonVolunteeringCard />
            </div>
            <div className="flex justify-start items-center px-6">
              <SkeletonCardEvents />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Volunteering;
