import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SpecificProductReviews from './SpecificProductReviews'
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
          Product reviews
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <SpecificProductReviews/>
       
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>close</Button> &nbsp;&nbsp;&nbsp;
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDeleteProduct
