import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { showAlert } from "../components/alert"
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

    console.log(1)
    fetchVolunteerings()
  }, [user])

  const removeVolunteering = (volunteeringId: string) => {
    setVolunteerings(volunteerings.filter((v) => v.id !== volunteeringId))
    getDocs(collection(db, "volunteerings")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === volunteeringId) {
          deleteDoc(doc.ref)
            .then(() => {
              showAlert("Usunięto wolontariat", "success")
            })
            .then((e) => {
              showAlert("Wystąpił błąd", "error")
            })
        }
      })
    })
  }

  return (
    <>
      <main className="flex flex-row gap-4 p-2 overflow-y-auto w-screen">
        {volunteerings.map((volunteering) => (
          <OrganisatorVolunteeringBox
            key={volunteering.id}
            volunteeringID={volunteering.id}
            volunteeringName={volunteering.volunteeringName}
            orgName={volunteering.fundationName}
            city={volunteering.city}
            isPaid={volunteeringPaidToBoolean[volunteering.isPaid]}
            volunteeringType={volunteeringTypes[volunteering.type]}
            volunteeringTerm={volunteeringTerms[volunteering.term]}
            volunteeringImage={volunteering.image}
            description={volunteering.description}
            defParticipants={volunteering.usersAppending}
            removeVolunteering={removeVolunteering}
          />
        ))}
      </main>
    </>
  )
}
export default OrganisatorPanel
