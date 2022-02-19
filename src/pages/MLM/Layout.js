import React, { useState } from 'react'
import Aside from './Aside'
import Main from './Main'
import Dashboard from './Dashboard'
import MyOrders from './MyOrders'
import Stock from './Stock'
import MySales from './MySales'
import Districts from './Districts'
import Talukas from './Talukas'
import Cities from './Cities'
import Payouts from './Payouts'
import WeeklyPayouts from './WeeklyPayouts'
import Sale from './Sale'
import StockTransfer from './StockTransfer'
import MyCustomers from './MyCustomers'
import AndroidKey from './AndroidKey'
import MemberKey from './MemberKey'
import { StyledEngineProvider } from '@mui/material/styles'
import NewOrder from './NewOrder'
import AddProduct from './AddProduct'
import ViewProductsList from './ViewProductsList'
import RegisterUser from './RegisterUser'
import ChangePassword from './ChangePassword'
import Downline from './Downline'
import Purchase from './Purchase'
import Ledger from './Ledger'
import Payments from './Payments'
import Direct from './Direct'
import ActiveDirect from './ActiveDirect'
import Team from './Team'
import Managers from './Managers'
import OrderDetails from './OrderDetails'
import AdminOrders from './AdminOrders'
import AdminPayouts from './AdminPayouts'
import AdminPendingPayouts from './AdminPendingPayouts'
import AdminPayments from './AdminPayments'
import GenerateProduct from './GenerateProduct'
import ActivationKeys from './ActivationKeys'
import IntroducersRequest from './IntroducersRequest'
import CreatePackage from './CreatePackage'
import CreatePackageProduct from './CreatePackageProduct'
import SubProductStock from './SubProductStock'
import BankDetails from './BankDetails'
import PendingPayments from '../PendingPayments'
import Introducers from './Introducers'
import Distributers from './Distributers'
import SubProductSale from './SubProductSale'
function Layout({ setLocale }) {
  const [rtl, setRtl] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [image, setImage] = useState(true)
  const [toggled, setToggled] = useState(false)
  const [componentValue, setComponentValue] = useState(<Dashboard />)

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked)
  }

  const handleRtlChange = (checked) => {
    setRtl(checked)
    setLocale(checked ? 'ar' : 'en')
  }
  const handleImageChange = (checked) => {
    setImage(checked)
  }

  const handleToggleSidebar = (value) => {
    setToggled(value)
  }

  const handleMyOrders = () => {
    setComponentValue(
      <StyledEngineProvider injectFirst>
        <MyOrders />
      </StyledEngineProvider>
    )
  }

  const handleDashBoard = () => {
    setComponentValue(<Dashboard />)
  }

  const handleStock = () => {
    setComponentValue(<Stock />)
  }

  const handleMySales = () => {
    setComponentValue(<MySales />)
  }

  const handleDistricts = () => {
    setComponentValue(<Districts />)
  }

  const handleTalukas = () => {
    setComponentValue(<Talukas />)
  }

  const handleCities = () => {
    setComponentValue(<Cities />)
  }

  const handlePayouts = () => {
    setComponentValue(<Payouts />)
  }

  const handleWeeklyPayouts = () => {
    setComponentValue(<WeeklyPayouts />)
  }

  const handleSale = () => {
    setComponentValue(<Sale />)
  }

  const handleStockTransfer = () => {
    setComponentValue(<StockTransfer />)
  }

  const handleMyCustomers = () => {
    setComponentValue(<MyCustomers />)
  }

  const handleOrderForm = () => {
    setComponentValue(<NewOrder />)
  }

  const handleAndroid = () => {
    setComponentValue(<AndroidKey />)
  }

  const handleMember = () => {
    setComponentValue(<MemberKey />)
  }

  const handleAddProduct = () => {
    setComponentValue(<AddProduct />)
  }

  const handleViewProductsList = () => {
    setComponentValue(<ViewProductsList />)
  }

  const handleRegisterUser = () => {
    setComponentValue(<RegisterUser />)
  }

  const handleChangePassword = () => {
    setComponentValue(<ChangePassword />)
  }

  const handleDownline = () => {
    setComponentValue(<Downline />)
  }

  const handlePurchase = () => {
    setComponentValue(<Purchase />)
  }

  const handleLedger = () => {
    setComponentValue(<Ledger />)
  }

  const handlePayments = () => {
    setComponentValue(<Payments />)
  }

  const handleDirect = () => {
    setComponentValue(<Direct />)
  }

  const handleActiveDirect = () => {
    setComponentValue(<ActiveDirect />)
  }

  const handleTeam = () => {
    setComponentValue(<Team />)
  }

  const handleManagers = () => {
    setComponentValue(<Managers />)
  }

  const handleAdminOrders = () => {
    setComponentValue(<AdminOrders />)
  }
  const handleOrderDetails = () => {
    setComponentValue(<OrderDetails />)
  }

  const handleAdminPayouts = () => {
    setComponentValue(<AdminPayouts />)
  }

  const handleAdminPendingPayouts = () => {
    setComponentValue(<AdminPendingPayouts />)
  }
  const handleAdminPayments = () => {
    setComponentValue(<AdminPayments />)
  }

   const handleGenerateProducts = () => {
     setComponentValue(<GenerateProduct />)
   }
    const handleActivationKeys = () => {
     setComponentValue(<ActivationKeys />)
   }
       const handleIntroducersRequest = () => {
         setComponentValue(<IntroducersRequest />)
       }

       
       
  const handleSubProductStock = () => {
    setComponentValue(<SubProductStock />)
  }

    const handleBankDetails = () => {
      setComponentValue(<BankDetails />)
    }      
            
            const handleCreatePackage = () => {
              setComponentValue(<CreatePackage />)
            }   
            
            const handleCreatePackageProduct = () => {
              setComponentValue(<CreatePackageProduct />)
            }
  const handlePendingPayments=() => {
    setComponentValue(<PendingPayments/>)
  }
  
   const handleIntroducers = () => {
     setComponentValue(<Introducers/>)
   }
      const handleSubProductSale = () => {
        setComponentValue(<SubProductSale />)
      }
    const handleDistributers = () => {
      setComponentValue(<Distributers/>) 
    }
  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <Aside
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleDashBoard={handleDashBoard}
        handleMyOrders={handleMyOrders}
        handleStock={handleStock}
        handleMySales={handleMySales}
        handleDistricts={handleDistricts}
        handleTalukas={handleTalukas}
        handleCities={handleCities}
        handlePayouts={handlePayouts}
        handleWeeklyPayouts={handleWeeklyPayouts}
        handleSale={handleSale}
        handleStockTransfer={handleStockTransfer}
        handleMyCustomers={handleMyCustomers}
        handleOrderForm={handleOrderForm}
        handleAndroid={handleAndroid}
        handleMember={handleMember}
        handleAddProduct={handleAddProduct}
        handleViewProductsList={handleViewProductsList}
        handleRegisterUser={handleRegisterUser}
        handleChangePassword={handleChangePassword}
        handleDownline={handleDownline}
        handlePurchase={handlePurchase}
        handleLedger={handleLedger}
        handlePayments={handlePayments}
        handleDirect={handleDirect}
        handleActiveDirect={handleActiveDirect}
        handleTeam={handleTeam}
        handleManagers={handleManagers}
        handleOrderDetails={handleOrderDetails}
        handleAdminOrders={handleAdminOrders}
        handleAdminPayouts={handleAdminPayouts}
        handleAdminPendingPayouts={handleAdminPendingPayouts}
        handleAdminPayments={handleAdminPayments}
        handleGenerateProducts={handleGenerateProducts}
        handleActivationKeys={handleActivationKeys}
        handleIntroducersRequest={handleIntroducersRequest}
        handleCreatePackage={handleCreatePackage}
        handleCreatePackageProduct={handleCreatePackageProduct}
        handleSubProductStock={handleSubProductStock}
        handleBankDetails={handleBankDetails}
        handlePendingPayments={handlePendingPayments}
        handleIntroducers={handleIntroducers}
        handleDistributers={handleDistributers}
        handleSubProductSale={handleSubProductSale}
      />
      <Main
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        componentValue={componentValue}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
      />
    </div>
  )
}

export default Layout
