import React, { useContext, useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import Banner from "../components/Banner";
import StyledHero from "../components/StyledHero";
import { CartContext } from "../contexts/CartContext";
import { RoomContext } from "../contexts/context";
import defaultBcg from "../images/room-1.jpeg";
import { Room } from "../types/room";

type AddToCartProps = {
  isOnCart: boolean;
};

const AddToCart = styled.div<AddToCartProps>`
  border: 2px solid ${p => (p.isOnCart ? "red" : "#af9a7d")};
  color: ${p => (p.isOnCart ? "red" : "#af9a7d")};
  background-color: transparent;
  display: inline-block;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
`;

type SingleRoomPageProps = RouteComponentProps<{ slug: string }>;

const SingleRoomPage: React.FC<SingleRoomPageProps> = ({
  match: {
    params: { slug }
  }
}) => {
  const [room, setRoom] = useState<Room | undefined>(undefined);

  const { getRoom } = useContext(RoomContext);
  const { cart, handleAddToCart, handleDeleteFromCart } = useContext(
    CartContext
  );

  useEffect(() => {
    getRoom(slug).then(room => setRoom(room));
  }, [slug, getRoom]);

  if (!room) {
    return (
      <div className="error" data-testid="single-room-page">
        <h3> no such room could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </div>
    );
  }
  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images
  } = room;

  const defaultImages = images.slice(1);

  const handleIsOnCart = () => {
    return cart.find(room => room === slug) ? true : false;
  };

  const handleFunctionCart = (isOnCart: boolean) => {
    return isOnCart
      ? () => handleDeleteFromCart(slug)
      : () => handleAddToCart(slug);
  };

  return (
    <>
      <StyledHero img={images[0] || defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImages.map((item, index) => (
            <img key={index} src={item} alt={name} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras </h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
      <section className="room-add">
        <AddToCart
          isOnCart={handleIsOnCart()}
          onClick={handleFunctionCart(handleIsOnCart())}
        >
          {handleIsOnCart() ? "Delete" : "Add"}
        </AddToCart>
      </section>
    </>
  );
};

export default SingleRoomPage;
