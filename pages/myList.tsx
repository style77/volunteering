/* eslint-disable react/react-in-jsx-scope */
import { collection, getDocs, QuerySnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { VolunteeringCard } from "../components/volunteeringCard"
import useAuth from "../hooks/useAuth"
import { db } from "../saas/firebase"

export const MyList = () => {
  const { user } = useAuth()
  const [volunteeringData, setVolunteeringData] = useState<
    Array<Record<string, any>>
  >([])
  useEffect(() => {
    const volunteeringDataTemp: Array<Record<string, any>> = []
    getDocs(collection(db, "volunteering")).then(
      (querySnapshot: QuerySnapshot) =>
        querySnapshot.forEach((doc) => {
          if (user?.favorites?.includes(doc.id)) {
            console.log(user.favorites)
            volunteeringDataTemp.push(doc.data())
            console.log(volunteeringDataTemp)
          }
        })
    )
    setVolunteeringData(volunteeringDataTemp)
  }, [])

  return (
    <>
      <main>
        <>
          <h1 className="text-4xl xl:text-6xl font-semibold text-main-color my-6 ml-6">
            Moja lista
          </h1>

          <>
            {volunteeringData.forEach((volunteering) => {
              <VolunteeringCard
                volunteeringName={volunteering.volunteeringName}
                orgName={volunteering.fundationName}
                city={volunteering.city}
                isPaid={volunteering.paid}
                volunteeringType={volunteering.type}
                volunteeringTerm={volunteering.term}
                volunteeringImage={volunteering.image}
              ></VolunteeringCard>
            })}
          </>
        </>
      </main>
    </>
  )
}
export default MyList
