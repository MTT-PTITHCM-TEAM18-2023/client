/* eslint-disable react/prop-types */
import React from 'react';
import './style.scss';

function ShowStar(props) {
  const { stars } = props;
  const show = (stars) => {
    let result = [];
    let i = 0;
    while (i < Math.floor(stars)) {
      result.push(<i key={i} className="fas fa-star"></i>);
      i++;
    }
    if (!Number.isInteger(stars)) {
      result.push(<i key={i} className="fas fa-star-half-alt"></i>);
      i++;
    }
    while (i < 5) {
      result.push(<i key={i} className="far fa-star"></i>);
      i++;
    }
    return result;
  };
  return <div className="show-stars">{show(stars)}</div>;
}

export default ShowStar;
