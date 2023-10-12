import React from "react";
import ProductItem from "../ProductItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loading from "./../Loading";

import "./style.scss";
import { useSelector } from "react-redux";

const showProduct = (data = [], xl) => {
  return data.map((item) => {
    return (
      <Col xl={xl} key={item.id}>
        <ProductItem data={item} />
      </Col>
    )
  })
}

function ProductList(props) {
  const showLoading = useSelector((state) => state.ui?.showLoading)
  const { data = [], xl } = props
  return (
    <>
      {showLoading ? (
        <Loading />
      ) : (
        <Row>
          {data.length === 0 ? (
            <Col>
              <p className="text-center">No product</p>
            </Col>
          ) : (
            showProduct(data, xl)
          )}
        </Row>
      )}
    </>
  )
}

export default ProductList;
