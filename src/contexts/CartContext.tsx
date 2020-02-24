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
  increment: (id: string) => void;
  decrement: (id: string) => void;
}

const CartContext = React.createContext<CartContextProps>({
  isCartOpen: false,
  handleIsOpen: () => {},
  cart: [] as Room[],
  addToCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
  increment: () => {},
  decrement: () => {}
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
    let tempRooms = [...rooms];
    tempRooms.forEach(c => {
      c.inCart = false;
      c.amount = 0;
      c.total = 0;
    });
    setCart([]);
    setRooms(tempRooms);
  };

  const increment = (id: string) => {
    let tempCart = [...cart];
    const cartFind = getRoom(id);
    if (cartFind) {
      let i = tempCart.indexOf(cartFind);
      tempCart[i].amount++;
      tempCart[i].total += tempCart[i].price;
    }
    setCart(tempCart);
  };

  const decrement = (id: string) => {
    let tempCart = [...cart];
    const cartFind = getRoom(id);
    if (cartFind) {
      let i = tempCart.indexOf(cartFind);
      if (tempCart[i].amount > 1) {
        tempCart[i].amount--;
        tempCart[i].total -= tempCart[i].price;
      } else {
        tempCart[i].amount = 0;
        tempCart[i].inCart = false;
        tempCart = tempCart.filter(c => c.id !== id);
      }
    }
    setCart(tempCart);
  };

  const getRoom = (id: string) => {
    return rooms.find(r => r.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        handleIsOpen,
        cart,
        addToCart,
        deleteFromCart,
        clearCart,
        increment,
        decrement
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

const CartContextConsumer = CartContext.Consumer;

export { CartContext, CartContextProvider, CartContextConsumer };
