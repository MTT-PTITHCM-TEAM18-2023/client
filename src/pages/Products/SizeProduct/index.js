import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { getSizeProduct } from "../../../actions/control-action";
import './style.scss';

function SizeProduct() {
  const data = [38, 39, 40, 41, 42];
  const hasFilter = useSelector((state) => state.filters.hasFilter);
  const [sizeItem, setSizeItem] = useState({
    name: '',
    isActive: false,
  });
  const handleCheckSize = (value) => {
    // dispatch(getSizeProduct(value));
    setSizeItem({
      name: value,
      isActive: true,
    });
  };

  useEffect(() => {
    hasFilter && setSizeItem({ name: '', isActive: false });
  }, [hasFilter]);

  const showSize = (data = []) => {
    return data.map((item, index) => {
      return (
        <li
          key={index}
          onClick={() => handleCheckSize(item)}
          className={
            sizeItem.isActive && sizeItem.name === item
              ? 'active-size products-page__size__item'
              : 'products-page__size__item'
          }
        >
          {item}
        </li>
      );
    });
  };

  return <ul className="products-page__size">{showSize(data)}</ul>;
}

export default SizeProduct;
