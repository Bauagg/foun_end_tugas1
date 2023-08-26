
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponen = () => {
    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">A. Mambaus Sholihin</Navbar.Brand>
                    <Nav className="me-auto mx-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#">Create Product</Nav.Link>
                        <Nav.Link href="#features">Address</Nav.Link>
                        <Nav.Link href="#pricing">Invoice</Nav.Link>
                    </Nav>
                    <Button variant="warning" className='mx-3'>Register</Button>
                    <Button variant="warning">Login</Button>
                </Container>
            </Navbar>
        </div >
    )
}


export default NavbarComponen