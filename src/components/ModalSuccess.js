import React from 'react'
import { useGlobalContext } from './context'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import verfied from '../assets/verified.svg'
const ModalSuccess = () => {
  const { isModaSucesslOpen, closeModalSucess } = useGlobalContext()
  return (
    <Wrapper
      className={`${
        isModaSucesslOpen ? 'modal-overlay show-modal' : 'modal-overlay'
      }`}
    >
      <div className='modal-container'>
        <h3>Success</h3>
        <img src={verfied} alt='' />
        <h5>
          your inquiry has been submitted succsessfully.! <br />
          we will reach you in few hours
        </h5>

        <button className='close-modal-btn' onClick={closeModalSucess}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    transition: var(--transition);
    visibility: hidden;
    z-index: -1;
  }
  /* OPEN/CLOSE MODAL */
  .show-modal {
    visibility: visible;
    z-index: 10;
  }
  .modal-container {
    background: white;
    border-radius: var(--radius);
    width: 100vw;
    height: 60vh;
    max-width: var(--fixed-width);
    text-align: center;
    display: grid;
    place-items: center;
    position: relative;
  }
  .close-modal-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-red-dark);
    cursor: pointer;
  }
`

export default ModalSuccess
