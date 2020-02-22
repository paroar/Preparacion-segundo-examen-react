import React, { useState } from "react";
import initialRooms from "../fake-data/rooms";
import { Room } from "../types/room";

export interface CartContextProps {
  isCartOpen: boolean;
  handleIsOpen: () => void;
  cart: Room[];
  addToCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextProps>({
  isCartOpen: false,
  handleIsOpen: () => {},
  cart: [] as Room[],
  addToCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {}
});

const CartContextProvider: React.FC = props => {
  const [isCartOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState(initialRooms);
  const [cart, setCart] = useState<Room[]>([]);

  const handleIsOpen = () => {
    setIsOpen(!isCartOpen);
  };

  const addToCart = (id: string) => {
    let tempRooms = [...rooms];
    let i = tempRooms.findIndex(r => r.id === id);
    tempRooms[i].inCart = true;
    tempRooms[i].amount = 1;
    tempRooms[i].total = tempRooms[i].price * tempRooms[i].amount;
    setCart([...cart, tempRooms[i]]);
    setRooms(tempRooms);
  };

  const deleteFromCart = (id: string) => {
    let tempRooms = [...rooms];
    let tempCart = cart.filter(c => c.id !== id);
    let i = tempRooms.findIndex(r => r.id === id);
    tempRooms[i].inCart = false;
    tempRooms[i].amount = 0;
    tempRooms[i].total = 0;
    setCart(tempCart);
    setRooms(tempRooms);
  };

  const clearCart = () => {
    cart.forEach(c => deleteFromCart(c.id));
  };

  // const getRoom = (id: string) => {
  //   return rooms.find(r => r.id === id);
  // };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        handleIsOpen,
        cart,
        addToCart,
        deleteFromCart,
        clearCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

const CartContextConsumer = CartContext.Consumer;

export { CartContext, CartContextProvider, CartContextConsumer };
