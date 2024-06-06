import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import StarReview from "./StarReview";

function RestaurantList(props) {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  let navigate = useNavigate();

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

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // not hitting navigate
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      console.log(response);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleResSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (res) => {
    if (!res.count){
      return <span className="text-warning">0 review</span>
    }
    return (
      <>
        <StarReview rating={res.id} />
        <span className="text-warning ml-1">({res.count})</span>
      </>
    );
  };

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
            restaurants.map((res) => {
              return (
                <tr onClick={() => handleResSelect(res.id)} key={res.id}>
                  <td>{res.resname}</td>
                  <td>{res.locations}</td>
                  <td>{renderRating(res)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, res.id)}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, res.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
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
