import React, { useEffect, useReducer } from "react";
// import data from "../data";
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import SingleProduct from "../components/SingleProduct";
import {Helmet} from 'react-helmet-async';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) =>{
    switch (action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, prods: action.payload, loading: false};
            case 'FETCH_FAIL':
                return {...state, loading: false, error: action.payload};
            default:
                return state;
    }
};
function Home() {
    const [{loading, error, prods}, dispatch] = useReducer(logger(reducer), {
        prods: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () =>{
            dispatch({type: 'FETCH_REQUEST'});
            try{
            const result = await axios.get('/api/prods')
        dispatch({type: 'FETCH_SUCCESS', payload: result.data});
        }catch (err) {
            dispatch({type: 'FETCH_FAIL', payload: err.message}); 
        }
            // setProds(result.data); 
        }
        fetchData();
    }, [])
    return (
        <div>
            <Helmet>
                <title>HAITIPROD MART</title>
            </Helmet>
            <h1>Featured Products</h1>
            <div className="prods">
                {loading ? (
                    <LoadingBox/>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <Row>
                {prods.map((prod) => (
                    <Col key={prod.refs} sm={6} md={4} lg={3} className="mb-3">
                    <SingleProduct prod={prod}></SingleProduct>
                    </Col>
                ))}
                </Row>
                )
                
                }
            </div>
        </div>
    )
}

export default Home;