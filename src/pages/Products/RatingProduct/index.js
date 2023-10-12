import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getRatingProduct } from "../../../actions/control-action";
import ShowStar from "./../../../components/ShowStar";
import "./style.scss";

function RatingProduct(props) {
  const dispatch = useDispatch();
  const hasFilter = useSelector((state) => state.filters.hasFilter);
  const data = [1, 2, 3, 4, 5];
  const [ratingItem, setRatingItem] = useState({
    name: "",
    isActive: false,
  });

  const handleCheckRating = (value) => {
    // dispatch(getRatingProduct(value));
    setRatingItem({
      name: value,
      isActive: true,
    });
  };

  useEffect(() => {
    hasFilter && setRatingItem({ name: "", isActive: false });
  }, [hasFilter]);

  const showRating = (data = []) => {
    return data.map((item, index) => {
      return (
        <li
          key={index}
          onClick={() => handleCheckRating(item)}
          className={
            ratingItem.isActive && ratingItem.name === item
              ? "active-star products-page__rating__item"
              : "products-page__rating__item"
          }
        >
          <ShowStar stars={item} />
        </li>
      )
    })
  }

  return <ul className="products-page__rating">{showRating(data)}</ul>;
}

export default RatingProduct;
