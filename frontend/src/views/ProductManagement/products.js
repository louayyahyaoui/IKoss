import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Card from '../../components/Card/MainCard';
import { getProducts } from '../../redux/productSlice';
import { useDispatch } from '../../store/index';

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts())
      .unwrap()
      .then(() => {})
      .catch((e) => {
        console.log(e.message);
      });
  }, [dispatch]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Hello with products size" isOption>
            <p>{products?.size}</p>
            <p>
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&quot;
            </p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Products;
