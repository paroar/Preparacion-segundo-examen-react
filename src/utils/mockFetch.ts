import { rooms, services } from "../fake-data";
import { RoomFilter } from "../types/room";
import allKeysFilter from "./filter";

type JSONResponse<T> = {
  json: () => Promise<T>;
};

const jsonRensonse = <T>(data: T): JSONResponse<T> => ({
  json: () => Promise.resolve(data)
});

const mockFetch = <T>(url: string): Promise<JSONResponse<T>> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "/services") {
        // @ts-ignore
        return resolve(jsonRensonse(services));
      }

      const roomMatcher = url.match(/^\/rooms\??(:?filter=(.+))?/);

      if (roomMatcher) {
        let filter: RoomFilter = {};
        try {
          filter = JSON.parse(roomMatcher[2] || "{}");
        } catch {
          // Nothing
        } finally {
          return resolve(
            // @ts-ignore
            jsonRensonse(allKeysFilter(rooms, filter))
          );
        }
      }

      reject("Invalid end point");
    }, 5000);
  });

export default mockFetch;
