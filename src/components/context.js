import React, { useState, useContext } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isModaLoginlOpen, setisModaLoginlOpen] = useState(false)
  const [isModaSignuplOpen, setisModaSignuplOpen] = useState(false)

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

  return (
    <AppContext.Provider
      value={{
        isModaLoginlOpen,
        isModaSignuplOpen,
        openModalLogin,
        closeModalLogin,
        closeModalSignup,
        openModalSignup,
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
