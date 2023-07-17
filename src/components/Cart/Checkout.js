import React, { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() !== 0;
const isFiveChar = value => value.trim().length === 5;


const Checkout = (props) => {

    const [formInputValidity, setFormInputValidity] = useState({
        name:true,
        street: true,
        postalcode: true,
        city:true
    });
    
    const nameInput = useRef();
    const streetInput = useRef();
    const postalCodeInput = useRef();
    const cityInput = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInput.current.value;
        const enteredStreet = streetInput.current.value;
        const enteredPostalCode = postalCodeInput.current.value;
        const enteredCity = cityInput.current.value;

        const enteredNameIsvalid = isEmpty(enteredName);
        const enteredStreetIsValid = isEmpty(enteredStreet);
        const enteredPostalCodeisValid =isFiveChar(enteredPostalCode);
        const enteredCityIsValid = isEmpty(enteredCity);

        setFormInputValidity({
            name:enteredNameIsvalid,
            street:enteredStreetIsValid ,
            postalcode:enteredPostalCodeisValid,
            city:enteredCityIsValid
        })
        console.log(formInputValidity)
         const formIsValid = enteredNameIsvalid && enteredPostalCodeisValid && enteredStreetIsValid && enteredCityIsValid;

        if(!formIsValid){
            return ;
        } 

        props.onConfirm({
          name: enteredName,
          street: enteredStreet,
          postalcode: enteredPostalCode,
          city: enteredCity
        })

    };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInput}/>
        {!formInputValidity.name && <p>Name Shouldn't Be Empty</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInput}/>
        {!formInputValidity.street && <p>Street Shouldn't Be Empty</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postalcode? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInput}/>
        {!formInputValidity.postalcode && <p>Postal code Shouldn Be 5 Character</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.city? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInput}/>
        {!formInputValidity.city && <p>City Shouldn't Be Empty</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button type='submit' className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
