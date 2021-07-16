import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

// const api = process.env.REACT_APP_API_URL
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
       <Card className="mb-2 ">
          <Card.Body >
            <Card.Title>Mike Ross</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Reviewed on 16 July 2021</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
          </Card.Body>
      </Card>
          <Card className="mb-2 ">
          <Card.Body >
            <Card.Title>John Doe</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Reviewed on 16 July 2021</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
          </Card.Body>
      </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>close</Button> &nbsp;&nbsp;&nbsp;
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDeleteProduct
