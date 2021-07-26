import { LoginPage } from '../pages'
import React from 'react'
import Modal from 'react-bootstrap/Modal'
function ModalLogin(props) {
  return (
    <div>
      <Modal
        style={{ height: '50rem' }}
        {...props}
        size='lg'
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
    </div>
  )
}

export default ModalLogin
