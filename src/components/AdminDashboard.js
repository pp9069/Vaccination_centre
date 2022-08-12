import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Card, Button, Form, FloatingLabel, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { setCenters } from '../redux/auth/actionCreators';
import Center from './Center';
import { nanoid } from 'nanoid'
const AdminDashboard = () => {
    const dispatch = useDispatch();  
    const userData = useSelector((state) => state.auth);
    const Centers = useSelector((state) => state.auth.centers);
    let dt = new Date().toDateString()
    const [center, SetCenter] = useState({
        state: "",
        district: "",
        address: "",
        officerAppointed: "",
        vaccineType: "",
        applied: [],
        [dt]: []
    });
    const onChangeHandler = (e) => {
        const name = e.target.name, value = e.target.value;
        console.log(name, value);
        SetCenter(prevState => {
          return {
            ...prevState,
            [name]: value
          }
        })
      }
    const postCenter = async () => {
        let arr = Centers?.length >0 ? Centers : [];
        await setDoc(doc(db, "Centers", "Centers"), {
            centers: [...arr, {
              ...center,
              id: nanoid(),
            }]
        });
    }
    const removeCenter = async(cen) => {
      await setDoc(doc(db, "Centers", "Centers"), {
        centers: Centers.filter((a) => a.id !== cen.id)
    });
    }
  return (
    <div className='w-100 d-flex flex-wrap justify-content-center align-items-center' style={{gap: 30}}>
        <div className='col-12 col-md-5 d-flex justify-content-center align-items-center h-auto mx-auto mb-auto'>
                <Card className='mt-5 w-100' style={{
                                maxWidth: 600
                            }}>
                                <Card.Body className='w-100 d-flex justify-content-center align-items-center flex-wrap'>
                                        <h2><Alert className='card-title'>Create (+) a Vaccination Center</Alert></h2>
                                        <Form className="w-100 h-100 d-flex justify-content-center align-items-center flex-wrap pt-3" style={{maxWidth: 800, gap: 20}} onChange={onChangeHandler}>
                                                <div className="col-12 w-100 h-100 d-flex flex-wrap" style={{gap: 20}}>
                                                    <FloatingLabel className="col-12 col-md-5 flex-md-grow-1" controlId="floatingInput" label="State"><Form.Control name="state" type="text" placeholder="State" /></FloatingLabel>
                                                    <FloatingLabel className="col-12 col-md-5 flex-md-grow-1" controlId="floatingInput" label="District"><Form.Control name="district" type="text" placeholder="District" /></FloatingLabel>
                                                    <FloatingLabel className="col-12 col-md-5 flex-md-grow-1" controlId="floatingInput" label="Address"><Form.Control name="address" type="text" placeholder="Address" /></FloatingLabel>
                                                    <FloatingLabel className="col-12 col-md-5 flex-md-grow-1" controlId="floatingInput" label="Officer Appointed"><Form.Control name="officerAppointed" type="text" placeholder="Officer Appointed" /></FloatingLabel>
                                                    <FloatingLabel className="col-12 col-md-5 flex-md-grow-1" controlId="floatingInput" label="Vaccine Type"><Form.Control name="vaccineType" type="text" placeholder="vaccineType" /></FloatingLabel>
                                                </div>
                                            <Button variant="dark" onClick={postCenter}>Add Center</Button>
                                        </Form>
                        </Card.Body>
                </Card>          
        </div>
        <div className='col-12 col-md-5 py-5 mx-auto mb-auto' >
              {Centers?.length > 0 && <Alert className='card-title mb-2'>All Centers</Alert>}
              <div className='d-flex flex-wrap overflow-auto' style={{gap:10, maxHeight: 500}}>
                  {Centers?.length > 0 ? Centers?.map((center, index) =>{
                        return (<Center key={index} center={center} removeCenter={removeCenter}/>)
                    })
                    : <Alert className='w-100' variant="dark">No Centers are posted</Alert>
                    }
              </div>
        </div>
            
    </div>
  )
}

export default AdminDashboard