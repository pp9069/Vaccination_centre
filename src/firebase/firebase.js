import { initializeApp } from "firebase/app"
import { getFirestore, setDoc, getDoc, addDoc, collection, doc, updateDoc, serverTimestamp,  Timestamp, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, list, listAll, deleteObject } from "firebase/storage";



const firebaseApp = initializeApp({
    apiKey: "AIzaSyA7QNcOFDbpL8pR1Ngg5dZ-Pks0TjdF1ZA",
    authDomain: "covid-vaccine-centres.firebaseapp.com",
    projectId: "covid-vaccine-centres",
    storageBucket: "covid-vaccine-centres.appspot.com",
    messagingSenderId: "779389187850",
    appId: "1:779389187850:web:4078a3970ac2d47ff5acf3",
    measurementId: "G-MYMKS0Y8RH"
});

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();


export{ db, auth, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, provider, signInWithPopup, setDoc, getDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, serverTimestamp, Timestamp, ref, uploadBytes,  uploadBytesResumable, getDownloadURL, deleteObject, list, listAll};