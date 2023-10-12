import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getIdProduct } from "../../actions/product";
import history from "../../untils/history";
import "./style.scss";

function BoxSearch(props) {
  const { keySearch, inputSearch } = props;
  const [searchWord, setSearchWord] = useState("");
  const listProduct = useSelector(
    (state) => state.products?.listProductBySearch
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchWord(keySearch);
  }, [keySearch]);

  const goToPageDetail = (id) => {
    history.push("/products/" + id);
    // dispatch(getIdProduct(id));
    if (history.location.pathname.indexOf("/products/") !== -1) {
      setSearchWord("");
      inputSearch.classList.remove("show");
    }
  };

  return (
    <>
      {searchWord?.length > 0 ? (
        <Container>
          <div className="box-search">
            {(listProduct ||[]).length > 0
              ? listProduct.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => goToPageDetail(item.id)}
                    className="box-search__link"
                  >
                    <img src={item.link_img[0]} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                ))
              : "No have product suitable!"}
          </div>
        </Container>
      ) : (
        ""
      )}
    </>
  );
}

export default BoxSearch;
