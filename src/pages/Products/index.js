import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryProduct from "./CategoryProduct";
import ColorProduct from "./ColorProduct";
import SizeProduct from "./SizeProduct";
import RatingProduct from "./RatingProduct";
import { Select } from "antd";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
// import { getProductList } from "../../actions/product";
import ProductList from "../../components/ProductList";
import Pagination from "../../components/pagination";
// import {
//   clearFilters,
//   getPageLimitNumber,
//   sortProduct,
// } from "../../actions/control-action";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import ProductSeen from "../../components/ProductSeen";

function Products(props) {
  const { Option } = Select
  const { t } = useTranslation()
  const filters = useSelector((state) => state.filters)
  const hasFilter = filters.hasFilter
  const listProduct = useSelector((state) => state.products.listProduct)
  const [onSort, setOnsort] = useState("Sort Default")
  const [onPage, setOnPage] = useState("Show 6")
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getProductList(filters));
    if (hasFilter) {
      setOnsort("Sort Default")
      // dispatch(getPageLimitNumber({ limit: 6 }));
    }
  }, [dispatch, filters, hasFilter])

  function onChangeSort(value) {
    // dispatch(sortProduct(value.split(" ")));
    setOnsort(value)
  }

  function onChangeTotalItem(value) {
    // dispatch(getPageLimitNumber({ limit: +value }));
    setOnPage(value)
  }

  function handleClearFilter() {
    // dispatch(clearFilters());
  }

  return (
    <div className="products-page">
      <Container>
        <Row>
          <Col xl={3} sm={12}>
            <div className="products-page__filter">
              <div className="products-page__filter__box">
                <h2 className="products-page__filter__header">
                  {t("productsPage.category")}
                </h2>
                <CategoryProduct />
              </div>
              <div className="products-page__filter__box">
                <h2 className="products-page__filter__header">
                  {t("productsPage.size")}
                </h2>
                <SizeProduct />
              </div>
              <div className="products-page__filter__box">
                <h2 className="products-page__filter__header">
                  {t("productsPage.color")}
                </h2>
                <ColorProduct />
              </div>
              <div className="products-page__filter__box">
                <h2 className="products-page__filter__header">
                  {t("productsPage.rating")}
                </h2>
                <RatingProduct />
              </div>
            </div>
          </Col>
          <Col xl={9} sm={12}>
            <div className="products-page__filter products-page__filter--header">
              <div>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Default sorting"
                  defaultValue={onSort}
                  value={onSort}
                  optionFilterProp="children"
                  onChange={onChangeSort}
                >
                  <Option value="">Sort Default</Option>
                  <Option value="price desc">Sort Decrease</Option>
                  <Option value="price asc">Sort Increase</Option>
                </Select>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  defaultValue={onPage}
                  value={filters._limit}
                  optionFilterProp="children"
                  onChange={onChangeTotalItem}
                >
                  <Option value={6}>Show 6</Option>
                  <Option value={9}>Show 9</Option>
                  <Option value={12}>Show 12</Option>
                </Select>
              </div>
              {!hasFilter &&
                (Object.keys(filters).length > 3 ||
                  filters._page !== 1 ||
                  filters._limit !== 6) && (
                  <Button onClick={handleClearFilter}>
                    <i className="fas fa-broom"></i> Clear filters
                  </Button>
                )}
            </div>
            <div className="products-page__list">
              <ProductList data={listProduct} xl={4} />
            </div>
            <Pagination />
          </Col>
        </Row>
        <Row>
          <Col xl={12} sm={12}>
            <ProductSeen />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Products;
