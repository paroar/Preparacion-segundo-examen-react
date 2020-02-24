import React, { useContext } from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";
import { Room } from "../types/room";

const total = (acc: number, cur: Room) => acc + cur.total;

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <>
      <CartRows>
        <span>images</span>
        <span>name</span>
        <span>price</span>
        <span>amount</span>
        <span>delete</span>
        <span>total</span>
      </CartRows>
      {cart.map(c => (
        <CartItem item={c} />
      ))}
      <Bottom>
        Total: {cart.reduce(total, 0)}
        <ClearCart onClick={clearCart}>Clear Cart</ClearCart>
      </Bottom>
    </>
  );
};

export default Checkout;

const CartRows = styled.div`
  padding: 5rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  justify-items: center;
  margin: 2rem;
  text-transform: uppercase;
`;

export const ClearCart = styled.button`
  text-transform: uppercase;
  background-color: #af9a7d;
  color: black;
  border: 2px solid #af9a7d;
  cursor: pointer;
  padding: 1rem 1.5rem;
  &:hover {
    color: #af9a7d;
    background-color: transparent;
  }
`;

const Bottom = styled.div`
  display: grid;
  justify-items: flex-end;
  margin-right: 2rem;
  gap: 2rem 0;
`;
