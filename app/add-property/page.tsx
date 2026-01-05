"use client";

import { ChangeEvent, useState } from "react";
import axios from "axios";

function Add_property() {
  const [newProperty, setNewProperty] = useState({
    title: "",
    image: "",
    price: "",
    address: "",
    bedroom: "",
    floor: "",
    area: "",
    forsale: "",
    property_type: "",
  });

  const handleChangeProperty = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setNewProperty({
      ...newProperty,
      [name]: value,
    });
  };

  const handleCreateProperty = () => {
    axios({
      method: "POST",
      url: "http://localhost:3004/properties",
      data: {
        id: Math.floor(Math.random() * 1000).toString,
        title: newProperty.title,
        image: newProperty.image,
        price: newProperty.price,
        address: newProperty.address,
        bedroom: newProperty.bedroom,
        floor: newProperty.floor,
        area: newProperty.area,
        forsale: newProperty.forsale,
        property_type: newProperty.property_type,
      },
    });
  };

  return (
    <div className="bg-slate-300 p-4">
      <h1>Add Property</h1>
      <div className="grid grid-cols-3 gap-4 m-4">
        <input
          onChange={handleChangeProperty}
          name="title"
          type="text"
          placeholder="Title"
        />
        <input
          onChange={handleChangeProperty}
          name="image"
          type="text"
          placeholder="Image"
        />
        <input
          onChange={handleChangeProperty}
          name="price"
          type="number"
          placeholder="Price"
        />
        <input
          onChange={handleChangeProperty}
          name="address"
          type="text"
          placeholder="Address"
        />
        <input
          onChange={handleChangeProperty}
          name="bedroom"
          type="number"
          placeholder="Bedroom"
        />
        <input
          onChange={handleChangeProperty}
          name="floor"
          type="number"
          placeholder="Floor"
        />
        <input
          onChange={handleChangeProperty}
          name="area"
          type="number"
          placeholder="Area"
        />
        <input
          onChange={handleChangeProperty}
          name="forsale"
          type="text"
          placeholder="Forsale"
        />
        <input
          onChange={handleChangeProperty}
          name="property_type"
          type="text"
          placeholder="Property Type"
        />
      </div>
      <button
        onClick={handleCreateProperty}
        className="bg-sky-300 text-white px-4 py-1 mt-2 font-semibold"
      >
        Create New Property
      </button>
    </div>
  );
}

export default Add_property;
