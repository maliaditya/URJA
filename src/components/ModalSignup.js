import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Signup from './Signup'

function ModalSignup(props) {
  return (
    <Modal
      {...props}
      style={{ marginTop: '5rem', height: '38rem' }}
      size='lg'
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
