import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import OrganisatorVolunteeringBox from "../components/organisatorVolunteeringBox"
import {
  volunteeringPaidToBoolean,
  volunteeringTerms,
  volunteeringTypes
} from "../constants"
import useAuth from "../hooks/useAuth"
import { db } from "../saas/firebase"

export const OrganisatorPanel = () => {
  const { user } = useAuth()
  const [volunteerings, setVolunteerings] = useState<Record<string, any>[]>([])

  useEffect(() => {
    if (!user) return

    const fetchVolunteerings = async () => {
      await getDocs(
        query(
          collection(db, "volunteerings"),
          where("organisator", "==", user.uid)
        )
      ).then((querySnapshot) => {
        const volunteerings: Record<string, any>[] = []
        querySnapshot.forEach((doc) => {
          volunteerings.push({ id: doc.id, ...doc.data() })
        })
        setVolunteerings(volunteerings)
      })
    }

    fetchVolunteerings()
  }, [user])

  return (
    <>
      <main className="flex flex-row gap-4 p-2 overflow-y-auto w-screen">
        {volunteerings.map((volunteering) => (
          <OrganisatorVolunteeringBox
            key={volunteering.id}
            volunteeringName={volunteering.volunteeringName}
            orgName={volunteering.fundationName}
            city={volunteering.city}
            isPaid={volunteeringPaidToBoolean[volunteering.isPaid]}
            volunteeringType={volunteeringTypes[volunteering.type]}
            volunteeringTerm={volunteeringTerms[volunteering.term]}
            volunteeringImage={volunteering.image}
            description={volunteering.description}
            defParticipants={volunteering.usersAppending}
          />
        ))}
      </main>
    </>
  )
}
export default OrganisatorPanel
