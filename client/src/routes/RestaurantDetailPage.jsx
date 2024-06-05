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
import StarReview from "../components/StarReview";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

function RestaurantDetailPage() {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      
      {selectedRestaurant && (
        <>
        <h1 className="text-center display-1" >{selectedRestaurant.restaurant.resname}</h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
}

export default RestaurantDetailPage;
