import React from 'react'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'

const SpecificProductReviews = ({currentItem}) => {
   
        return (
            <div>
                {currentItem.reviews.map((sub)=>{
                    return(
                            <Card className="mb-2 ">
                                    <Card.Body >
                                        <Card.Title>{sub.user.get_full_name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{sub.get_created_at}</Card.Subtitle>
                                        <Card.Text>
                                            {sub.review}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                    )
                })}
            
            </div>
        )
}

const mapStateToProps=(state)=>{
  return{
    currentItem: state.auth.currentItem
  }
}

export default connect(mapStateToProps,{})(SpecificProductReviews)

