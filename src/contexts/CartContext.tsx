import React, { useState } from "react";

export interface CartContextProps {
  isCartOpen: boolean;
  handleIsOpen: () => void;
  cart: string[];
  handleAddToCart: (product: string) => void;
  handleDeleteFromCart: (product: string) => void;
}

const CartContext = React.createContext<CartContextProps>({
  isCartOpen: false,
  handleIsOpen: () => {},
  cart: [],
  handleAddToCart: () => {},
  handleDeleteFromCart: () => {}
});

const CartContextProvider: React.FC = props => {
  const [isCartOpen, setIsOpen] = useState(false);

  const [cart, setCart] = useState<string[]>([]);

  const handleIsOpen = () => {
    setIsOpen(!isCartOpen);
  };

  const handleAddToCart = (product: string) => {
    setCart([...cart, product]);
  };

  const handleDeleteFromCart = (product: string) => {
    setCart(cart.filter(e => e !== product));
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        handleIsOpen,
        cart,
        handleAddToCart,
        handleDeleteFromCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

const CartContextConsumer = CartContext.Consumer;

export { CartContext, CartContextProvider, CartContextConsumer };
