import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { auth, db, doc, getDoc, setDoc } from '../firebase/firebase';
import GetDetails from './GetDetails';

const Center = ({center, removeCenter}) => {
    const userData = useSelector((state) => state.auth);
    const [warn, setWarn] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    let dt = new Date().toDateString();
    useEffect(()=>{
      if(center?.[dt]?.length > 2){
        setWarn(true);
      }
    },[userData.centers])
    const apply = async () => {
      if(warn) return;
      setWarn(false);
      let filterIt = userData?.centers?.filter((a) => a.id !== center?.id) || [];
      let arr = {
        ...center,
        applied : [...center.applied, auth.currentUser.uid],
        [dt] : [...center[dt], auth.currentUser.uid]
      }
     
      await setDoc(doc(db, "Centers", "Centers"), {
        centers: [...filterIt, arr]
      });
    }
  return (
    <Card className="col-3 d-flex flex-grow-1 rounded m-md-0 m-3" bg="light" style={{maxWidth: 280, minWidth: 250}}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body >
        <Card.Title>{center.state} - <strong>{center.vaccineType}</strong>  </Card.Title>
        <Card.Text className="d-flex justify-content-center align-items-center" style={{gap:10}}>
            {warn && <strong className="text-danger">Full</strong>}
            {!warn && <strong className="text-danger">Total : {center.applied.length}</strong>}
            <Badge style={{cursor:"pointer"}} onClick={() => setModalShow(true)} bg="secondary">i</Badge>
            {userData.admin && <Button variant="dark" onClick={()=> removeCenter(center)}>Remove</Button>}
            {!warn && !userData.admin && <Button variant="dark" disabled={warn || center?.applied?.filter((a) => a === userData?.userId)?.length > 0} onClick={apply}>{center?.applied?.filter((a) => a === userData?.userId)?.length > 0 ? "Applied" : "Apply"}</Button>}
        </Card.Text>
       
        <GetDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={center}
      />
        </Card.Body>
    </Card>
  )
}

export default Center