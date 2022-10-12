import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../saas/firebase";

const useAuth = () => {
  const [user, setUser]: any = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false);

      if (user && user.uid) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid))
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUser({ ...user, ...doc.data() });
          })
        })
      }
    });
  }, [])
  return { user, isLoggedIn };
};
export default useAuth;
