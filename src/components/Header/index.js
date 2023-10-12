import React, { useEffect, useRef, useState } from "react"
import Container from "react-bootstrap/Container"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getCart } from "../../store/cart"
import BoxSearch from "../BoxSearch"
import "./style.scss"

function Header() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state?.cart)
  const [keySearch, setKeySearch] = useState()
  const inputSearch = useRef(null)

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  const handleSearchProduct = (e) => {
    // dispatch(getKeySearch(e.target.value));
    setKeySearch(e.target.value)
  }

  return (
    <>
      <div className="header">
        <Container>
          <div className="header__main d-flex justify-content-space-between align-items-center">
            <Link to="/" className="header__logo">
              <img src="../assets/images/logo.webp" alt="logoHeader" />
            </Link>
            <div className="header_nav d-flex align-items-center ">
              <Link to="/cart" className="header__cart">
                <i className="fas fa-shopping-cart"></i>
                <span className="header__cart__show-amount">
                  {(cart.list || []).length}
                </span>
              </Link>
              <button
                className="btn btn-primary btn--search-header"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div
        ref={inputSearch}
        className="collapse header__search"
        id="collapseExample"
      >
        <Container>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Search Here"
            onChange={handleSearchProduct}
            value={keySearch}
          />
        </Container>
      </div>
      <BoxSearch keySearch={keySearch} inputSearch={inputSearch.current} />
    </>
  )
}

export default Header
