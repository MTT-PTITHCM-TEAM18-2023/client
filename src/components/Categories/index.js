import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryItem from "../CategoryItem";
import Loading from "../Loading";
import { useSelector } from "react-redux";

function showCategory(data) {
  let result = []
  if ((data || []).length > 0) {
    for (let i = 0; i < data.length; i += 4) {
      result.push(
        <Row key={i}>
          <Col xl={8}>
            <CategoryItem data={data[i]} />
          </Col>
          <Col xl={4}>
            <CategoryItem data={data[i + 1]} />
          </Col>
          <Col xl={4}>
            <CategoryItem data={data[i + 2]} />
          </Col>
          <Col xl={8}>
            <CategoryItem data={data[i + 3]} />
          </Col>
        </Row>
      )
    }
  }
  return result
}

function Categories(props) {
  const category = useSelector((state) => state.category)
  const showLoading = useSelector((state) => state.ui?.showLoading)
  return (
    <div className="category">
      {showLoading ? <Loading /> : showCategory(category)}
    </div>
  )
}

export default Categories;
