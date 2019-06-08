import React from "react";
import "./AddressArea.sass";
import AddressForm from "../AddressForm/AddressForm";


function AddressArea(props) {
    return <section className="address-area">
        <AddressForm 
            name="billingAddress"
            firstSectionLabel="Billing Address" 
            secondSectionLabel="Order Date" 
            onChange={props.onUpdateBillingAddress}
            address={props.billingAddress}
            date={props.orderDate}/>
        <AddressForm 
            name="shippingAddress"
            firstSectionLabel="Shipping Address" 
            secondSectionLabel="Expected Delivery Date" 
            onChange={props.onUpdateShippingAddress}
            address={props.shippingAddress}
            date={props.expectedDeliveryDate}
            minDate={props.orderDate}/>
    </section>;
}

export default AddressArea;