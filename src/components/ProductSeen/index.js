import React from "react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import ProductItem from "../ProductItem";
SwiperCore.use([Pagination, Navigation]);

function ProductSeen(props) {
  let listProductSeen = JSON.parse(sessionStorage.getItem("products_seen"));
  const { t } = useTranslation();
  return (
    <div className="product-seen mt-50">
      <h2 className="product-seen__title">{t("productSeen.title")}</h2>
      {!listProductSeen || listProductSeen?.length === 0 ? (
        <p>No have product seen</p>
      ) : (
        <Swiper
          spaceBetween={0}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            991: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {listProductSeen.map((product, index) => {
            return (
              <SwiperSlide key={index}>
                <ProductItem data={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}

export default ProductSeen;
