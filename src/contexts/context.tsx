import React, { Component } from "react";
import { Room, RoomFilter } from "../types/room";
import fetch from "../utils/mockFetch";

export type RoomProviderState = {
  rooms: Room[];
  featuredRooms: Room[];
  loading: boolean;
};

export type GetRooms = (filter: RoomFilter) => Promise<Room[]>;

export interface RoomContextProps {
  loading: boolean;
  getRoom: (slug: string) => Promise<Room | undefined>;
  filterRooms: GetRooms;
  featuredRooms: Room[];
  rooms: Room[];
}

const RoomContext = React.createContext<RoomContextProps>({
  loading: false,
  getRoom: async () => undefined,
  filterRooms: () => Promise.resolve([]),
  featuredRooms: [],
  rooms: []
});

class RoomProvider extends Component<{}, RoomProviderState> {
  state: RoomProviderState = {
    rooms: [],
    featuredRooms: [],
    loading: false
  };

  getRoom = async (slug: string) => {
    const room = this.state.rooms.find(room => room.slug === slug);

    if (room) {
      console.log("ROOM", room);
      return room;
    }
    const rooms = await fetch<Room[]>(
      `/rooms?filter=${JSON.stringify({ slug })}`
    ).then(response => response.json());
    console.log("ROOMS[0]", rooms[0]);

    return rooms[0];
  };

  getRooms = (filter: RoomFilter = {}) => {
    this.setState({
      loading: true
    });
    return fetch<Room[]>(`/rooms?filter=${JSON.stringify(filter)}`)
      .then(response => response.json())
      .then(rooms => {
        this.setState({
          loading: false
        });
        return rooms;
      });
  };

  filterRooms = (filter: RoomFilter = {}) => {
    return this.getRooms(filter).then(rooms => {
      this.setState({
        rooms
      });
      return rooms;
    });
  };

  componentDidMount() {
    this.getRooms({ featured: true }).then(rooms =>
      this.setState({
        featuredRooms: rooms
      })
    );
  }

  render() {
    const { loading, featuredRooms, rooms } = this.state;

    return (
      <RoomContext.Provider
        value={{
          loading,
          getRoom: this.getRoom,
          filterRooms: this.filterRooms,
          featuredRooms,
          rooms
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
