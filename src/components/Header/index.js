import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart } from '../../store/cart';
import BoxSearch from '../BoxSearch';
import './style.scss';

function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const [keySearch, setKeySearch] = useState();
  const inputSearch = useRef(null);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleSearchProduct = (e) => {
    // dispatch(getKeySearch(e.target.value));
    setKeySearch(e.target.value);
  };

  const handleToggleSearchBar = () => {
    setIsShowSearchBar((prev) => !prev);
  };

  const handleClearSearch = () => {
    inputSearch.current = '';
    setKeySearch('');
  };

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
                onClick={handleToggleSearchBar}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </Container>
      </div>
      {isShowSearchBar && (
        <div ref={inputSearch} className="header__search">
          <Container>
            <div className="flex justify-between items-center">
              <input
                type="string"
                className="flex-1"
                placeholder="Tìm kiếm sản phẩm"
                onChange={handleSearchProduct}
                value={keySearch}
              />
              <div
                className="block h-8 w-8 cursor-pointer"
                onClick={handleClearSearch}
              >
                <p className="text-white text-2xl">
                  <i className="fas fa-backspace"></i>
                </p>
              </div>
            </div>
          </Container>
        </div>
      )}
      <BoxSearch keySearch={keySearch} inputSearch={inputSearch.current} />
    </>
  );
}

export default Header;
