import { waitForElement } from "@testing-library/react";
import React from "react";
import FeaturedRooms from "../../containers/FeaturedRooms";
import { RoomProvider } from "../../contexts/context";
import { renderRouter } from "../../utils/tests";

jest.useFakeTimers();

test("if featured rooms are loaded", async () => {
  const { getByTestId, queryByTestId, getAllByTestId } = renderRouter(
    <RoomProvider>
      <FeaturedRooms />
    </RoomProvider>
  );

  const loading = getByTestId("loading");
  expect(loading).toBeInTheDocument();
  expect(queryByTestId("room")).not.toBeInTheDocument();

  jest.runAllTimers();
  await waitForElement(() => getAllByTestId("room"));
  expect(queryByTestId("loading")).not.toBeInTheDocument();
});
