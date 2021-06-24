import React from 'react'
import { useGlobalContext } from './context'
import { FaTimes } from 'react-icons/fa'
import { LoginPage } from '../pages'
const Modal = () => {
  const { isModaLoginlOpen, closeModalLogin } = useGlobalContext()
  return (
    <div
      className={`${
        isModaLoginlOpen ? 'modal-overlay show-modal' : 'modal-overlay'
      }`}
    >
      <div className='modal-container'>
        <LoginPage />
        <button className='close-modal-btn' onClick={closeModalLogin}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </div>
  )
}

export default Modal
