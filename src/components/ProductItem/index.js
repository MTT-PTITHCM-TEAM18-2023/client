/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import history from '../../common/utils/history';
import './style.scss';
import { message } from 'antd';
import { addCart } from '../../store/cart';

function ProductItem(props) {
  const { data } = props;
  const dispatch = useDispatch();
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  const { t } = useTranslation();

  const goToPageDetail = () => {
    history.push('/products/' + data?.id);
    let productsSeen = JSON.parse(sessionStorage.getItem('products_seen'));
    if (productsSeen) {
      const index = productsSeen.findIndex((item) => item.id === data?.id);
      index === -1 && productsSeen.push(data);
    } else {
      productsSeen = [];
      productsSeen.push(data);
    }
    sessionStorage.setItem('products_seen', JSON.stringify(productsSeen));
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    dispatch(addCart({ data, order: 1 }));
    history.push('/cart');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addCart({ data, order: 1 }));
    message.success('Sản phẩm đã thêm vào giỏ hàng của bạn!');
  };

  return (
    <div onClick={goToPageDetail} className="product-item">
      <div className="product-item__img">
        <img src={data?.imageUrl} alt={data?.name} />
      </div>
      <div className="product-item__content">
        <h3>{data?.name}</h3>
        <div>
          <p className="product-item__content__price">
            <span>{formatter.format(data?.price)}</span>
          </p>
          <div className="product-item__action">
            <span
              onClick={handleAddToCart}
              className=" social-info social-info--sm"
            >
              <i className="fas fa-cart-plus"></i>
              <span className="hover-text">{t('button.addtocart')}</span>
            </span>
            <span className=" social-info social-info--sm">
              <i className="fas fa-arrows-alt"></i>
              <span onClick={goToPageDetail} className="hover-text">
                {t('button.viewmore')}
              </span>
            </span>
            <span className=" social-info social-info--sm">
              <i className="fas fa-dollar-sign"></i>
              <span onClick={handleBuyNow} className="hover-text">
                Mua ngay
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
