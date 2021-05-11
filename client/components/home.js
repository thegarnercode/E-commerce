// This is the homepage of our application, where we display all our items and give the user an option to add items to the cart.

import { Component } from 'react';
import AppNavbar from './AppNavbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Bring in the getItems and addToCart functions from the actions folder
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';

class Home extends Component {

    componentDidMount(){
        this.props.getItems();
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => { //function triggers when we click Add to Cart button in any products
        await this.props.addToCart(id, productId, 1); // It receives the userId and productId and has the addToCart function where it sends these values as parameters and keeps the number of items added to 1.
        alert ('Item added to Cart'); // alert that states you added item to cart 
    }

    render(){
        const { items } = this.props.item;
        const user = this.props.user;
        return (
            <div>
            <AppNavbar/>
            <Container>
                <div className="row">
                {items.map((item)=>( // Use the map functionality to map over items and display the data for each in its own card.
                    <div className="col-md-4"> 
                    <Card className="mb-4">
                        <CardBody> 
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                        </CardBody>
                    </Card>
                    </div>
                ))}
                 </div>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ // mapStateToProps defined which has items, user, and isAuthenticated defined. 
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Home); // we use the connect function to bind the actions and the mapStateToProps with the Home Component