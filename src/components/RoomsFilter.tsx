import React, { useEffect, useState } from "react";
import { GetRooms } from "../context";
import { rooms } from "../fake-data";
import { RoomFilter } from "../types/room";
import { getUnique } from "../utils/getUnique";
import Title from "./Title";

const minPrice = Math.min(...rooms.map(item => item.price));
const maxPrice = Math.max(...rooms.map(item => item.price));
const minSize = Math.min(...rooms.map(item => item.size));
const maxSize = Math.max(...rooms.map(item => item.size));

const initialFilter: RoomFilter = {
  type: "all",
  capacity: [1],
  // eslint-disable-next-line
  price: [minPrice, maxPrice],
  size: [minSize, maxSize],
  breakfast: "Breakfast",
  pets: "Pets",
  featured: "Featured",
  name: ""
};

const sanitizeFilter = (filter: RoomFilter) => {
  let sanitizedFilter = { ...filter };
  if (sanitizedFilter.type === "all") {
    delete sanitizedFilter.type;
  }
  if (
    sanitizedFilter.price![0] === minPrice &&
    sanitizedFilter.price![1] === maxPrice
  ) {
    delete sanitizedFilter.price;
  }
  if (
    sanitizedFilter.size![0] === minSize &&
    sanitizedFilter.size![1] === maxSize
  ) {
    delete sanitizedFilter.size;
  }
  if (sanitizedFilter.capacity![0] === 1) {
    delete sanitizedFilter.capacity;
  }
  if (sanitizedFilter.breakfast === "Breakfast") {
    delete sanitizedFilter.breakfast;
  }
  if (sanitizedFilter.pets === "Pets") {
    delete sanitizedFilter.pets;
  }
  if (sanitizedFilter.featured === "Featured") {
    delete sanitizedFilter.featured;
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
        value = [prevFilter.price![0], parseInt(value)];
        name = "price";
      }

      if (name === "minPrice") {
        // eslint-disable-next-line
        value = [parseInt(value), prevFilter.price![1]];
        name = "price";
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

      if (name === "breakfast") {
        name = "breakfast";
        if (value === "true") {
          value = true;
        } else if (value === "false") {
          value = false;
        }
      }

      if (name === "pets") {
        name = "pets";
        if (value === "true") {
          value = true;
        } else if (value === "false") {
          value = false;
        }
      }

      if (name === "featured") {
        name = "featured";
        if (value === "true") {
          value = true;
        } else if (value === "false") {
          value = false;
        }
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
          <label htmlFor="minPrice">Min room price ${filter.price![0]}</label>
          <input
            type="range"
            name="minPrice"
            min={minPrice}
            max={maxPrice}
            id="minPrice"
            value={filter.price![0]}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Max room price ${filter.price![1]}</label>
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
          <label htmlFor="size">room size </label>
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
          <label htmlFor="pets">Breakfast</label>
          <select
            name="breakfast"
            id="breakfast"
            onChange={handleChange}
            className="form-control"
            //@ts-ignore
            value={filter.breakfast}
          >
            <option value="Breakfast" disabled>
              --
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="breakfast"></label>
        </div>

        <div className="form-group">
          <label htmlFor="pets">Pets</label>
          <select
            name="pets"
            id="pets"
            onChange={handleChange}
            className="form-control"
            //@ts-ignore
            value={filter.pets}
          >
            <option value="Pets" disabled>
              --
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="pets"></label>
        </div>

        <div className="form-group">
          <label htmlFor="featured">featured</label>
          <select
            name="featured"
            id="featured"
            onChange={handleChange}
            className="form-control"
            //@ts-ignore
            value={filter.featured}
          >
            <option value="Featured" disabled>
              --
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="featured"></label>
        </div>
        {/* end of extras type */}
      </form>
    </section>
  );
};

export default RoomsFilter;
