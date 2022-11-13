// import data from "./data";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Parent';
import { Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';

function App() {
  const {state} = useContext(Store);
  const {cart} = state;

  return (
    <BrowserRouter>
    <div className="d-flex flex-column webpage-container">

      <header className="App-header">
        <Navbar className="color-nav" variant="dark">
          <Container>
            <LinkContainer to="/">
            <Navbar.Brand>HAITIPROD MART</Navbar.Brand>
            </LinkContainer>
            <Nav className="nav-cart">
              <Link to="/cart" className="cart-link">
                Cart {cart.cartItems.length> 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((y, z) => y + z.qty, 0)}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
        
      </header>
      <main>
      <Container className="mt-4">

        <Routes>
          <Route path='/prod/:refs' element={<ProductPage/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/signin' element={<SignInPage/>}/>

        </Routes>

        </Container>
      </main>
      <footer>
        <div className="text-center">PRODHAITI MART rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
