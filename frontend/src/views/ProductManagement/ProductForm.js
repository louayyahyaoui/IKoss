import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from '../../store';
import { addProduct, editProduct, getProducts } from '../../redux/productSlice';
import { Alert, Col } from 'react-bootstrap';

function ProductForm({ show, handleClose, selectedProduct }) {
  useEffect(() => {
    console.log('selectedProduct', selectedProduct);
  }, [selectedProduct, show]);

  const validationSchema = Yup.object().shape({
    id: Yup.number().required('ID is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    quantity: Yup.number().required('Quantity is required'),
    discount: Yup.number()
  });
  const dispatch = useDispatch();

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              id: selectedProduct ? selectedProduct.id : '',
              name: selectedProduct ? selectedProduct.name : '',
              description: selectedProduct ? selectedProduct.description : '',
              price: selectedProduct ? selectedProduct.price : '',
              quantity: selectedProduct ? selectedProduct.quantity : '',
              discount: selectedProduct ? selectedProduct.discount : ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
              try {
                console.log(values);
                const valuesToSubmit = {
                  ...values,
                  price: parseFloat(values.price),
                  quantity: parseInt(values.quantity),
                  discount: parseInt(values.discount),
                  _id: selectedProduct ? selectedProduct._id : null
                };
                const action = selectedProduct ? editProduct(valuesToSubmit) : addProduct(valuesToSubmit);
                console.log('valuesToSubmit', valuesToSubmit);
                dispatch(action)
                  .unwrap()
                  .then(() => {
                    dispatch(getProducts()).then(() => {
                      handleClose();
                    });
                  })
                  .catch((error) => {
                    const message = error.message || 'Something went wrong';
                    setStatus({ success: false });
                    setErrors({ submit: message });
                    setSubmitting(true);
                  });
              } catch (error) {
                const message = error.message || 'Something went wrong';
                console.log('message', message);
                setStatus({ success: false });
                setErrors({ submit: message });
                setSubmitting(false);
                console.log('message', message);
              }
            }}
          >
            {({ errors, touched, handleChange, handleSubmit, values }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="productForm.id">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="id"
                    onChange={handleChange}
                    value={values.id}
                    placeholder="Product ID goes here"
                    autoFocus
                    isInvalid={touched.id && errors.id}
                  />
                  <Form.Control.Feedback type="invalid">{errors.id}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productForm.name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Product name goes here"
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productForm.description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    placeholder="Product description goes here"
                    isInvalid={touched.description && errors.description}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productForm.price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={values.price}
                    placeholder="Product price goes here"
                    isInvalid={touched.price && errors.price}
                  />
                  <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productForm.quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    onChange={handleChange}
                    value={values.quantity}
                    placeholder="Product quantity goes here"
                    isInvalid={touched.quantity && errors.quantity}
                  />
                  <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productForm.discount">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    onChange={handleChange}
                    value={values.discount}
                    min={1}
                    max={100}
                    placeholder="Product discount goes here"
                    isInvalid={touched.discount && errors.discount}
                  />
                  <Form.Control.Feedback type="invalid">{errors.discount}</Form.Control.Feedback>
                </Form.Group>
                {errors.submit && (
                  <Col sm={12}>
                    <Alert variant="danger">{errors.submit}</Alert>
                  </Col>
                )}
                <div className="d-flex align-items-center justify-content-end">
                  <Button variant="secondary" onClick={handleClose} className="me-2">
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductForm;

ProductForm.propTypes = {
  show: PropTypes.isRequired,
  handleClose: PropTypes.isRequired,
  selectedProduct: PropTypes.isRequired
};
