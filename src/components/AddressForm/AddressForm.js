import React from "react";
import "./AddressForm.sass";

function AddressForm(props) {
    const {firstname, 
        lastname, 
        addresslineone, 
        addresslinetwo, 
        city, 
        state, 
        zipcode, 
        country} = props.address;
    const date = props.date;

    return <form name={props.name} className="address-form">
        <h4>{props.firstSectionLabel}</h4>
        <div>
            <input name="firstname" placeholder="First Name" value={firstname} onChange={props.onChange} />
            <input name="lastname" placeholder="Last Name" value={lastname} onChange={props.onChange} />
            <input name="addresslineone" placeholder="Address Line 1" value={addresslineone} onChange={props.onChange} />
            <input name="addresslinetwo" placeholder="Address Line 2" value={addresslinetwo} onChange={props.onChange} />
            <input name="city" placeholder="City" value={city} onChange={props.onChange}/>
            <input name="state" placeholder="State" value={state} onChange={props.onChange}/>
            <input name="zipcode" type="tel" placeholder="Zip Code" value={zipcode} onChange={props.onChange}/>
            <input name="country" placeholder="Country" value={country} onChange={props.onChange}/>
        </div>
        <h4>{props.secondSectionLabel}</h4>
        <div>
            <input name="date" type="date" min={props.minDate} value={date} onChange={props.onChange}/>
        </div>
    </form>
}

export default AddressForm;