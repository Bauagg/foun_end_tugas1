
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styleNavbar from './navbar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../redux/action/action.-login-logout';
import { BsFillCartPlusFill } from "react-icons/bs";

const NavbarComponen = () => {
    const { role, user, cart } = useSelector(state => state)
    const dispact = useDispatch()

    const hendleLogout = () => {
        const user = null
        const role = null
        dispact(LogoutAction(user, role))
    }
    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">A. Mambaus Sholihin</Navbar.Brand>
                    <Nav className="me-auto mx-auto">

                        <Nav.Link>
                            <Link to='/' className='text-decoration-none text-white'>
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to='/address' className='text-decoration-none text-white'>
                                Address
                            </Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link className='text-decoration-none text-white' to='/invoice'>
                                Invoice
                            </Link>
                        </Nav.Link>

                    </Nav>
                    <div>
                        {
                            user === null ? (
                                <div>
                                    <Button variant="warning" className='mx-3'><Link to='register' className={styleNavbar.btn_register}>Register</Link></Button>
                                    <Button variant="warning" ><Link to='/login' className={styleNavbar.btn_register}>Login</Link></Button>
                                </div>
                            ) : (
                                <div>
                                    {
                                        role === 'user' && (
                                            <Link className='text-decoration-none pe-5 text-white' to='/keranjang'>
                                                <BsFillCartPlusFill />
                                                <span className="badge bg-secondary">{cart}</span>
                                            </Link>
                                        )
                                    }
                                    <Button variant="warning" onClick={hendleLogout} ><Link to='/login' className={styleNavbar.btn_register}>Logout</Link></Button>
                                </div>
                            )
                        }
                    </div>
                </Container>
            </Navbar>
        </div >
    )
}


export default NavbarComponen

