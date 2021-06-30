import React, { useState, useContext } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isModaLoginlOpen, setisModaLoginlOpen] = useState(false)
  const [isModaSignuplOpen, setisModaSignuplOpen] = useState(false)
  const [isModaSucesslOpen, setisModaSucesslOpen] = useState(false)
  const [isModaInfolOpen, setisModaInfolOpen] = useState(false)

  const openModalLogin = () => {
    setisModaLoginlOpen(true)
  }
  const closeModalLogin = () => {
    setisModaLoginlOpen(false)
  }

  const openModalSignup = () => {
    setisModaSignuplOpen(true)
  }
  const closeModalSignup = () => {
    setisModaSignuplOpen(false)
  }

  const openModalSucess = () => {
    setisModaSucesslOpen(true)
  }
  const closeModalSucess = () => {
    setisModaSucesslOpen(false)
  }

  const openModalInfo = () => {
    setisModaInfolOpen(true)
  }
  const closeModalInfo = () => {
    setisModaInfolOpen(false)
  }
  return (
    <AppContext.Provider
      value={{
        isModaLoginlOpen,
        isModaSignuplOpen,
        isModaSucesslOpen,
        isModaInfolOpen,
        openModalLogin,
        closeModalLogin,
        closeModalSignup,
        openModalSignup,
        closeModalSucess,
        openModalSucess,
        closeModalInfo,
        openModalInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
