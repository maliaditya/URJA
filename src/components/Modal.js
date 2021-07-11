import { LoginPage } from '../pages'
import React from 'react'
import Modal from 'react-bootstrap/Modal'
function ModalLogin(props) {
  return (
    <Modal
      {...props}
      size='300'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginPage props={props} />
      </Modal.Body>
    </Modal>
  )
}

export default ModalLogin
