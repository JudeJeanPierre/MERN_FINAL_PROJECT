import React from 'react';
import { useContext } from 'react';
import { Store } from '../Parent';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function CartPage() {
    const navigate = useNavigate();
    const { state, dispatch: contextDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, qty) => {
        const { data } = await axios.get(`/api/prods/${item._id}`);

        if (data.inStock < qty) {
            window.alert(' No more of this product. It\'s out of stock');
            return;
        }
        contextDispatch({
            type: 'ADD_ITEM', payload: { ...item, qty },
        });
    };
    const deleteItemHandler = (item) => {
        contextDispatch({
            type: 'CART_DELETE_ITEM', payload: item
        });
    }
    const checkOutHandler = () => {
        navigate('/signin?redirect=signin');
    }
    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Nothing in Cart. <Link to="/">Shop now?</Link>
                        </MessageBox>) : (
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={4}>
                                            <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" />
                                            {' '} <Link to={`/prod/${item.refs}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button onClick={() => updateCartHandler(item, item.qty - 1)}
                                                variant="light" disabled={item.qty === 1}>
                                                <i className='fas fa-minus-circle'></i>
                                            </Button>
                                            {' '} <span>{item.qty}</span> {' '}

                                            <Button onClick={() => updateCartHandler(item, item.qty + 1)}
                                                variant="light" disabled={item.qty === item.inStock}>
                                                <i className='fas fa-plus-circle'></i>
                                            </Button>
                                        </Col>
                                        <Col md={3}>${item.price}</Col>
                                        <Col md={2}>
                                            <Button onClick={() => deleteItemHandler(item)}
                                                variant="light">
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <h4>
                                    Items: ({cartItems.reduce((y, z) => y + z.qty, 0)})
                                    <br /><br />
                                    Subtotal: $ {cartItems.reduce((y, z) =>
                                        y + z.price * z.qty, 0)}
                                </h4>
                            </ListGroup>
                            <ListGroup>
                                <div className='checkout-button'>
                                    <Button onClick={checkOutHandler} type="button" variant="primary" disabled={cartItems === 0}>
                                        Go to checkout
                                    </Button>
                                </div>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </div>
    );
}
