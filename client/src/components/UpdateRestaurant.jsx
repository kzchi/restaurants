import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useEffect } from "react";

function UpdateRestaurant(props) {
  const { id } = useParams();
  let navigate = useNavigate();
  const [resname, setResName] = useState();
  const [locations, setLocations] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      console.log(response);
      setResName(response.data.data.restaurant.resname);
      setLocations(response.data.data.restaurant.locations);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // dont accidentally refresh the page

    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      resname,
      locations,
    });
    console.log(updatedRestaurant);
    navigate("/");
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={resname}
            onChange={(e) => setResName(e.target.value)}
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            type="text"
            id="location"
            className="form-control"
            placeholder="Enter location"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateRestaurant;
