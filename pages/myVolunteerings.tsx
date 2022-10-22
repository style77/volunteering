import { collection, getDocs, QuerySnapshot } from "firebase/firestore"
import Head from "next/head"
import { useEffect, useState } from "react"
import { VolunteeringCard } from "../components/volunteeringCard"
import { volunteeringTerms, volunteeringTypes } from "../constants"
import useAuth from "../hooks/useAuth"
import { db } from "../saas/firebase"

export const MyVolunteerings = () => {
  const { user } = useAuth()
  const [heldVolunteeringsData, setHeldVolunteerings] = useState<
    Record<string, any>
  >({})
  const [
    showVolunteeringAnnoucementModal,
    setShowVolunteeringAnnoucementModal
  ] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = () => {
      const volunteeringHeldsTemp: Array<Record<string, any>> = []

      getDocs(collection(db, "volunteerings")).then(
        (querySnapshot: QuerySnapshot) => 
          querySnapshot.forEach((doc) => {
            if (user?.heldVolunteering?.includes(doc.id)) {
              volunteeringHeldsTemp.push(doc.data())
            }
            if (
              volunteeringHeldsTemp.length === user?.heldVolunteering?.length
            ) {
              setHeldVolunteerings(volunteeringHeldsTemp)
            }
          })
      )
    }
    fetchData()
  }, [user])

  return (
    <>
      <Head>
        <title>Volunteering - Moje wolontariaty</title>
      </Head>
      <main className="flex min-h-screen flex-col py-2">
        <div className="font-semibold text-4xl xl:text-6xl text-main-color my-6 ml-6">
          Moje wolontariaty
        </div>
        <div className="flex flex-col gap-4 xl:gap-2 w-full px-12">
          {heldVolunteeringsData.length > 0 ? (
            <>
              {heldVolunteeringsData.map((held: any) => {
                return (
                  <div key={held.id}>
                    <div className="flex flex-col basis-11/12 xl:justify-center items-center">
                      <VolunteeringCard
                        volunteeringName={held.volunteeringName}
                        orgName={held.fundationName}
                        city={held.city}
                        isPaid={held[held.paid]}
                        volunteeringType={volunteeringTypes[held.type]}
                        volunteeringTerm={volunteeringTerms[held.term]}
                        volunteeringImage={held.image}
                      />
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <div className="flex flex-col gap-5 mx-6 basis-11/12 xl:justify-center items-center">
              <h1 className="text-2xl xl:text-4xl font-semibold text-main-color my-6">
                Nie dodałeś jeszcze żadnego wolontariatu
              </h1>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
export default MyVolunteerings
