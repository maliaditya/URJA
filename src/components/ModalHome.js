import React from 'react'
import Modal from 'react-bootstrap/Modal'
// import { LoginPage } from '../pages'
function ModalHome(props) {
  return (
    <div>

      <Modal
        style={{ height: '40rem', marginTop:'10vh' }}
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>

          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h6>
            <b>

          Why Urja?
            </b>
          <br />
          <ol style={{listStyleType: 'square'}}>
  <li>Urja is a platform where you can take your local business to the next level</li>
  <li>Urja helps you to grow your business</li>
  <li> you can connect with customers around the world and exchange contact details.</li>
</ol>  

<b>
How to register?

</b>
<br />
 <ol style={{listStyleType: 'square'}}>
<li>Once you open the Urja website you need to register yourself with Urja</li>
  <li>There is a button in the top right corner of the home page, from where you can sign up as a new user.</li>
  <li> user need to fill all mandatory field shown in sign up form after that user can clicks on create account, </li>
  <li>he/she will receive one email from Urja, User have to open mail and click on verify email </li>
  <li> after verifying email user can log in to Urja Site. </li>
  <li>once you sign up you will have full access to the site where the user can view vendor information, latest products, etc.</li>
  <li>if you have already registered yourself in Urja, all you need to do is click on the login button.</li>

</ol>
<b>
Seller Account?

</b>
<br />
<ol style={{listStyleType: 'square'}}>
<li>After you successfully registered as a Urja user, you can sell your own products on Urja site.</li>
  <li>For selling your products through Urja, user will need to click on “sell you products” button.</li>
  <li> Once you click on sell your product button company information form will appear user will have to fill all field in order to proceed  </li>
  <li>After successfully fill up the information, User will see “My Products” button under account section. </li>
  <li>From My Products section user can add their products to Urja Site. </li>
  <li>  Once admin approved users product from Urja Admin the product will go live if admin doesn’t approve users product then the product will not be able to go live.</li>
</ol>
<b>
Normal Account?
</b>
<br />
<ol style={{listStyleType: 'square'}}>
<li>User can view sellers products,contact details.</li>
  <li>User can contact to the seller if you need anything from particular seller, </li>
  <li>Seller will get in touch with you after you enquires something from seller. </li>
  <li> An normal account user can become seller anytime they want.</li>
</ol>
<br />
<center >
<b>
  <h4>

Thank You!
  </h4>
</b>
</center>
</h6>
          {/* <LoginPage /> */}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalHome
