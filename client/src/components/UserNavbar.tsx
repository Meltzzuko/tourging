import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


function UserNavbar() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="home">
            <img
              src="/logo.png"
              width="130"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link style={{marginRight: "10px"}} href="home"><h5>หน้าหลัก</h5></Nav.Link>
            <Nav.Link style={{marginRight: "30px"}} href="status"><h5>สถานะ</h5></Nav.Link>
            <Button href='login' style={{marginRight: "10px"}} size="lg" variant="outline-success">Sign in</Button>
            <Button href='register' size="lg" variant="danger">Sign up</Button>{' '}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default UserNavbar;