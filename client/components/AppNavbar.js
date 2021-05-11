// import the LoginModal, Logout and RegisterModal from the auth folder.
// Import the PropTypes and connect function.

import { Component, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container, NavLink } from 'reactstrap';
import RegisterModal from './auth/registerModal';
import Logout from './auth/Logout';
import LoginModal from './auth/loginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component { // define a state to assess whether the Navbar is open or not 
    state = {
        isOpen: false
    }

    static propTypes = { // get the user and isAuthencated states from the auth props 
        auth: PropTypes.object.isRequired
    }

    toggle = () => { // toggle change the open to close and vice vere
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (  // check whether we are authenticated or not,if we are, then we display the username, link to home, cart and orders, and also a Logout button.
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/cart">Cart</NavLink>
                </NavItem>
                <NavItem className="mr-2">
                    <NavLink href="/orders">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = ( // If we are not authenticated, we get the Register and Login modals.
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );

        // Display a Navbar brand, andwhen we are authenticated, we display the authLinks, and when we are not, we display the guestLinks.


        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">E Commerce Store</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar> 
                                { isAuthenticated ? authLinks: guestLinks}                               
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

// define the mapStateToProps and add the auth

const mapStateToProps = state => ({
    auth: state.auth
})

// Then connect it to the AppNavbar class

export default connect(mapStateToProps, null)(AppNavbar);
