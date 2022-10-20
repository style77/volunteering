/* eslint-disable react/react-in-jsx-scope */
import { collection, getDocs, QuerySnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { VolunteeringCard } from "../components/volunteeringCard"
import useAuth from "../hooks/useAuth"
import { db } from "../saas/firebase"

export const MyList = () => {
<<<<<<< HEAD
  const { user } = useAuth();
  const [volunteeringData, setVolunteeringData] = useState([]);
=======
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
>>>>>>> 61ceb2c871ea995281d6366cf8b74519451c4316

  useEffect(() => {
    console.log(123)
    const getData = () => {
      let volunteeringDataTemp: any = [];
      getDocs(collection(db, "volunteering")).then(
        (querySnapshot: QuerySnapshot) =>
          querySnapshot.forEach((doc) => {
            if (user?.favorites?.includes(doc.id)) {
              console.log(user.favorites);
              volunteeringDataTemp.push(doc.data());
              console.log(volunteeringDataTemp);
            }
          })
      );
      setVolunteeringData(volunteeringDataTemp);
      
    };

        getData()
      
    

  },[user]);

  console.log(volunteeringData);
  return (
    <>
      <main>
        <>
          <h1 className="text-4xl xl:text-6xl font-semibold text-main-color my-6 ml-6">
            Moja lista
          </h1>

<<<<<<< HEAD
          <div className="flex flex-col gap-5 mx-6 basis-11/12 xl:justify-center items-center">
            {volunteeringData.map((volunteering: any) => {
              return (
                <VolunteeringCard
                  volunteeringName={volunteering.volunteeringName}
                  orgName={volunteering.fundationName}
                  city={volunteering.city}
                  isPaid={volunteering.paid}
                  volunteeringType={volunteering.type}
                  volunteeringTerm={volunteering.term}
                  volunteeringImage={volunteering.image}
                ></VolunteeringCard>
              );
=======
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
>>>>>>> 61ceb2c871ea995281d6366cf8b74519451c4316
            })}
          </div>
        </>
      </main>
    </>
  )
}
export default MyList
