// import data from "./data";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Parent';
import { Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingPage from './pages/ShippingPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';


function App() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    contextDispatch({ type: 'USER_SIGNOUT' });
    localStorage.deleteItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column webpage-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header className="App-header">
          <Navbar className="color-nav" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand><strong>HAITIPROD MART</strong></Navbar.Brand>
              </LinkContainer>
              <Nav className="nav-cart">

              <Link to="/about" className="about-us">
                  About us  &nbsp; &nbsp; &nbsp; 
                </Link>

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>My Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>My Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className='user-link' to='/signin'>Sign In</Link>
                )
                }
                <Link to="/cart" className="cart-link">
                  &nbsp; &nbsp; &nbsp; Cart {cart.cartItems.length > 0 && (
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
              <Route path='/prod/:refs' element={<ProductPage />} />
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/signin' element={<SignInPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/shipping' element={<ShippingPage />} />

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
