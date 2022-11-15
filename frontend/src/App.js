// import data from "./data";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Parent';
import { Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingPage from './pages/ShippingPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { getError } from './utilities';
import SearchBox from './components/SearchBox';
import SearchPage from './pages/SearchPage';

function App() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    contextDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };
// new
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/prods/categories");
        setCategories(data);
      } catch (err) {
        console.log(err)
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
// 
  return (
    <BrowserRouter>
    {/* new */}
      <div className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }>
          {/*  */}
        <ToastContainer position="bottom-center" limit={1} />
        <header className="App-header">
          <Navbar className="color-nav" variant="dark">
            <Container>
              {/* new */}
            <Button
                variant="light"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button> &nbsp; &nbsp;

              {/*  */}
              <LinkContainer to="/">
                <Navbar.Brand><strong>HAITIPROD MART</strong></Navbar.Brand>
              </LinkContainer>
              &nbsp; &nbsp; <SearchBox /> 
              {/* new */}

              {/* <Navbar.Toggle aria-controls="basic-navbar-nav">
                <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                </Navbar.Collapse>
              </Navbar.Toggle>
               */}
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

          <div className='category-nav'>

<Link to="" >
  <div className='food'></div>
 <p className='nav-text'>  Haitian Food </p>

 </Link>

<Link to="" >
  <div className='oil'></div>
  <p className='nav-text'>Haitian Oil</p>

  </Link>

<Link to="" >
  <div className='spices'></div>
  <p className='nav-text'> Haitian Spices</p>
  </Link>

<Link to="">
  <div className='jewelry'></div>
<p className='nav-text'> Haitian Jewelry</p>
  </Link>

<Link to="">
  <div className='art'></div>
  <p className='nav-text'>Art & Painting</p>
  </Link>

        </div>


        </header>
       
        
{/* new */}

{/* <div className={sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div> */}
{/*  */}

        <main>
          <Container className="mt-4">

            <Routes>
              <Route path='/prod/:refs' element={<ProductPage />} />
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<SearchPage />} />
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
