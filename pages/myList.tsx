import { collection, doc, getDocs, QuerySnapshot } from "firebase/firestore";
import { docs } from "googleapis/build/src/apis/docs";
import { useEffect, useState } from "react";
import { VolunteeringCard } from "../components/volunteeringCard";
import useAuth from "../hooks/useAuth";
import { db } from "../saas/firebase";

export const MyList = () => {
  const { user } = useAuth();
  const [volunteeringData, setVolunteeringData] = useState([]);

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
            })}
          </div>
        </>
      </main>
    </>
  );
};
export default MyList;
