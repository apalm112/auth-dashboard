/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  Button
} from "shards-react";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

// const Register = () => (

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/analytics");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.value);
    
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container fluid className="main-content-container h-100 px-4">
        <Row noGutters className="h-100">
          <Col lg="3" md="5" className="auth-form mx-auto my-auto">
            <Card>
              <CardBody>
                {/* Logo shards-dashboards-logo.svg*/}
                <img
                  className="auth-form__logo d-table mx-auto mb-3"
                  src={require("../images/Logo.png")}
                  alt="Shards Dashboards - Register Template"
                />

                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Create New Account
                </h5>

                {/* Form Fields */}
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <FormInput
                      type="email"
                      id="email" //exampleInputEmail1
                      placeholder="Enter email"
                      autoComplete="email"
                      
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      className={classnames("", {
                        invalid: errors.email
                      })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <FormInput
                      type="password"
                      id="password"  // exampleInputPassword1
                      placeholder="Password"
                      autoComplete="new-password"

                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      className={classnames("", {
                        invalid: errors.password
                      })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputPassword2">Repeat Password</label>
                    <FormInput
                      type="password"
                      id="password2"  // exampleInputPassword2
                      placeholder="Repeat Password"
                      autoComplete="new-password"

                      onChange={this.onChange}
                      value={this.state.password2}
                      error={errors.password2}
                      className={classnames("", {
                        invalid: errors.password2
                      })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormCheckbox>
                      I agree with the <a href="#">Terms & Conditions</a>.
                    </FormCheckbox>
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    type="submit"
                  >
                    Create Account
                  </Button>
                </Form>
              </CardBody>

              {/* Social Icons */}
              <CardFooter>
                <ul className="auth-form__social-icons d-table mx-auto">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-github" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-google-plus-g" />
                    </a>
                  </li>
                </ul>
              </CardFooter>
            </Card>

            {/* Meta Details */}
            <div className="auth-form__meta d-flex mt-4">
              <Link to="/forgot-password">Forgot your password?</Link>
              <Link to="/login" className="ml-auto">
                Sign In?
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
};
// export default Register;

Register.propTypes = {
      registerUser: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired,
      errors: PropTypes.object.isRequired
    };

    const mapStateToProps = state => ({
      auth: state.auth,
      errors: state.errors
    });

    export default connect(
      mapStateToProps,
      { registerUser }
    )(withRouter(Register));
