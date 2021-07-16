import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
class TestImage extends Component {
 constructor(props) {
            super(props)

            this.state = {
                name: "",
                details: "",
                price: "",
                rating: 0,
                total_ratings: 0,
                front_image: null,
                back_image: null,
                extra_1: null,
                extra_2: null,
                created_by: props.user.id,
                product_type: 1,
                category: 2,
                company: props.user.company_details[0].id
            };
        }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      front_image: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('front_image', this.state.front_image, this.state.front_image.name);
    form_data.append('name', this.state.name);
    form_data.append('price', this.state.price);
    form_data.append('details', this.state.details);
    let url = 'http://localhost:8000/api/products/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
         'Authorization': `Bearer ${this.props.access}`,
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>

          <p>
            <input type="text" placeholder='Product name' id='name' value={this.state.name} onChange={this.handleChange} required/>
          </p>
           <p>
            <input type="text" placeholder='Product price' id='price' value={this.state.price} onChange={this.handleChange} required/>
          </p>
          <p>
            <input type="text" placeholder='Product details' id='details' value={this.state.details} onChange={this.handleChange} required/>
          </p>
         
          <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}
  const mapStateToProps = state => {
//replace Reducer name with state.'Your Reducer name' and .property
       return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
          user: state.auth.user}
}

  
    export default connect(mapStateToProps)(TestImage);
