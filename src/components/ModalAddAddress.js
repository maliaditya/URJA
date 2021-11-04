import React from 'react'
import Modal from 'react-bootstrap/Modal'
import AddAddress from './AddAddress'
function ModalAddAddress(props) {
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
        <Modal.Title id='contained-modal-title-vcenter'>
          Add Address Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddAddress />
      </Modal.Body>
    </Modal>
  )
}

export default ModalAddAddress
