import React, { useState, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
 import { RestaurantContext } from "../context/RestaurantContext";

export const AddRestaurant = () => {
  const {addRestaurants} = useContext(RestaurantContext);
  const [resname, setResName] = useState("");
  const [locations, setLocations] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        resname,
        locations,
      });
      addRestaurants(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={resname}
              onChange={(e) => setResName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Restaurant Name"
            />
          </div>
          <div className="col">
            <input
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Restaurant Location"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
