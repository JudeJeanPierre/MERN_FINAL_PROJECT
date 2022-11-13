import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from "react-router-dom";

function SignInPage() {

const {search} = useLocation();
const redirectInUrl = new URLSearchParams(search).get('redirect');
const redirect = redirectInUrl ? redirectInUrl : '/';

    return (
        <Container className="signin-container">
            <Helmet>
                <title>Sign in</title>
            </Helmet>
            <h1 className="signin-helmet">Sign In</h1>
            <Form>
                <Form.Group className="signin-form" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="signin-form" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
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