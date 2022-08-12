import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCenters } from '../redux/auth/actionCreators';
import { db, auth, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, provider, signInWithPopup, setDoc, getDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, serverTimestamp, Timestamp, ref, uploadBytes,  uploadBytesResumable, getDownloadURL, deleteObject, list, listAll} from './firebase';
export const Socket = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.auth.isLogged);
    useEffect(() => { 
        if(!isLogged) return ;
        const unsubscribe = onSnapshot(doc(db, "Centers", "Centers"), (doc) => {
            console.log("Centers", doc.data()?.centers)
            dispatch(setCenters(doc.data()?.centers))
        });
        //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    }, []);
      return null;
  }
