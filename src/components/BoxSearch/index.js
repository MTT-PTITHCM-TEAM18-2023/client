/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { fetchProducts } from 'src/services/product';
import history from 'src/common/utils/history';
import './style.scss';

function BoxSearch(props) {
  const { keySearch, inputSearch } = props;
  const [searchWord, setSearchWord] = useState('');
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    setSearchWord(keySearch);
  }, [keySearch]);

  useEffect(() => {
    (async () => {
      const resProduct = await fetchProducts({
        page: 1,
        limit: 10,
        text: searchWord,
      });
      setListProduct(resProduct?.data?.data?.items);
    })();
  }, [searchWord]);

  const goToPageDetail = (id) => {
    history.push('/products/' + id);
    if (history.location.pathname.indexOf('/products/') !== -1) {
      setSearchWord('');
      inputSearch.classList.remove('show');
    }
  };

  return (
    <>
      {searchWord?.length > 0 ? (
        <Container>
          <div className="box-search">
            {(listProduct || []).length > 0
              ? listProduct.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => goToPageDetail(item.id)}
                    className="box-search__link"
                  >
                    <img src={item.imageUrl} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                ))
              : 'No have product suitable!'}
          </div>
        </Container>
      ) : (
        ''
      )}
    </>
  );
}

export default BoxSearch;
