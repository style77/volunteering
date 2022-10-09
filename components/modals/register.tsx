import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { NextPage } from "next";
import { showAlert } from "../components/alert";
import { humanizeError } from "../constants";
import { auth, db } from "../saas/firebase";

const RegisterModal: NextPage = () => {
  const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await addDoc(collection(db, "users"), {
          name,
          email,
          uid: user.uid,
        });
        return user;
      })
      .catch((error) => {
        showAlert(humanizeError[error.code], "error-alert");
      });
  };

  return (
    <main className="flex flex-col items-center justify-top w-full h-screen">
      <h1 className="text-3xl font-inner font-semibold">Register</h1>
      <button className="bg-main-color hover:bg-main-color-2 transition text-background-color font-bold py-2 px-4 rounded">
        Register
      </button>
    </main>
  );
};

export default Register;
