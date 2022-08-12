import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function GetDetails({show, onHide, data}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.state} - {data.district} - {data.vaccineType}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       Total appointments are : {data.applied.length} 
       <br/>
       Officer : {data.officerAppointed}
       <br />
       <span >Address : {data.address}</span>
      </Modal.Body>
    </Modal>
  );
}
export default GetDetails;