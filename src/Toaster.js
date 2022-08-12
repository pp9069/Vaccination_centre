import React from 'react'
import Toast from 'react-bootstrap/Toast';

const Toaster = ({text}) => {
  return (
    <Toast>
    <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
      <strong className="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
    </Toast.Header>
    <Toast.Body>{text}</Toast.Body>
  </Toast>
  )
}

export default Toaster