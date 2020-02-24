import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import { Room } from "../types/room";
import Svg from "./Svg";

type CartItemProps = {
  item: Room;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { id, name, images, price, amount, total, slug } = item;
  const { increment, decrement, deleteFromCart } = useContext(CartContext);

  return (
    <Item>
      <Link to={`rooms/${slug}`}>
        <Img src={images[0]} />
      </Link>
      <div>{name}</div>
      <div>{price}</div>
      <Btns>
        <Btn onClick={() => decrement(id)}>-</Btn>
        {amount}
        <Btn onClick={() => increment(id)}>+</Btn>
      </Btns>
      <div onClick={() => deleteFromCart(id)}>
        <Svg name="circle-with-cross" />
      </div>
      <div>{total}</div>
    </Item>
  );
};

export default CartItem;

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  margin: 2rem;
  background-color: #f7f7f7;
`;

const Img = styled.img`
  width: 50%;
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 5rem;
  height: 2rem;
`;

const Btn = styled.div`
  cursor: pointer;
  padding: 1rem;
  margin: 1rem;
  background-color: #f7f7f7;
`;
