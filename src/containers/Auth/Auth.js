import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        isSignup: true
    }

    inputChangedHandler = ( event, controlName ) => {
        const updateObjectState = (oldObject, updatedProperties) => {
            return {
                ...oldObject,
                ...updatedProperties
            };
        };
        const updatedControls = updateObjectState( this.state.controls, {
            [controlName]: updateObjectState( this.state.controls[controlName], {
                value: event.target.value,
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        if (this.state.isSignup) {
            console.log("signup");
            event.preventDefault();
            this.props.handleSignUp(this.state.controls.email.value, this.state.controls.password.value);
            const requestOptions = {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch('https://budget-api-4166.herokuapp.com/users/register?email=' + this.state.controls.email.value, requestOptions)
        } else {
            console.log("login");
            event.preventDefault();
            this.props.handleLogin(this.state.controls.email.value, this.state.controls.password.value);
        }
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return { isSignup: !prevState.isSignup };
        } );
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        let authRedirect = null;
        if ( this.props.auth ) {
            authRedirect = <Redirect to="/dashboard" />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <p>{this.props.emailErr} {this.props.passErr}</p>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

export default Auth;