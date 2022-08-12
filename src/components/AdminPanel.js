import React, { useState } from "react";
import { Alert, Button, Form, Image, FloatingLabel } from "react-bootstrap";
import ReactDOM from "react-dom";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, provider, signInWithPopup, setDoc, getDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp,  Timestamp } from '../firebase/firebase';
import { setUserDetails, updateLoggedStatus } from "../redux/auth/actionCreators";
import Google from '../assets/google.png'
import Loader from "./Loader";
import {Link, useLocation} from "react-router-dom";
function Logins (){
    const dispatch = useDispatch();  
    const [error, setError] = useState(false);
    const [loader, setLoader] =useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const defaultUser = {
      email: "",
      password: "",
      admin : true,
      userId: "",
    }
    const [userAuth, setUserAuth] = useState({
      email: "",
      password: "",
    });
   
    const signup = async (event) => {
      event.preventDefault();
      if(!validForm()) return;
     await createUserWithEmailAndPassword(auth, userAuth.email, userAuth.password)
      .then(async (authUser) => {
        let userData = {
          ...defaultUser,
          email: userAuth.email,
          userId: authUser.user.uid,
        }
      await setDoc(doc(db, "Users",authUser.user.uid), userData);
      dispatch(setUserDetails(userData));
      // dispatch(updateLoggedStatus(true))
      })
      .catch((error) =>{ console.log(error)});
      setLoader(false);
    }

    const signin = async (event) => {
        event.preventDefault();
        if(!validForm()) return;
        await signInWithEmailAndPassword(auth, userAuth.email, userAuth.password)
        .then(async (authUser)=>{
          const docSnap = await getDoc(doc(db, "Users", authUser.user.uid));
          if (docSnap.exists()) dispatch(setUserDetails(docSnap.data()));
          dispatch(updateLoggedStatus(true))
        })
        .catch((error) =>{ 
          console.log(error);
        });
        setLoader(false);
    }

    const validForm = () => {
      setLoader(true);
      for (const [key, value] of Object.entries(userAuth)){
        if(!value && key !== "username"){ 
          return false;}
      }
      return true;
    }
        const userDatas = useSelector((state) => state.auth);

        const onChangeHandler = (e) => {
          const name = e.target.name, value = e.target.value;
          setUserAuth(prevState => {
            return {
              ...prevState,
              [name]: value
            }
          })
        }
        const isLogged = useSelector((state) => state.auth.isLogged);
        if(isLogged) return <Navigate to="/"/>
  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5 w-100">
         
         
      <div className="w-100 d-flex justify-content-center align-items-center flex-column p-4" style={{gap: 20, border: "0px solid #6c757d", maxWidth: "max-content", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", borderRadius: 10}}>

        <Alert variant="dark" className="bg-dark text-white w-100" style={{maxWidth: 500}}>
         <h1>Login to Admin Panel.</h1>
        </Alert>
    
        <Form className="w-100 h-100 d-flex justify-content-center align-items-center flex-column" style={{maxWidth: 400, gap: 20}} onChange={onChangeHandler}>
          <FloatingLabel className="w-100" controlId="floatingInput" label="Email address">
            <Form.Control name="email" type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel className="w-100" controlId="floatingPassword" label="Password">
            <Form.Control name="password" type="password" placeholder="Password" />
          </FloatingLabel>
            {loader ? <Loader /> : 
            <div className="w-100 d-flex justify-content-center align-items-center flex-wrap" style={{gap: 30}}>
            <Button className="col-3" variant="dark" onClick={signin}>Sign In</Button> 
            <span>Or</span>
            <Button className="col-3" variant="dark" onClick={signup}>Sign Up</Button> 
            </div> }
            {<span onClick={()=> navigate(-1)}><a stlyle={{cursor: 'pointer'}} >Go Back</a></span>}
                
        </Form>
        {error && <Alert className="w-100" variant="danger">Please use correct credentials.</Alert>}
         {/* <Button className="col-3" variant="dark" onClick={googleSignIn}><Image width={30} src={Google} />Google</Button>  */}
       
      </div>

    </div>
  );
}

export default Logins;
