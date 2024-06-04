// import React from 'react'

// const RestaurantDetailPage = () => {
//   return (
//     <div>RestaurantDetailPage</div>
//   )
// }

// export default RestaurantDetailPage

import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";

function RestaurantDetailPage() {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>{selectedRestaurant && selectedRestaurant.resname}</div>
    </div>
  );
}

export default RestaurantDetailPage;
