import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
function ModalDeleteProduct(props) {
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
          Delete Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure that you want to delete this product?</p>
        <div style={{ float: 'right', justifyContent: 'space-around' }}>
          <Button onClick={props.onHide}>Cancel</Button> &nbsp;&nbsp;&nbsp;
          <Button onClick={props.onHide} variant='danger'>
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalDeleteProduct
