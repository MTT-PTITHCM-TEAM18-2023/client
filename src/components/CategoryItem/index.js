import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

function CategoryItem(props) {
  const { data } = props;
  return (
    <div className="category-item">
      <div className="overlay"></div>
      <div className="category-item__img">
        <img src={data?.image} alt={data?.name} />
      </div>
      <div className="category-item__link">
        <Link to={"/products?" + data.id}>{data?.name}</Link>
      </div>
    </div>
  );
}

export default CategoryItem;
