import React from 'react'
import Modal from 'react-bootstrap/Modal'
import styled from 'styled-components'
import verfied from '../assets/verified.svg'
function ModalSuccess(props) {
  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      <Wrapper>
        <center>
          <h3>Success</h3>
          <img src={verfied} alt='' />
          <h5>
            your inquiry has been submitted succsessfully.! <br />
            we will reach you in few hours
          </h5>  
      </center>
    </Wrapper>
  </Modal.Body>
</Modal>
  )
}


const Wrapper = styled.section`
  
  .container {
  margin: auto
  }

`
export default ModalSuccess
