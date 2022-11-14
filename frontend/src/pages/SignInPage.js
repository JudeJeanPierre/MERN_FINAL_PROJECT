import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Store } from '../Parent'
import { toast } from "react-toastify";
import { getError } from "../utilities";

function SignInPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: contextDispatch } = useContext(Store);
    const { userInfo } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/signin',
                {
                    email,
                    password,
                });
            contextDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/')
        } catch (err) {
            toast.error(getError(err));
        }
    };
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <Container className="signin-container">
            <Helmet>
                <title>Sign in</title>
            </Helmet>
            <h1 className="signin-helmet"> Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="signin-form" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="signin-form" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="signin-form">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="signin-form">New user? {' '}
                    <Link to={`/signup?redirect=${redirect}`}> Sign Up</Link></div>
            </Form>
        </Container>
    )
}

export default SignInPage;