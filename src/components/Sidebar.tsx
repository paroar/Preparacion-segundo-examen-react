import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import Svg from "./Svg";

type PlegableSidebarProps = {
  isOpen: boolean;
};

const PlegableSidebar = styled.div<PlegableSidebarProps>`
  width: ${p => (p.isOpen ? "30rem" : "0rem")};
  position: fixed;
  z-index: 1;
  background-color: orangered;
  right: 0;
  transition: all 1s;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transform: ${p => (p.isOpen ? null : "translateX(2rem)")};
  height: 100%;
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
`;

const Sidebar: React.FC = () => {
  const { isCartOpen, cart, handleDeleteFromCart } = useContext(CartContext);

  return (
    <PlegableSidebar isOpen={isCartOpen}>
      {cart.map(product => (
        <Product isOpen={isCartOpen}>
          <p>{product}</p>
          <div onClick={() => handleDeleteFromCart(product)}>
            <button type="button" className="nav__btn">
              <Svg name="circle-with-cross" />
            </button>
          </div>
        </Product>
      ))}
    </PlegableSidebar>
  );
};

export default Sidebar;
