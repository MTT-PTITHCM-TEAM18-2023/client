import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getCategory } from "../../../actions/category";
// import { getProductByCategory } from "../../../actions/control-action";
import { useHistory } from "react-router-dom";
import { productsURL } from "../../../constants/baseURL";
import "./style.scss";

function CategoryProduct(props) {
  const history = useHistory();
  let id = useRef(history.location.search.slice(1));
  const category = useSelector((state) => state.category);
  const hasFilter = useSelector((state) => state.filters.hasFilter);
  const dispatch = useDispatch();
  const [categoryItem, setCategoryItem] = useState({
    name: "",
    isActive: false,
  });

  useEffect(() => {
    // dispatch(getCategory());
    if (hasFilter) {
      setCategoryItem({ id: "", isActive: false });
      id.current = null;
      history.push(productsURL);
    }
    if (id.current) {
      // dispatch(getProductByCategory(id.current));
      setCategoryItem({ id: +id.current, isActive: true });
    }
  }, [dispatch, hasFilter, history]);

  const handleCheckCategory = (value) => {
    // dispatch(getProductByCategory(value.id));
    setCategoryItem({
      id: value.id,
      isActive: true,
    });

    id.current = value.id;
    history.push(productsURL + "?" + value.id);
  };

  const showCategory = (data = []) => {
    return data.map((item) => {
      return (
        <li
          key={item.id}
          onClick={() => handleCheckCategory(item)}
          className={
            categoryItem.isActive && categoryItem.id === item.id
              ? "active products-page__category__item"
              : "products-page__category__item"
          }
        >
          {item.name}
        </li>
      )
    })
  }

  return <ul className="products-page__category">{showCategory(category)}</ul>;
}

export default CategoryProduct;
