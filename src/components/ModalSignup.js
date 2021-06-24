import React from 'react'
import { useGlobalContext } from './context'
import { FaTimes } from 'react-icons/fa'
import Signup from './Signup'
const ModalSignup = () => {
  const { isModaSignuplOpen, closeModalSignup } = useGlobalContext()
  return (
    <div
      className={`${
        isModaSignuplOpen ? 'modal-overlay show-modal' : 'modal-overlay'
      }`}
    >
      <div className='modal-container'>
        <Signup />
        <button className='close-modal-btn' onClick={closeModalSignup}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </div>
  )
}

export default ModalSignup
