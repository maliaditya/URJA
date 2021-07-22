import React from 'react'
import Modal from 'react-bootstrap/Modal'
import styled from 'styled-components'
import SellerDetails from './SellerDetails'
function ModalSellerInfo(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
          Company Details
      </Modal.Header>
      <Modal.Body>
      <Wrapper>
        <SellerDetails/>
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






export default (ModalSellerInfo)

