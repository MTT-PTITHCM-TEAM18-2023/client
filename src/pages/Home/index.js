import { Pagination } from "antd"
import queryString from "query-string"
import React, { useEffect, useMemo, useState } from "react"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { useTranslation } from "react-i18next"
import { useHistory, useLocation } from "react-router-dom"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/swiper.min.css"
import { fetchCategory } from "../../apis/category"
import { fetchProducts } from "../../apis/product"
import ProductList from "../../components/ProductList"
import "./style.scss"

function HomePage() {
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [meta, setMeta] = useState({ page: 1, total: 0 })
  const [category, setCategory] = useState([])
  const params = useLocation()
  const history = useHistory()
  const query = useMemo(
    () => queryString.parse(params?.search),
    [params?.search]
  )

  useEffect(() => {
    ;(async () => {
      try {
        const resCategory = await fetchCategory({ limit: 30 })
        setCategory(resCategory?.data?.data?.items)
      } catch (error) {
        console.log("error:", error)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const resProduct = await fetchProducts({
          page: query?.page || 1,
          limit: 12,
          cat: query?.category,
        })
        setProducts(resProduct?.data?.data?.items)
        setMeta((pre) => ({
          ...pre,
          page: resProduct?.data?.data?.meta?.currentPage,
          total: resProduct?.data?.data?.meta?.totalItems,
        }))
      } catch (error) {
        console.log("error:", error)
      }
    })()
  }, [query])

  const onChange = (page) => {
    history.push(`?page=${page}`)
  }

  const handleSelectCategory = (id) => {
    if (+query?.category === +id) {
      history.push("/")
    } else {
      history.push(`?category=${id}`)
    }
  }

  return (
    <div className="page-home">
      <Container>
        <div className="product-area__header my-10">
          <h2 className="product-area__header__title">Danh mục sản phẩm</h2>
        </div>
        <section style={{ marginTop: "0" }} className="feature">
          <Row>
            {category.map((item, index) => {
              return (
                <Col xl={3} sm={12} key={index}>
                  <div
                    onClick={() => handleSelectCategory(item?.id)}
                    className={`cursor-pointer block px-10 py-6 text-center border-2 border-solid border-transparent hover:border-orange-200 ${
                      +query?.category === +item.id && "border-orange-300"
                    }`}
                  >
                    <h3 className="text-3xl">{t(item.name)}</h3>
                    <p className="text-gray-400">{t(item.description)}</p>
                  </div>
                </Col>
              )
            })}
          </Row>
        </section>
      </Container>
      <section className="product-area">
        <Container>
          <div className="product-area__header">
            <h2
              style={{ marginBottom: "12px" }}
              className="product-area__header__title"
            >
              Danh sách sản phẩm
            </h2>
            <p className="product-area__header__desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              possimus totam culpa. Nulla, dolores repellat ipsa sunt voluptates
              quidem voluptatum.
            </p>
          </div>
          <ProductList data={products} xl={3} />
          <div className="flex justify-center">
            <Pagination
              current={meta.page}
              onChange={onChange}
              total={meta.total}
            />
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HomePage
