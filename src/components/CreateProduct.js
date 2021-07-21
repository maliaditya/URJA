import React , { Component} from 'react'
// import styled from 'styled-components'
// import ImageUpload from './ImageUpload'
// import BackImage from './BackImage'
import { connect } from 'react-redux'
import axios from 'axios';



const api = process.env.REACT_APP_API_URL

class CreateProduct extends Component {


 constructor(props) {
            super(props)

            this.state = {
                name: "",
                details: "",
                price: "",
                front_image: null,
                created_by: props.user.id,
                back_image: null,
                category: null,
                product_type: null,
                rating: 0,
                total_ratings: 0,
                company: props.user.company_details[0].id,
                productType:[],
                productCategories:[],
                in_stock:true
            };
        }

  
 

  fetchCategories = async () => {
      const config = {headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${this.props.access}`,
          }}
      const product_type = await axios.get(`${api}/api/product_type/`, config )
      const product_categories = await axios.get(`${api}/api/categories/`, config )
      this.setState({
        productType:product_type.data,
        productCategories:product_categories.data
      })
      console.log(this.state);

  }

   componentDidMount() {
     this.fetchCategories()
  }



  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  };

  handleImageChange = (e) => {
    this.setState({
      front_image: e.target.files[0]
    })
  };

   handleBackImageChange = (e) => {
    this.setState({
      back_image: e.target.files[0]
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
    form_data.append('created_by', this.state.created_by);
    form_data.append('category', this.state.category);
    form_data.append('back_image', this.state.back_image);
    form_data.append('product_type', this.state.product_type);
    form_data.append('company', this.state.company);
    form_data.append('rating', this.state.rating);
    form_data.append('total_ratings', this.state.total_ratings);
    form_data.append('in_stock', this.state.in_stock);

    alert("Your file is  being uploaded")
    let url = `${api}/api/products/`
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
         'Authorization': `Bearer ${this.props.access}`,
      }
    })
        .then(res => {
          console.log(res.data);
          alert("Your file is  uploaded!")

        })
        .catch(err => {
          console.log(err)
          alert(err)
        })

    this.setState({
              name:'',
              details:'',
              price:'',
              front_image:'',
              back_image:'',
              category:'',
              product_type:''
    })
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <p>
          <label class="form-label">Seller </label>
           <select class='form-select' onChange={(e) => this.setState({product_type:e.target.value})} >  
               {this.state.productType.map((item) => {
                 return  <option key={item.id} id='product_type' onChange={(e) => this.setState({product_type:item.id})} value={item.id}> {item.product_type }</option>
                })}        
            </select>
                </p>
                      <p>
          <label class="form-label">Product Category</label>
           <select class='form-select'onChange={(e) => this.setState({category:e.target.value})}>
               
               {this.state.productCategories.map((item) => {
                 return  <option key={item.id} required id='category' value={item.id} onChange={(e) => this.setState({category:item.id})}> {item.category_name }</option>
                })}   
             
            </select>
                </p>

          <p>
            <label class="form-label">Product name</label>
            <input type="text" class="form-control" placeholder='Product name' id='name' value={this.state.name} onChange={this.handleChange} required/>
          </p>
           <p>
            <label class="form-label">Product price</label>

            <input type="text" class="form-control" placeholder='Product price' id='price' value={this.state.price} onChange={this.handleChange} required/>
          </p>
          <p>
            <label class="form-label">Product details</label>

            <textarea type="text" class="form-control" placeholder='Product details' id='details' value={this.state.details} onChange={this.handleChange} required/>
          </p>
         
          <p>
            
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
           <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleBackImageChange} required/>
          </p>
          <button className='btn btn-primary' type="submit">Upload Product</button>
        </form>
      </div>
    );
  }
}
  const mapStateToProps = state => {
       return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
          user: state.auth.user}
}

  


export default connect(mapStateToProps, {})(CreateProduct)
