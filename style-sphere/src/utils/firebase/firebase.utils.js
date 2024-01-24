// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
} from 'firebase/auth';

import{
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbZ-1McCaFKxI1u7ltLAK3ZyH9B33Ymn8",
  authDomain: "style-sphere-db.firebaseapp.com",
  projectId: "style-sphere-db",
  storageBucket: "style-sphere-db.appspot.com",
  messagingSenderId: "1093762120182",
  appId: "1:1093762120182:web:d197cddf9635fcc1c6afd7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
})

export const auth=getAuth();
export const signInWithGooglePopUp = ()=> signInWithPopup(auth,provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log((userSnapshot).exists());

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;

        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
            });
        }
        catch(error){
            console.log('error creating user',error.message);
        }
    }
    return userDocRef;
} ;