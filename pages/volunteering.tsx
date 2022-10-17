import { NextPage } from "next";
import Head from "next/head";
import {
  SkeletonVolunteeringCard,
  VolunteeringCard,
} from "../components/volunteeringCard";
import {
  CardEvents,
  NotAuthorizedCardEvents,
  SkeletonCardEvents,
} from "../components/cardEvents";
import { SearchBar } from "../components/searchBar";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../saas/firebase";
import {
  volunteeringPaidToBoolean,
  volunteeringTerms,
  volunteeringTypes,
} from "../constants";
import useAuth from "../hooks/useAuth";
import { VolunteeringAnnoucement } from "../components/modals/volunteeringAnnoucement";

type VolunteeringData = {
  volunteeringName: string;
  fundationName: string;
  city: string;
  type: string;
  term: string;
  paid: string;
  image: string;
  description: string;
  organisator: string;
};

const Volunteering: NextPage = () => {
  const { user } = useAuth();

  const [account, setUser] = useState({});
  const [volunteeringsData, setVolunteeringsData]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allVolunteeringsData, setAllVolunteeringsData]:any=useState([])

  const [selectedVolunteeringData, setSelectedVolunteeringData]: any = useState(
    {}
  );
  const [
    showVolunteeringAnnoucementModal,
    setShowVolunteeringAnnoucementModal,
  ] = useState(false);

  useEffect(() => {
    const getVolunteeringsData = async () => {
      setIsLoading(true);

      const querySnapshot = await getDocs(collection(db, "volunteering"));
      const staticVolunteeringsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setVolunteeringsData(staticVolunteeringsData);

      setAllVolunteeringsData(staticVolunteeringsData)

      setIsLoading(false);
    };

    if (volunteeringsData.length === 0) getVolunteeringsData();
  }, []);

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
        <SearchBar
          allVolunteeringsData={allVolunteeringsData}
          volunteeringsData={volunteeringsData}
          setVolunteeringsData={setVolunteeringsData}
        />
        <div className="text-main-color text-3xl text-regular my-6 ml-6">
          Wyniki wyszukiwania
        </div>

        <div className="flex flex-col gap-8">
          {isLoading ? (
            <>
              <div className="flex flex-col xl:flex-row gap-2 w-full">
                <div className="flex basis-11/12 xl:justify-center items-center">
                  <SkeletonVolunteeringCard />
                </div>
                <div className="flex justify-start items-center px-6">
                  <SkeletonCardEvents />
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
              <div className="flex flex-col xl:flex-row gap-2 w-full">
                <div className="flex basis-11/12 xl:justify-center items-center">
                  <SkeletonVolunteeringCard />
                </div>
                <div className="flex justify-start items-center px-6">
                  <SkeletonCardEvents />
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
            </>
          ) : (
            <>
              <VolunteeringAnnoucement
                volunteeringName={selectedVolunteeringData.volunteeringName}
                orgName={selectedVolunteeringData.fundationName}
                city={selectedVolunteeringData.city}
                isPaid={
                  volunteeringPaidToBoolean[selectedVolunteeringData.paid]
                }
                volunteeringType={
                  volunteeringTypes[selectedVolunteeringData.type]
                }
                volunteeringTerm={
                  volunteeringTerms[selectedVolunteeringData.term]
                }
                volunteeringImage={selectedVolunteeringData.image}
                isFavorite={
                  user?.favorites?.includes(selectedVolunteeringData.id) || false
                }
                isNotifications={
                  user?.notifications?.includes(
                    selectedVolunteeringData.id
                  ) || false
                }
                description={selectedVolunteeringData.description}
                showVolunteeringAnnoucementModal={
                  showVolunteeringAnnoucementModal
                }
                setShowVolunteeringAnnoucementModal={
                  setShowVolunteeringAnnoucementModal
                }
              ></VolunteeringAnnoucement>

              {volunteeringsData.map((volunteeringData: any) => (
                <div
                  className="flex flex-col xl:flex-row gap-2 w-full"
                  key={volunteeringData.id}
                >
                  <div
                    className="flex basis-11/12 xl:justify-center items-center cursor-pointer"
                    onClick={() => {
                      setSelectedVolunteeringData(volunteeringData);
                      setShowVolunteeringAnnoucementModal(true);
                      console.log(123);
                    }}
                  >
                    <VolunteeringCard
                      volunteeringName={volunteeringData.volunteeringName}
                      orgName={volunteeringData.fundationName}
                      city={volunteeringData.city}
                      isPaid={volunteeringPaidToBoolean[volunteeringData.paid]}
                      volunteeringType={
                        volunteeringTypes[volunteeringData.type]
                      }
                      volunteeringTerm={
                        volunteeringTerms[volunteeringData.term]
                      }
                      volunteeringImage={volunteeringData.image}
                    />
                  </div>
                  <div className="flex justify-center items-center px-6">
                    {user ? (
                      <>
                        <CardEvents
                          isFavorite={
                            user.favorites?.includes(
                              volunteeringData.id
                            ) || false
                          }
                          isNotifications={
                            user.notifications?.includes(
                              volunteeringData.id
                            ) || false
                          }
                          volunteeringData={volunteeringData}
                        />
                      </>
                    ) : (
                      <NotAuthorizedCardEvents />
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
};
export default Volunteering;
