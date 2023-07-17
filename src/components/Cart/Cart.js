import React, { useState } from 'react'

import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };


  const orderHandler = ()=>{
    setIsCheckout(true)
  }

  const onSubmitHandler = async (userData)=>{
    setIsSubmitting(true);

    await fetch('https://food-app-order-d9a5b-default-rtdb.firebaseio.com/orders.json',{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      })
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );



  const modalActions = <div className={classes.actions}>
                          <button className={classes['button--alt']} onClick={props.onClose}>
                            Close
                          </button>
                          {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
                        </div>





const cartModalContant = <>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={onSubmitHandler} onCancel={props.onClose}/>}
      {!isCheckout && modalActions}
  </>

const isSubmittingModalContant = <p>Sending Order Data...</p>

const didSubmitModalContant = <>
                        <div className={classes.actions}>
                        <p>Successfully sent the order</p>
                          <button className={classes.button} onClick={props.onClose}>
                            Close
                          </button>
                          
                        </div>


</>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContant}
      {isSubmitting && isSubmittingModalContant}
      {didSubmit && !isSubmitting && didSubmitModalContant}
    </Modal>
  );
};

export default Cart;
