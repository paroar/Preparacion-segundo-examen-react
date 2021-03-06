import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import { Room } from "../types/room";
import Svg from "./Svg";

const Sidebar: React.FC = () => {
  const { isCartOpen, cart, deleteFromCart } = useContext(CartContext);

  return (
    <PlegableSidebar isOpen={isCartOpen}>
      <PlegableContent>
        {cart.map((p: Room) => (
          <Product isOpen={isCartOpen} key={p.id}>
            <Link to={`/rooms/${p.slug}`}>
              <img src={p.images[0]} />
            </Link>
            <div onClick={() => deleteFromCart(p.id)}>
              <button type="button" className="nav__btn">
                <Svg name="circle-with-cross" />
              </button>
            </div>
          </Product>
        ))}
      </PlegableContent>
      <Link to="/checkout">
        <BuyCart>Checkout</BuyCart>
      </Link>
    </PlegableSidebar>
  );
};

export default Sidebar;

type PlegableSidebarProps = {
  isOpen: boolean;
};

const PlegableSidebar = styled.div<PlegableSidebarProps>`
  width: ${p => (p.isOpen ? "30rem" : "0rem")};
  position: fixed;
  z-index: 1;
  background-color: #f7f7f7;
  right: 0;
  transition: all 1s;
  padding: 1rem;
  transform: ${p => (p.isOpen ? null : "translateX(2rem)")};
  height: calc(100vh - 7rem);
  display: grid;
  grid-template-rows: 1fr min-content;
`;

const PlegableContent = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const Product = styled.div<PlegableSidebarProps>`
  padding: 2rem;
  margin: 1rem 0;
  background-color: white;
  display: flex;
  justify-content: ${p => (p.isOpen ? "space-around" : null)};
  align-items: center;
  transition: all 2s;
  overflow: hidden;

  & > a > img {
    width: 100%;
  }
`;

export const BuyCart = styled.button`
  text-transform: uppercase;
  background-color: #af9a7d;
  color: black;
  border: 2px solid #af9a7d;
  display: inline-block;
  cursor: pointer;
  padding: 1rem 1.5rem;
  margin: 1rem;
  width: 90%;
  align-self: flex-end;
  &:hover {
    color: #af9a7d;
    background-color: transparent;
  }
`;
