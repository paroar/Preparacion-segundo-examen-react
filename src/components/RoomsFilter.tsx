import React, { useEffect, useState } from "react";
import { GetRooms } from "../context";
import { rooms } from "../fake-data";
import { RoomFilter } from "../types/room";
import { getUnique } from "../utils/getUnique";
import Title from "./Title";

const minPrice = 0;
const maxPrice = Math.max(...rooms.map(item => item.price));
const maxSize = Math.max(...rooms.map(item => item.size));

const initialFilter: RoomFilter = {
  type: "all",
  capacity: [1],
  // eslint-disable-next-line
  price: [, maxPrice],
  size: [0, maxSize],
  breakfast: false,
  pets: false,
  name: ""
};

const sanitizeFilter = (filter: RoomFilter) => {
  let sanitizedFilter = { ...filter };
  if (sanitizedFilter.type === "all") {
    delete sanitizedFilter.type;
  }
  if (sanitizedFilter.price![1] === maxPrice) {
    delete sanitizedFilter.price;
  }
  if (sanitizedFilter.size![0] === 0 && sanitizedFilter.size![1] === maxSize) {
    delete sanitizedFilter.size;
  }
  if (sanitizedFilter.capacity![0] === 1) {
    delete sanitizedFilter.capacity;
  }
  console.log(sanitizedFilter);

  return sanitizedFilter;
};

const RoomsFilter = ({ filterRooms }: { filterRooms: GetRooms }) => {
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    filterRooms(sanitizeFilter(filter));
  }, [filter, filterRooms]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target;

    setFilter(prevFilter => {
      // @ts-ignore
      let value = target.type === "checkbox" ? target.checked : target.value;
      let name = target.name;

      if (name === "price") {
        // eslint-disable-next-line
        value = [, parseInt(value)];
      }

      if (name === "capacity") {
        value = [parseInt(value)];
      }

      if (name === "minSize") {
        name = "size";
        value = [parseInt(value), prevFilter.size![1]];
      }

      if (name === "maxSize") {
        name = "size";
        value = [prevFilter.size![0], parseInt(value)];
      }

      const newFilter = { ...prevFilter, [name]: value };

      return newFilter;
    });
  };

  // get unique types
  const types = ["all", ...getUnique(rooms, "type")] as string[];

  const Types = types.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));

  // get unique capacity
  const people = getUnique(rooms, "capacity") as number[];
  const People = people.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        <div className="form-group">
          <label htmlFor="type">room name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Search..."
            onChange={handleChange}
          />
        </div>
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={filter.type}
          >
            {Types}
          </select>
        </div>
        {/* end of select type */}
        {/* guests  */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            onChange={handleChange}
            className="form-control"
            value={filter.capacity![0]}
          >
            {People}
          </select>
        </div>
        {/* end of guests */}
        {/* room price */}
        <div className="form-group">
          <label htmlFor="price">room price ${filter.price![1]}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={filter.price![1]}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* end of room price*/}
        {/* size */}
        <div className="form-group">
          <label htmlFor="price">room size </label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              value={filter.size![0]}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              value={filter.size![1]}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* end of select type */}
        {/* extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={filter.breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              checked={filter.pets}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">pets</label>
          </div>
        </div>
        {/* end of extras type */}
      </form>
    </section>
  );
};

export default RoomsFilter;
