import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Signup from './Signup'

function ModalSignup(props) {
  return (
    <Modal
      {...props}
      size='500'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Signup props={props} />
      </Modal.Body>
    </Modal>
  )
}

export default ModalSignup
