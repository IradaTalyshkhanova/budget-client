import React, { Component } from 'react';

import Visualization from '../components/Visualization/Visualization';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import classes from './Containers.module.css';

class Dashboard extends Component {
    state = {
        orderForm: {
            income: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Income'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            groceries: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Groceries'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            housing: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Housing Cost'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            utilities: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Utilities'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            transportation: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Transportation'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            insurance: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Insurance'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            other: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Other'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
    }

    componentWillMount() {
        this.callAPI();
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderForm: this.state.orderForm })
        };
        //fetch('http://localhost:9000/budget/update?email=' + this.props.email, requestOptions)
        fetch('https://budget-api-4166.herokuapp.com/budget/update?email=' + this.props.email, requestOptions)
    }
    
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    syncReponseToState = (res) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormGroceries = { 
            ...updatedOrderForm["groceries"]
        };
        updatedFormGroceries.value = res.groceries;
        const updatedFormHousing = { 
            ...updatedOrderForm["housing"]
        };  
        updatedFormHousing.value = res.housing;
        const updatedFormIncome = { 
            ...updatedOrderForm["income"]
        };
        updatedFormIncome.value = res.income;
        const updatedForminsurance = { 
            ...updatedOrderForm["insurance"]
        };
        updatedForminsurance.value = res.insurance;
        const updatedFormOther = { 
            ...updatedOrderForm["other"]
        };
        updatedFormOther.value = res.other;
        const updatedFormTransportation = { 
            ...updatedOrderForm["transportation"]
        };
        updatedFormTransportation.value = res.transportation;
        const updatedFormUtilities = { 
            ...updatedOrderForm['utilities']
        };
        updatedFormUtilities.value = res.utilities;
        updatedOrderForm["groceries"] = updatedFormGroceries;
        updatedOrderForm["housing"] = updatedFormHousing;
        updatedOrderForm["income"] = updatedFormIncome;
        updatedOrderForm["insurance"] = updatedForminsurance;
        updatedOrderForm["other"] = updatedFormOther;
        updatedOrderForm["transportation"] = updatedFormTransportation;
        updatedOrderForm["utilities"] = updatedFormUtilities;
        return updatedOrderForm;
    }

    callAPI() {
        //fetch('http://localhost:9000/budget/get?email=' + this.props.email)
        fetch("https://budget-api-4166.herokuapp.com/budget/get?email=" + this.props.email)
            .then(res => res.text())
            .then(res => {
                console.log(res)
                res = JSON.parse(res);
                console.log(res)
                const updatedOrderForm = {
                    ...this.state.orderForm
                };
                const updatedFormGroceries = { 
                    ...updatedOrderForm["groceries"]
                };
                updatedFormGroceries.value = res.groceries;
                const updatedFormHousing = { 
                    ...updatedOrderForm["housing"]
                };  
                updatedFormHousing.value = res.housing;
                const updatedFormIncome = { 
                    ...updatedOrderForm["income"]
                };
                updatedFormIncome.value = res.income;
                const updatedForminsurance = { 
                    ...updatedOrderForm["insurance"]
                };
                updatedForminsurance.value = res.insurance;
                const updatedFormOther = { 
                    ...updatedOrderForm["other"]
                };
                updatedFormOther.value = res.other;
                const updatedFormTransportation = { 
                    ...updatedOrderForm["transportation"]
                };
                updatedFormTransportation.value = res.transportation;
                const updatedFormUtilities = { 
                    ...updatedOrderForm['utilities']
                };
                updatedFormUtilities.value = res.utilities;
                updatedOrderForm["groceries"] = updatedFormGroceries;
                updatedOrderForm["housing"] = updatedFormHousing;
                updatedOrderForm["income"] = updatedFormIncome;
                updatedOrderForm["insurance"] = updatedForminsurance;
                updatedOrderForm["other"] = updatedFormOther;
                updatedOrderForm["transportation"] = updatedFormTransportation;
                updatedOrderForm["utilities"] = updatedFormUtilities;
                this.setState({orderForm: updatedOrderForm})
            });
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">Update</Button>
            </form>
        );
        
        let dash = "";
        if(this.props.auth) {
            dash = (<div>
                <div className={classes.Visual}>
                    <Visualization budgetData={this.state.orderForm}/>
                </div>
                <div className={classes.Adjust}>
                    <h4>Adjust Budget...{this.props.cat}</h4>
                    <div className={classes.Form}>
                        {form}
                    </div>
                </div>
            </div>)
        } else {
            dash = (<div><p>Log in to see Dashboard...</p></div>)
        }

        return dash;
    }
};

export default Dashboard;