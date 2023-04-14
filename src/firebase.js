import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArLfP7J9EUk_S4DUz5G3KSrjgkygAHFEk",
    authDomain: "tutorial-kontak.firebaseapp.com",
    projectId: "tutorial-kontak",
    storageBucket: "tutorial-kontak.appspot.com",
    messagingSenderId: "367946424189",
    appId: "1:367946424189:web:bce396a9c222ec5ae17614"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const storage = getStorage(app)