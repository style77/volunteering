import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../saas/firebase"

export type IUser = {
  accessToken: string;
  auth: Record<string, any>;
  badges: Array<Record<string, string>>;
  birthday: string;
  createdAt: Record<string, number>;
  description: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  favorites: Array<string>;
  heldVolunteering: Array<string>;
  isAnonymous: boolean;
  isVerified: boolean;
  location: string;
  metadata: Record<string, any>;
  notifications: Array<string>;
  phoneNumber: string | null;
  photoURL: string;
  proactiveRefresh: Record<string, any>;
  providerData: Array<Record<string, string>>;
  providerId: string;
  reloadListener: Record<string, any> | null;
  reloadUserInfo: Record<string, any> | null;
  stsTokenManager: Record<string, any>;
  tenantId: string | null;
  uid: string;
};

const useAuth = () => {
  const [user, setUser] = useState<IUser>()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false)

      if (user && user.uid) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid))
        getDocs(q).then((querySnapshot: QuerySnapshot) => {
          querySnapshot.forEach((doc: DocumentData) => {
            setUser({ ...user, ...doc.data() })
          })
        })
      }
    })
  }, [])
  return { user, isLoggedIn }
}
export default useAuth
