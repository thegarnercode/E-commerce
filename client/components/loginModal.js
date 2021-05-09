import { Component } from 'react'; // import component from react
import { // import various items from Reactstrap
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux'; // import connect from redux
import PropTypes from 'prop-types'; // import prototypes to define all the prop types we will use in this file
import { login } from '../../actions/authActions'; // import login actions
import { clearErrors } from '../../actions/errorActions'; // import clearerror actions

class LoginModal extends Component {
    state = { // define state with email and name set to empty strings
        modal: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes = { // define all our prop types
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) { // we then set up the ComponentDidUpdate and take in the previous props as a parameter
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // Check for login error
            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg: error.msg.msg});
            }
            else{
                this.setState({msg:null});
            }
        }

        // check If authenticated, close modal if authenticated
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => { // set up toggle function to toggle the state of the modal
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => { // set up onChange function to update the value of the email and password as we type in the form fields 
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e) => { // set up an onSubmit function which takes in the email and pasword from the state and passes them to the login action
        e.preventDefault(); 
        
        const {email, password} = this.state;
        const user = {email, password};

        // Attempt to login
        this.props.login(user);
    }

    // Next, we have the JSX code to display our modal and the form within the modal.
    render(){
        return(
            <div className="container">
                <Button color="success" className="btn btn-sm"><NavLink onClick={this.toggle} href="#"><span className="text-dark"><b>Login</b></span></NavLink></Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    
                    <ModalHeader toggle={this.toggle}>
                        Login
                    </ModalHeader>
                    <ModalBody> 
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>):null} 
                            <Form onSubmit={this.onSubmit}>
                            <FormGroup> 
                                <Label for="email">Email</Label> 
                                <Input // In the form, we have two input fields; email and password and submit button.

                                    type="email" 
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

// define a mapStateToProps
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated, // get the isAuthenticated and error from the state we set up in the reducer files
    error: state.error
});

export default connect(mapStateToProps,{login, clearErrors})(LoginModal); // connect the LoginModal to these state and the action functions and export it.