import React from "react";
import { RoomConsumer, RoomContextProps } from "../contexts/context";

type Optionalize<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, K>>;

export function withRoomConsumer<T extends RoomContextProps = RoomContextProps>(
  Component: React.ComponentType<T>
) {
  return function ConsumerWrapper(
    props: Optionalize<T, keyof RoomContextProps>
  ) {
    return (
      <RoomConsumer>
        {value => <Component {...value} {...(props as T)} />}
      </RoomConsumer>
    );
  };
}
