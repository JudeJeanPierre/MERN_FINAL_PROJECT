import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Parent';
import ProductPage from '../pages/ProductPage';


function SingleProduct({ prod }) {

  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const add2CartHandler = async (item) => {

    const itemIn = cartItems.find((x) => x._id === prod._id);
    const qty = itemIn ? itemIn.qty + 1 : 1;

    const { data } = await axios.get(`/api/prods/${item._id}`);

    if (data.inStock < qty) {
      window.alert(' No more of this product. It\'s out of stock');
      return;
    }
    contextDispatch({
      type: 'ADD_ITEM', payload: { ...item, qty },
    });
  };

  return (
    <Card className="prod">
      <Link to={`/prod/${prod.refs}`}>
        <img src={prod.image} className="card-img-top" alt={prod.name} />
      </Link>
      <Card.Body>
        <Link to={`/prod/${prod.refs}`}>
          <Card.Title>{prod.name}</Card.Title>
        </Link>
        <Rating rating={prod.rating} reviewsNum={prod.reviewsNum} />
        <Card.Text>
          <p><strong>${prod.price}</strong></p>
        </Card.Text>
        {ProductPage.inStock === 0 ? (<Button variant="light" disabled> Out of stock</Button>
         ) : ( 
         <Button onClick={() => add2CartHandler(prod)} className="add2cartButton">Add to cart</Button>)}
      </Card.Body>
    </Card>
  );
}

export default SingleProduct