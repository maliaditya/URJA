import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CreateProduct from './CreateProduct'
import { Button } from 'react-bootstrap'
function ModalAddProduct(props) {
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
          Add Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateProduct />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAddProduct
