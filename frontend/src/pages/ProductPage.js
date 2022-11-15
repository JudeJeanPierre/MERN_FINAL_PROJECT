import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import { getError } from '../utilities';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { Store } from '../Parent';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, prod: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {

  const navigate = useNavigate();

  const params = useParams();
  const { refs } = params;

  const [{ loading, error, prod }, dispatch] = useReducer(reducer, {
    prod: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/prods/refs/${refs}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  }, [refs])

  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const itemIn = cart.cartItems.find((x) => x._id === prod._id);
    const qty = itemIn ? itemIn.qty + 1 : 1;
    const { data } = await axios.get(`/api/prods/${prod._id}`);
    if (data.inStock < qty) {
      window.alert(' No more of this product. It\'s out of stock');
      return;
    }
    contextDispatch({
      type: 'ADD_ITEM', payload: { ...prod, qty },
    });

    navigate('/cart');
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}
    </MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="prod-page-img" src={prod.image} alt={prod.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{prod.name}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={prod.rating}
                reviewsNum={prod.reviewsNum}>
              </Rating>
              <ListGroup.Item>Price: ${prod.price}</ListGroup.Item>
              <ListGroup.Item>Details: {prod.details}</ListGroup.Item>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${prod.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item variant="flush">
                  <Row>
                    <Col>Status:</Col>
                    <Col>{prod.inStock > 0 ?
                      <Badge bg="success">In Stock</Badge> : <Badge bg="danger">Unavailable</Badge>}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {prod.inStock > 0 && (
                  <ListGroup.Item>
                    <div className="board">
                      <Button onClick={addToCartHandler} variant="primary">Add to cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}


