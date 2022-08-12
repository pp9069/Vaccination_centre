import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Button, FloatingLabel, Form, Table } from 'react-bootstrap';
import Toaster from '../Toaster';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Center from './Center';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const Dashboard = () => {
    const [filtered, setfiltered] = useState([]);
    const isLogged = useSelector((state) => state.auth.isLogged);
    const userDatas = useSelector((state) => state.auth);
    const Centers = useSelector((state) => state.auth.centers);
    if(!isLogged) return <Navigate to="/auth"/>
    const postCenter = async () => {
      let arr = Centers?.length >0 ? Centers : [];
      await setDoc(doc(db, "Centers", "Centers"), {
          centers: [...arr, []]
      });
  }
  return (
    <div className='d-flex justify-content-center align-items-center flex-column mt-5 w-100'>
      <h2>Available Centers</h2>
      <Form className="w-50" onChange={(e) => {
        let arr = Centers;
        setfiltered(arr.filter((a) => a.state === e.target.value))
      }}>
        <FloatingLabel className="w-100" controlId="floatingSearch" label="Search">
        <Form.Control name="Search" type="text" placeholder="Search" />
      </FloatingLabel>
      </Form>
           
         <div className='col-12 d-flex w-100 flex-wrap justify-content-center overflow-auto py-5' style={{gap:10, maxWidth: 800}}>
                {Centers?.length > 0 ? (filtered.length > 0 ? filtered :Centers)?.map((center, index) =>{
                    return (<Center key={index} center={center} />)
                })
                : <Alert className='w-100' variant="dark">No Centers are posted</Alert>
                }
        </div>
    </div>
    
  )
}

export default Dashboard