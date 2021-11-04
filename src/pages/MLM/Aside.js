import React from 'react'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Switch from 'react-switch'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar'
import { FaTachometerAlt, FaLaravel, FaCity, FaRegIdCard } from 'react-icons/fa'
import { VscActivateBreakpoints } from 'react-icons/vsc'
import { GiPayMoney, GiEcology, GiRegeneration } from 'react-icons/gi'
import { RiProductHuntLine, RiTeamFill } from 'react-icons/ri'
import { BiTransferAlt, BiRupee } from 'react-icons/bi'
import { ImTree } from 'react-icons/im'
import { MdAccountBalance } from 'react-icons/md'
import { checkAuthenticated, load_user } from '../../actions/auth'
import { connect } from 'react-redux'
import { IoLinkSharp, IoReorderThreeSharp } from 'react-icons/io5'
const Aside = ({
  image,
  collapsed,
  rtl,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
  handleMyOrders,
  handleDashBoard,
  handleStock,
  handleMySales,
  handleGenerateProducts,
  handleAdminPayments,
  handleChangePassword,
  handleDistricts,
  handleTalukas,
  handleOrderDetails,
  handleCities,
  handlePayouts,
  handleWeeklyPayouts,
  handleSale,
  handleStockTransfer,
  handleMyCustomers,
  handleViewProductsList,
  handleOrderForm,
  handleAdminPendingPayouts,
  handleAndroid,
  handleDownline,
  handleAddProduct,
  handleDirect,
  handleActiveDirect,
  handleTeam,
  handleManagers,
  handleLedger,
  handlePayments,
  handleRegisterUser,
  handlePurchase,
  handleAdminOrders,
  handleAdminPayouts,
  handleMember,
  checkAuthenticated,
  load_user,
  user,
}) => {
  user = JSON.parse(localStorage.getItem('user') || '[]')
  const sellerDetails = user.seller_account[0]
  const intl = useIntl()

  try {
    if (sellerDetails.active_seller[0].is_active && !sellerDetails.is_admin) {
      return (
        <ProSidebar
          // image={image ? sidebarBg : false}
          rtl={rtl}
          collapsed={collapsed}
          toggled={toggled}
          breakPoint='md'
          onToggle={handleToggleSidebar}
        >
          <SidebarHeader>
            <div
              style={{
                padding: '22px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                letterSpacing: '1px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {intl.formatMessage({ id: 'sidebarTitle' })}
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape='circle'>
              <MenuItem
                icon={<FaTachometerAlt />}
                suffix={
                  <span className='badge red'>
                    {intl.formatMessage({ id: 'new' })}
                  </span>
                }
                onClick={handleDashBoard}
              >
                {intl.formatMessage({ id: 'dashboard' })}
              </MenuItem>
              <SubMenu
                // suffix={<span className="badge yellow">3</span>}
                title='My Team'
                icon={<RiTeamFill />}
              >
                <MenuItem onClick={handleDirect}>Direct</MenuItem>
                <MenuItem onClick={handleActiveDirect}> Active Direct</MenuItem>
                <MenuItem onClick={handleTeam}>Team</MenuItem>
                <MenuItem onClick={handleManagers}>Managers</MenuItem>
              </SubMenu>
              <SubMenu
                // suffix={<span className="badge yellow">3</span>}
                title=' My Earnings'
                icon={<BiRupee />}
              >
                <MenuItem onClick={handlePayouts}> Payouts</MenuItem>
                {/* <MenuItem onClick={handleWeeklyPayouts}>Weekly Payouts</MenuItem> */}
                <MenuItem onClick={handleLedger}>Ledger</MenuItem>
                {/* <MenuItem onClick={handleMySales}>Points</MenuItem> */}
                {/* <MenuItem onClick={handlePayments}>Payments</MenuItem> */}
              </SubMenu>
              <SubMenu
                // suffix={<span className="badge yellow">3</span>}
                title=' My Account'
                icon={<MdAccountBalance />}
              >
                <MenuItem>
                  {' '}
                  Profile
                  <Link to='/account' />
                </MenuItem>
                <MenuItem onClick={handleChangePassword}>
                  Change Password
                </MenuItem>
              </SubMenu>
              <SubMenu title='Products & Orders' icon={<RiProductHuntLine />}>
                <MenuItem onClick={handleMyOrders}>My Orders</MenuItem>
                <MenuItem onClick={handleOrderDetails}>Detail Order</MenuItem>
                <MenuItem onClick={handleOrderForm}>Order Form</MenuItem>
                <MenuItem onClick={handleStock}>Stock</MenuItem>
                <MenuItem onClick={handleMySales}>My Sales</MenuItem>
              </SubMenu>
              <MenuItem onClick={handleSale} icon={<FaLaravel />}>
                {' '}
                Sale
              </MenuItem>
              <MenuItem
                onClick={handleGenerateProducts}
                icon={<GiRegeneration />}
              >
                {' '}
                Generate Products
              </MenuItem>

              <MenuItem onClick={handleStockTransfer} icon={<BiTransferAlt />}>
                {' '}
                Stock Transfer{' '}
              </MenuItem>
              <MenuItem onClick={handleRegisterUser} icon={<FaRegIdCard />}>
                {' '}
                Registration
              </MenuItem>
              <MenuItem onClick={handleDownline} icon={<ImTree />}>
                {' '}
                Downline{' '}
              </MenuItem>
              <MenuItem icon={<IoLinkSharp />}> My links </MenuItem>
              <MenuItem icon={<GiEcology />}>
                {' '}
                Urja Ecommerce
                <Link to='/' />
              </MenuItem>
            </Menu>
          </SidebarContent>

          <SidebarFooter style={{ textAlign: 'center' }}>
            <div
              className='sidebar-btn-wrapper'
              style={{
                padding: '20px 24px',
              }}
            >
              <Switch
                height={16}
                width={30}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={handleCollapsedChange}
                checked={collapsed}
                onColor='#219de9'
                offColor='#bbbbbb'
              />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                &nbsp; collapse
              </span>
            </div>
          </SidebarFooter>
        </ProSidebar>
      )
    }
    const sellerlen = sellerDetails.length
    if (sellerlen !== 0 && sellerDetails.is_admin) {
      return (
        <ProSidebar
          // image={image ? sidebarBg : false}
          rtl={rtl}
          collapsed={collapsed}
          toggled={toggled}
          breakPoint='md'
          onToggle={handleToggleSidebar}
        >
          <SidebarHeader>
            <div
              style={{
                padding: '22px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                letterSpacing: '1px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {intl.formatMessage({ id: 'sidebarTitle' })}
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape='circle'>
              <MenuItem
                icon={<FaTachometerAlt />}
                suffix={
                  <span className='badge red'>
                    {intl.formatMessage({ id: 'new' })}
                  </span>
                }
                onClick={handleDashBoard}
              >
                {intl.formatMessage({ id: 'dashboard' })}
              </MenuItem>

              <SubMenu
                // suffix={<span className="badge yellow">3</span>}
                title='Grant Activation Keys'
                icon={<VscActivateBreakpoints />}
              >
                <MenuItem onClick={handleAndroid}>Android Keys</MenuItem>
              </SubMenu>
              {/* <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title='My Team'
            icon={<RiTeamFill />}
            >
            <MenuItem onClick={handleDirect}>Direct</MenuItem>
            <MenuItem onClick={handleActiveDirect}> Active Direct</MenuItem>
            <MenuItem  onClick={handleTeam} >Team</MenuItem>
            <MenuItem  onClick={handleManagers} >Managers</MenuItem>
            </SubMenu>
            <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title=' My Earnings'
            icon={<BiRupee />}
            >
            <MenuItem onClick={handlePayouts}> Payouts</MenuItem>
            <MenuItem onClick={handleOrderForm}>Weekly Payouts</MenuItem>
            <MenuItem  onClick={handleLedger} >Ledger</MenuItem>
            <MenuItem onClick={handleMySales}>Points</MenuItem>
            <MenuItem onClick={handlePayments}>Payments</MenuItem>
          </SubMenu> */}

              <SubMenu
                // suffix={<span className="badge yellow">3</span>}
                title='Products & Orders'
                icon={<RiProductHuntLine />}
              >
                <MenuItem onClick={handleAdminOrders}> Orders</MenuItem>
                {/* <MenuItem  onClick={handleStock} >Customer Orders</MenuItem> */}
                <SubMenu title='Products'>
                  <MenuItem onClick={handleAddProduct}>
                    Add New Product
                  </MenuItem>
                  <MenuItem onClick={handleViewProductsList}>
                    All Products
                  </MenuItem>
                  {/* <MenuItem onClick={handleMySales}>Add Product Category</MenuItem> */}
                </SubMenu>
              </SubMenu>
              <SubMenu
                // suffix={<span className="badge yellow">3</span>}
                title='Districts & Talukas'
                icon={<FaCity />}
              >
                <MenuItem onClick={handleDistricts}>Districts</MenuItem>
                <MenuItem onClick={handleTalukas}>Taluka</MenuItem>
                <MenuItem onClick={handleCities}>Cites</MenuItem>
              </SubMenu>
              <SubMenu
                // suffix={<span className="badge yellow">3</span>}
                title='Payouts & Payments'
                icon={<GiPayMoney />}
              >
                <MenuItem onClick={handleAdminPayouts}>Payouts</MenuItem>
                <MenuItem onClick={handleAdminPayments}>Payments</MenuItem>
                <MenuItem onClick={handleAdminPendingPayouts}>
                  Pending Payouts
                </MenuItem>
                {/* <MenuItem onClick={handleWeeklyPayouts}>Weekly Payouts</MenuItem> */}
                {/* <MenuItem>My Sales</MenuItem> */}
              </SubMenu>
              {/* <SubMenu
            prefix={<span className="badge gray">3</span>}
            title={intl.formatMessage({ id: 'withPrefix' })}
            icon={<FaHeart />}
            >
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
          </SubMenu> */}
              {/* <SubMenu title= 'multiLevela' icon={<FaLaravel />}>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1 </MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2 </MenuItem>
            <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3`}>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.1 </MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.2 </MenuItem>
            <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3.3`}>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.1 </MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.2 </MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.3 </MenuItem>
            </SubMenu>
            </SubMenu>
          </SubMenu> */}
              {/* <MenuItem onClick={handleSale} icon={<FaLaravel />}> Sale</MenuItem>
            <MenuItem onClick={handleStockTransfer} icon={<BiTransferAlt />}> Stock Transfer </MenuItem> */}

              {/* <MenuItem onClick={handleMyCustomers} icon={<IoIosPeople />}> My Customers </MenuItem> */}
              <SubMenu
                // suffix={<span className="badge yellow">3</span>}
                title=' My Account'
                icon={<MdAccountBalance />}
              >
                <MenuItem>
                  {' '}
                  Profile
                  <Link to='/account' />
                </MenuItem>
                <MenuItem onClick={handleChangePassword}>
                  Change Password
                </MenuItem>
              </SubMenu>

              <MenuItem icon={<IoLinkSharp />}>
                {' '}
                My links
                <Link to='/' />
              </MenuItem>
              <MenuItem onClick={handleDownline} icon={<ImTree />}>
                {' '}
                Downline
              </MenuItem>
              <MenuItem onClick={handleRegisterUser} icon={<FaRegIdCard />}>
                {' '}
                Registration
              </MenuItem>
              <MenuItem icon={<GiEcology />}>
                {' '}
                Urja Ecommerce
                <Link to='/' />
              </MenuItem>
            </Menu>
          </SidebarContent>

          <SidebarFooter style={{ textAlign: 'center' }}>
            <div
              className='sidebar-btn-wrapper'
              style={{
                padding: '20px 24px',
              }}
            >
              <Switch
                height={16}
                width={30}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={handleCollapsedChange}
                checked={collapsed}
                onColor='#219de9'
                offColor='#bbbbbb'
              />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                &nbsp; collapse
              </span>
            </div>
          </SidebarFooter>
        </ProSidebar>
      )
    }
  } catch (err) {
    console.log(err)
  }

  return (
    <ProSidebar
      // image={image ? sidebarBg : false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint='md'
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '22px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {intl.formatMessage({ id: 'sidebarTitle' })}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape='circle'>
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={
              <span className='badge red'>
                {intl.formatMessage({ id: 'new' })}
              </span>
            }
            onClick={handleDashBoard}
          >
            {intl.formatMessage({ id: 'dashboard' })}
          </MenuItem>
          <MenuItem icon={<GiEcology />}>
            {' '}
            Urja Ecommerce
            <Link to='/' />
          </MenuItem>
          <SubMenu
            // suffix={<span className="badge yellow">3</span>}
            title='My Team'
            icon={<RiTeamFill />}
          >
            <MenuItem onClick={handleDirect}>Direct</MenuItem>
            <MenuItem onClick={handleActiveDirect}> Active Direct</MenuItem>
            <MenuItem onClick={handleTeam}>Team</MenuItem>
          </SubMenu>
          <SubMenu
            // suffix={<span className="badge yellow">3</span>}
            title=' My Earnings'
            icon={<BiRupee />}
          >
            <MenuItem onClick={handlePayouts}> Payouts</MenuItem>
            {/* <MenuItem onClick={handleOrderForm}>Weekly Payouts</MenuItem> */}
            <MenuItem onClick={handleLedger}>Ledger</MenuItem>
            {/* <MenuItem onClick={handleMySales}>Points</MenuItem> */}
            {/* <MenuItem onClick={handlePayments}>Payments</MenuItem> */}
          </SubMenu>
          <SubMenu
            // suffix={<span className="badge yellow">3</span>}
            title=' My Account'
            icon={<MdAccountBalance />}
          >
            <MenuItem>
              {' '}
              Profile
              <Link to='/account' />
            </MenuItem>
            <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
          </SubMenu>

          <MenuItem icon={<IoLinkSharp />}>
            {' '}
            My links
            <Link to='/' />
          </MenuItem>
          <MenuItem onClick={handleRegisterUser} icon={<FaRegIdCard />}>
            {' '}
            Registration
          </MenuItem>
          <MenuItem onClick={handlePurchase} icon={<IoReorderThreeSharp />}>
            {' '}
            Purchase{' '}
          </MenuItem>
          <MenuItem onClick={handleDownline} icon={<ImTree />}>
            {' '}
            Downline
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className='sidebar-btn-wrapper'
          style={{
            padding: '20px 24px',
          }}
        >
          <Switch
            height={16}
            width={30}
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={handleCollapsedChange}
            checked={collapsed}
            onColor='#219de9'
            offColor='#bbbbbb'
          />
          <span
            style={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            &nbsp; collapse
          </span>
        </div>
      </SidebarFooter>
    </ProSidebar>
  )
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.auth.currentItem,
    access: state.auth.access,
    user: state.auth.user,
    itemSearchedCategoryWiseResult: state.auth.itemSearchedCategoryWiseResult,
    searchKeyword: state.auth.searchKeyword,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, { checkAuthenticated, load_user })(
  Aside
)
