import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { userData } from '../helper';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';


function UserNavbar() {
  const user = userData();
  console.log(user);

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="/">
            <img
              src="/logo.png"
              width="145"
              height="45"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link style={{marginRight: "10px"}} href="/home"><h5>หน้าหลัก</h5></Nav.Link>
            <Nav.Link style={{marginRight: "10px"}} href="/userstatus"><h5>สถานะ</h5></Nav.Link>
            {!user && (
              <>
                <Button href='/login' style={{marginRight: "10px"}} size="lg" variant="outline-success">Sign in</Button>
                <Button href='/register' size="lg" variant="danger">Sign up</Button>
              </>
            )}
            {user && (
              <div>
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                sx={{ mr: 2 }}
              >
                  <AccountCircle fontSize='large'/>
                </IconButton>
                <Button href='/logout' size="lg" variant="danger">Logout</Button>
              </div>
              
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default UserNavbar;