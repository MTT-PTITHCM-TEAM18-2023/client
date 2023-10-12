import { InputNumber, message } from "antd"
import React, { useEffect, useState } from "react"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { fetchProductDetail } from "../../apis/product"
import ProductSeen from "../../components/ProductSeen"
import history from "../../untils/history"
import "./style.scss"
import { addCart } from "../../store/cart"

function DetailProduct() {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  })
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const idProduct = history.location.pathname.slice(10)
  const [productDetail, setProductDetail] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const resProductDetail = await fetchProductDetail(idProduct)
        setProductDetail(resProductDetail?.data?.data)
      } catch (error) {
        console.log("error:", error)
      }
    })()
  }, [dispatch, idProduct])

  const onChangeQuantity = (value) => {
    setQuantity(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addCart({ data: productDetail, order: quantity }))
    message.success("Add product successfully!")
  }

  return (
    <>
      <div className="detail-product mt-50">
        <Container>
          <Row>
            <Col xl={7} sm={12}>
              <img
                className="h-[500px]"
                src={productDetail?.imageUrl}
                alt={productDetail?.name}
              />
            </Col>
            <Col xl={5} sm={12}>
              <div className="detail-product__info">
                <h2 className="detail-product__info__header">
                  {productDetail?.name}
                </h2>
                <p className="detail-product__info__desc">
                  {productDetail?.description}
                </p>
                <p className="text-3xl my-[20px]">
                  {productDetail?.isActive ? (
                    <span className="text-green-600">Còn hàng</span>
                  ) : (
                    <span className="text-red-700">Hết hàng</span>
                  )}
                </p>
                <div className="detail-product__info__price">
                  <span>{formatter.format(productDetail?.price)}</span>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group flex gap-[16px] items-center">
                    <div className="detail-product__container-guide-shoe">
                      <InputNumber
                        min={1}
                        max={productDetail?.qty}
                        name="quantity"
                        value={quantity}
                        onChange={onChangeQuantity}
                        placeholder="Nhập số lượng"
                        className="w-[200px]"
                      />
                    </div>
                    <h3>
                      (Số hàng có sẵn: {productDetail?.qty}
                      {productDetail?.unit} )
                    </h3>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn--primary btn--detail-product"
                    >
                      {t("button.addtocart")}
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col xl={12} sm={12}>
            <ProductSeen />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DetailProduct
