import React from "react";
import Loading from "../components/Loading";
import RoomsFilter from "../components/RoomsFilter";
import RoomsList from "../components/RoomsList";
import { RoomContextProps } from "../contexts/context";

function Rooms({ loading, filterRooms, rooms }: RoomContextProps) {
  return (
    <>
      <RoomsFilter filterRooms={filterRooms} />
      {loading ? <Loading /> : <RoomsList rooms={rooms} />}
    </>
  );
}

export default Rooms;
