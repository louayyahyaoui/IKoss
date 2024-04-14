import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../redux/productSlice';
import { useDispatch } from '../../store/index';
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ConfirmationModal from '../../components/ConfirmationModal';
import { FaRegEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import ProductForm from './ProductForm';

function Products() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [makingApiCall, setMakingApiCall] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };
  const onDelete = () => {
    setMakingApiCall(true);
    console.log('test', selectedProduct?._id);
    dispatch(deleteProduct(selectedProduct?._id))
      .unwrap()
      .then(() => {
        setShow(false);
        setSelectedProduct(null);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setMakingApiCall(false);
      });
  };
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts())
      .unwrap()
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  }, [dispatch]);

  const [showModalForm, setShowModalForm] = useState(false);

  const handleCloseModalForm = () => {
    setSelectedProduct(null);

    setShowModalForm(false);
  };
  const handleShowModalForm = () => {
    setShowModalForm(true);
  };
  const handleEdit = (product) => {
    console.log('product');
    console.log(product);
    setSelectedProduct(product);
    handleShowModalForm();
  };
  return products == null || makingApiCall ? (
    <Spinner animation="grow" />
  ) : (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <div className="row align-items-center">
                <div className="col">
                  <Card.Title as="h5">List Of Products</Card.Title>
                  <span className="d-block m-t-5">
                    List of all the <code>products</code> in the inventory
                  </span>
                </div>
                <div className="col-auto">
                  <Button onClick={handleShowModalForm} variant="primary" size="sm">
                    Add Product
                  </Button>
                </div>
              </div>
            </Card.Header>

            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>QR Code</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product._id}>
                      <td>{product?.id || 'No ID assigned'}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>
                        <Badge bg="primary">{product.price} TND</Badge>
                      </td>
                      <td>{product.quantity}</td>
                      <td>
                        <Badge bg="danger">
                          {
                            // ? if there is a discount, show it, otherwise show 'No discount'
                            product.discount === null || product.discount === undefined ? 'No discount' : `${product.discount}%`
                          }
                        </Badge>
                      </td>
                      <td>
                        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 60, width: '100%' }}>
                          <QRCode
                            size={50}
                            value={JSON.stringify(product)}
                            style={{
                              // ? pointer to show that the QR code is clickable
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              // open the QR code in a new tab
                              window.open(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${JSON.stringify(product)}`);
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        {' '}
                        {/* Actions column */}
                        <div>
                          <Button variant="success" size="sm" onClick={() => handleEdit(product)}>
                            <FaRegEdit color="white" />
                          </Button>{' '}
                          <Button variant="danger" size="sm" onClick={() => handleShow(product)}>
                            <FaTrash color="white" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ProductForm
        show={showModalForm}
        handleClose={handleCloseModalForm}
        handleShow={handleShowModalForm}
        selectedProduct={selectedProduct}
      />

      <ConfirmationModal
        show={show}
        handleClose={handleClose}
        handleConfirm={onDelete}
        title={'Delete Confirmation'}
        body={
          <p
            dangerouslySetInnerHTML={{
              __html: `Are you sure you want to delete product with name: <code>${selectedProduct?.name}</code> ?`
            }}
          ></p>
        }
      />
    </React.Fragment>
  );
}

export default Products;
