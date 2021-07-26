import React from 'react'
import Modal from 'react-bootstrap/Modal'
import UpdateProduct from './UpdateProduct'
function ModalEditProduct(props) {
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
          Edit Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateProduct />
      </Modal.Body>
    </Modal>
  )
}

export default ModalEditProduct
