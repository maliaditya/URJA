import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CreateProduct from './CreateProduct'
function ModalEditProduct(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Edit Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateProduct />
      </Modal.Body>
    </Modal>
  )
}

export default ModalEditProduct
