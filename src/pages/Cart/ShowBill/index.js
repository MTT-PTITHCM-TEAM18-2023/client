/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
function ShowBill(props) {
  const { t } = useTranslation();
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });

  const { listOrder, totalMoneyListOrder } = props;

  return (
    <ul className="cart-page__order__list">
      <li className="cart-page__order__list__item">
        <span>{t('cartPage.product')}</span>
        <span>{t('cartPage.total')}</span>
      </li>
      <div className="cart-page__order__list__container">
        {listOrder.map((item, index) => (
          <li
            className="cart-page__order__list__item flex justify-between"
            key={index}
          >
            <div>
              <span>{item?.product.name} </span>
              <span>(x {item?.order.order})</span>
            </div>
            <span>{formatter.format(item?.total)}</span>
          </li>
        ))}
      </div>
      <li className="cart-page__order__list__item">
        <span className="color-dark">{t('cartPage.subTotal')} </span>
        <span className="color-red">
          {formatter.format(totalMoneyListOrder)}
        </span>
      </li>
      <li className="cart-page__order__list__item">
        <span className="color-dark">{t('cartPage.shipping')} </span>
        <span className="color-red">{formatter.format(0)}</span>
      </li>
      <li className="cart-page__order__list__item">
        <span className="color-dark">{t('cartPage.total')} </span>
        <span className="color-red">
          {formatter.format(totalMoneyListOrder)}
        </span>
      </li>
    </ul>
  );
}

export default ShowBill;
