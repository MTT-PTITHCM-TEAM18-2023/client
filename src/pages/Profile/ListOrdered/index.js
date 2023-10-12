import { Table } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";

function ListOrdered(props) {
  const payment = useSelector((state) => state.payment);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  });
  const { t } = useTranslation();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  function handleTableChange(pagination) {
    setPagination(pagination);
    window.scrollTo({
      top: 700,
      left: 100,
      behavior: "smooth",
    });
  }
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: ({ id, name, size, color }) => (
        <div className="list-ordered__name">
          {" "}
          <Link to={"/products/" + id} className="list-ordered__name__link">
            {name}
          </Link>
          <p>
            <span>
              {t("cartPage.size")} {size}{" "}
            </span>
            <span>
              ,{t("cartPage.color")} {color}
            </span>
          </p>
        </div>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (url) => (
        <div className="list-ordered__img">
          <img src={url} alt="imgProduct" />
        </div>
      ),
    },
    {
      title: `${t("cartPage.price")}`,
      dataIndex: "price",
      render: (value) => <p>{formatter.format(value)}</p>,
    },
    {
      title: `${t("cartPage.quantity")}`,
      dataIndex: "quantity",
    },
    {
      title: `${t("cartPage.total")}`,
      dataIndex: "total",
      render: (value) => <p>{formatter.format(value)}</p>,
    },
    {
      title: `${t("cartPage.dateBuy")}`,
      dataIndex: "dateBuy",
      render: (time) => <p>{time}</p>,
    },
  ];

  const data = payment.map((item, index) => {
    return {
      key: index,
      product: {
        id: item.id,
        name: item.name,
        size: item.size,
        color: item.color,
      },
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
      dateBuy: item.time,
    };
  });

  return (
    <div className="list-ordered">
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={pagination}
      />
    </div>
  );
}

export default ListOrdered;
