/* eslint-disable react/react-in-jsx-scope */
import { collection, getDocs, QuerySnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { VolunteeringAnnoucement } from "../components/modals/volunteeringAnnoucement"
import { VolunteeringCard } from "../components/volunteeringCard"
import { volunteeringPaidToBoolean, volunteeringTerms, volunteeringTypes } from "../constants"
import useAuth from "../hooks/useAuth"
import { db } from "../saas/firebase"

export const MyList = () => {
  const { user } = useAuth()
  const [volunteeringData, setVolunteeringData] = useState<
    Array<Record<string, any>>
  >([])
  
    const [selectedVolunteeringData, setSelectedVolunteeringData] = useState<
    Record<string, any>
  >({})
  const [
    showVolunteeringAnnoucementModal,
    setShowVolunteeringAnnoucementModal,
  ] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = () => {
      const volunteeringDataTemp: Array<Record<string, any>> = []

      getDocs(collection(db, "volunteerings")).then(
        (querySnapshot: QuerySnapshot) =>
          querySnapshot.forEach((doc) => {

            if (user?.favorites?.includes(doc.id)) {
              volunteeringDataTemp.push({id:doc.id, ...doc.data()})
            }
            if (volunteeringDataTemp.length === user?.favorites?.length) {
              setVolunteeringData(volunteeringDataTemp)
            }
          })
      )
    }
    fetchData()
  }, [user])

  return (
    <>
      <main>
          <h1 className="text-4xl xl:text-6xl font-semibold text-main-color my-6 ml-6">
            Moja lista
          </h1>

          <div>
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
              isFavorite={
                true
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
              volunteeringId={selectedVolunteeringData.id}
              user={user!}
              phone={selectedVolunteeringData.phone}
              email={selectedVolunteeringData.email}
            />
          </div>

          <div className="flex flex-col gap-4 xl:gap-2 w-full px-12">
            {volunteeringData.length > 0 ? (
              <>
            {volunteeringData.map((volunteering) => {
              return (
              <div className="cursor-pointer" key={volunteering.id} onClick={() => {setSelectedVolunteeringData(volunteering); setShowVolunteeringAnnoucementModal(true)}}>
                <div className="flex flex-col basis-11/12 xl:justify-center items-center">
                  <VolunteeringCard
                    volunteeringName={volunteering.volunteeringName}
                    orgName={volunteering.fundationName}
                    city={volunteering.city}
                    isPaid={volunteeringPaidToBoolean[volunteering.paid]}
                    volunteeringType={volunteeringTypes[volunteering.type]}
                    volunteeringTerm={volunteeringTerms[volunteering.term]}
                    volunteeringImage={volunteering.image}
                  />
                </div>
              </div>
            )})}
              </>

            ) : (
              <div className="flex flex-col gap-5 mx-6 basis-11/12 xl:justify-center items-center">
                <h1 className="text-2xl xl:text-4xl font-semibold text-main-color my-6">
                  Nie masz żadnych ulubionych wolontariatu
                </h1>
                </div>
            )}
          </div>
      </main>
    </>
  )
}

export default MyList
