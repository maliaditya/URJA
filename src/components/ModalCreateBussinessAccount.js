import React from 'react'
import Modal from 'react-bootstrap/Modal'
import BussinessDetails from './BussinessDetails'
function ModalCreateBussinessAccount(props) {
  return (
    <Modal
      style={{ marginTop: '5rem', height: '38rem' }}
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add Bussiness Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BussinessDetails props={props} />
      </Modal.Body>
    </Modal>
  )
}

export default ModalCreateBussinessAccount
