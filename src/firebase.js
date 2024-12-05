import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
   getAuth,
  signInWithEmailAndPassword,
  signOut
} 
from "firebase/auth"
import { addDoc,collection,getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD4NUCauUUbKCe_Mgmf0FHSjYiCugO3uAM",
  authDomain: "netflix-clone-18f65.firebaseapp.com",
  projectId: "netflix-clone-18f65",
  storageBucket: "netflix-clone-18f65.firebasestorage.app",
  messagingSenderId: "442447355765",
  appId: "1:442447355765:web:eca4102e573c7c19ba3d3c"
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
  try {
    const res=await createUserWithEmailAndPassword(auth,email,password)
    const user=res.user;
    await addDoc(collection(db,"user"),{
      uid: user.uid,
      name,
      authProvider:"local",
      email,

    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const login=async(email,password)=>{
try {
   await signInWithEmailAndPassword(auth,email,password)
} catch (error) {
  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(' '))
  
}
}

const logout=()=>{
  signOut(auth);
}

export{auth,db,login,signup,logout}