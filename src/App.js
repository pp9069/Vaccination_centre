import logo from './logo.svg';
import './App.css';
import Logins from './components/Login'
 
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { auth, db, doc, getDoc, onAuthStateChanged } from './firebase/firebase';
import { Alert, Button } from 'react-bootstrap';
import { setUserDetails, updateLoggedStatus } from './redux/auth/actionCreators';
import AdminPanel from './components/AdminPanel';
import AdminDashboard from './components/AdminDashboard';
import { Socket } from './firebase/socket';
import { UserSocket } from './firebase/userSocket';
function App() {
  const userData = useSelector((state) => state.auth);
  let navigate = useNavigate(); 
  const dispatch = useDispatch();  
  const LogOut = async () => {
    await auth.signOut();
    const defaultUser = {
      email: "",
      admin : false,
      userId: "",
    }
    dispatch(setUserDetails(defaultUser));
    dispatch(updateLoggedStatus(false));
  }
  //  useEffect(()=>{
  //   if(!userData.userId === "") return;
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       const docSnap = getDoc(doc(db, "Users", user.uid));
  //       if (docSnap.exists()) dispatch(setUserDetails(docSnap.data()));
  //     } else {
  //     }
  // });
  //  },[])
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <div className="App">
    <Socket />
    {/* <UserSocket /> */}
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><div style={{cursor: 'pointer'}} onClick={() => navigate('/')}>Presidio</div></Navbar.Brand>
          <Navbar.Brand>{userData.email}</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
          
        </Container>
        
        {/* {isLogged && <Button variant="light" className="text-nowrap">Name: {userDatas.name}</Button>} */}
        {isLogged && <Button className="col-md-1  mx-4 " variant="light" onClick={LogOut}>Sign Out</Button>}
      </Navbar>
      {isLogged && <Alert variant="warning" className='text-center w-100 mr-auto d-flex justify-content-center align-items-center'><h2 className="d-flex justify-content-center align-items-center text-center w-100">Total Appointments : {userData?.centers?.reduce((acc, obj) => {return acc + obj?.applied?.length}, 0) || 0}</h2><h2 className="d-flex justify-content-center align-items-center text-center w-100">Total Active Centers : {userData?.centers?.length || 0}</h2></Alert>}
    <Routes>
      <Route path="/" element={userData.admin ? <AdminDashboard /> : <Dashboard />} exact />
      <Route path="/auth" element={<Logins />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
    </div>
  );
}

export default App;
