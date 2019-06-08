import React, { Component } from 'react';
import './App.sass';
import AddressArea from './components/AddressArea/AddressArea';
import Products from "./components/Products/Products"
import { fetchData } from './api/data.js';

const initialValues = {
  firstname: "",
  lastname: "",
  addresslineone: "",
  addresslinetwo: "",
  city: "",
  state: "",
  zipcode: "",
  country: ""
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      billingAddress: { ...initialValues }, 
      shippingAddress: { ...initialValues },
      orderDate: "", 
      expectedDeliveryDate: ""
    };
  }

  updateInputs(target, {target:{type, name, value}}) {
    switch(type) {
      case "text":
      case "tel":
        this.setState(prevState => ({
          ...prevState,
          [target]: {
            ...prevState[target],
            [name]: value
          }
        }))
        break;
      case "date":
        this.setState({[target]:value});
        break;
      default:
        break;
    }
  }

  onUpdateBillingAddress = (ev) => {
    if(ev.target.type === "date") {
      this.updateInputs("orderDate", ev);
      if(ev.target.value > this.state.expectedDeliveryDate) {
        this.updateInputs("expectedDeliveryDate", ev);
      }
    } else {
      this.updateInputs("billingAddress", ev);
    }
  };

  onUpdateShippingAddress = (ev) => {
    if(ev.target.type === "date") {
      this.updateInputs("expectedDeliveryDate", ev);
    } else {
      this.updateInputs("shippingAddress", ev);
    }
  };

  checkValidity = () => {
    const isBillAddressValid = Object.entries(this.state.billingAddress).reduce((acc, [key, value]) => {
      if(key !== "addresslinetwo") {
        return acc && !!value;
      }
      return acc && true;
    }, true);

    const isShippingAddressValid = Object.entries(this.state.shippingAddress).reduce((acc, [key, value]) => {
      if(key !== "addresslinetwo") {
        return acc && !!value;
      }
      return acc && true;
    }, true);
    const isOrderDateValid = !!this.state.orderDate;
    const isExpectedDeliveryDateValid = !!this.state.expectedDeliveryDate;
    return isBillAddressValid && isShippingAddressValid && isOrderDateValid && isExpectedDeliveryDateValid;
  };

  onSave = (products) => {
    if(!this.checkValidity()) {
      return alert("Apart from address line 2 none of the field can be left black. Please fill and save again")
    };
    console.log({
      ...this.state, 
      product: products.map(product => (
        {...product, totalPrice: "" + (product.unitPrice * product.qty)}
      ))});
  };

  async componentDidMount() {
    const { shippingAddress, billingAddress, orderDate, expectedDeliveryDate } = await fetchData();
    this.setState({ shippingAddress, billingAddress, orderDate, expectedDeliveryDate });
  }

  render() {
    return (
      <div className="App">
        <AddressArea
          onUpdateBillingAddress={this.onUpdateBillingAddress}
          onUpdateShippingAddress={this.onUpdateShippingAddress}
          billingAddress={this.state.billingAddress}
          shippingAddress={this.state.shippingAddress}
          orderDate={this.state.orderDate}
          expectedDeliveryDate={this.state.expectedDeliveryDate} />

        <Products onSave={this.onSave}/>
      </div>
    );
  }
}

export default App;
