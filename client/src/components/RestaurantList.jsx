import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";

function RestaurantList(props) {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        console.log(response.data.data);
        setRestaurants(response.data.data.restaurants);
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th>Name</th>
            <th>Location</th>
            <th>Ratings</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr key={restaurant.id}>
                  <td>{restaurant.resname}</td>
                  <td>{restaurant.locations}</td>
                  <td>reviews</td>
                  <td>
                    <button className="btn btn-warning">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
