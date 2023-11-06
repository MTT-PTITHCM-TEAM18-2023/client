import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { Card, Container, Row, Col } from 'react-bootstrap';
import {
  getGeneralStatistics,
  getTopProductStatistics,
  fetchOrders,
} from 'src/services';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [statistic, setStatistic] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const resGeneral = await getGeneralStatistics();
      const resTop = await getTopProductStatistics();
      const resOrd = await fetchOrders({ page: 1, limit: 10 });

      setStatistic(resGeneral.data.data);
      setTopProducts(resTop.data.data);
      setOrders(resOrd.data.data.items);
    })();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body className="!min-h-[100px]">
              <Row>
                <Col xs="4">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart text-warning"></i>
                  </div>
                </Col>
                <Col xs="8">
                  <div className="numbers">
                    <p className="card-category">Đơn hàng đã giao</p>
                    <Card.Title as="h4">
                      {statistic?.deliveried ?? ''}
                    </Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body className="!min-h-[100px]">
              <Row>
                <Col xs="4">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-light-3 text-success"></i>
                  </div>
                </Col>
                <Col xs="8">
                  <div className="numbers">
                    <p className="card-category">Doanh thu (VNĐ)</p>
                    <Card.Title as="h4">
                      {statistic?.total?.toLocaleString() ?? ''}
                    </Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body className="!min-h-[100px]">
              <Row>
                <Col xs="4">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-vector text-danger"></i>
                  </div>
                </Col>
                <Col xs="8">
                  <div className="numbers">
                    <p className="card-category">Sản phẩm bán ra</p>
                    <Card.Title as="h4">{statistic?.product ?? ''}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body className="!min-h-[100px]">
              <Row>
                <Col xs="4">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-favourite-28 text-primary"></i>
                  </div>
                </Col>
                <Col xs="8">
                  <div className="numbers">
                    <p className="card-category">Đơn bị hủy</p>
                    <Card.Title as="h4">{statistic?.canceled ?? ''}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Sản phẩm bán chạy</Card.Title>
            </Card.Header>
            <Card.Body>
              <List
                itemLayout="horizontal"
                dataSource={topProducts}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={<Link to="/admin/products">{item.name}</Link>}
                      description={`Tổng sản phẩm bán: ${item.qty}`}
                    />
                  </List.Item>
                )}
              />
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Đơn hàng gần đây</Card.Title>
            </Card.Header>
            <Card.Body>
              <List
                itemLayout="horizontal"
                dataSource={orders}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={
                        <Link to="/admin/order">{`Khách hàng: ${
                          item.customer?.email ?? ''
                        }`}</Link>
                      }
                      description={`Giá trị: ${
                        item.total?.toLocaleString() ?? ''
                      } VNĐ | Trạng thái: ${item.order_status ?? ''}`}
                    />
                  </List.Item>
                )}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
