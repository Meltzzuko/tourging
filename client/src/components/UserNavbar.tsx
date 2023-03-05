import React, { useState, FormEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { userData } from '../helper';
import { Avatar } from '@mui/joy';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import CryptoJS from 'crypto-js';
import { Col, Row } from 'react-bootstrap';
import '../UserNavbar.css'
import { useMediaQuery } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavDropdown } from 'react-bootstrap';

function UserNavbar() {
  const user = userData();
  const [popup, setPopup] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const updateImage = async () => {
    const userInfo = await fetch('http://localhost:1337/api/users/me?populate=*', {
      headers :{
        "Authorization" : `Bearer ${user.jwt}`
      }
    })

    const data = await userInfo.json();
    const encryptedData = localStorage.getItem('user');
    const secretKey = ''
    let info;
    if (encryptedData) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        info = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    info.avatar = `http://localhost:1337${data.image.url}`;

    const updatedEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(info), secretKey).toString();

    localStorage.setItem('user', updatedEncryptedData)

    const updateAvatar = {
      avatar : info.avatar
    }

    await fetch(`http://localhost:1337/api/users/${user.id}`, {
      method : 'PUT',
      headers :{
        "Authorization" : `Bearer ${user.jwt}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateAvatar)
    })
  }

  const handleSaveClick = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('files', file);
    formData.append('refId', user.id);
    formData.append('ref', 'plugin::users-permissions.user');
    formData.append('field', 'image');

    try {
      const response = await fetch('http://localhost:1337/api/upload',{
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.jwt}`,
        },
        body: formData,
      });
      await updateImage()
      
    } catch (error) {
      console.log(error);
    }

    setFile(null);
    setPopup(false);
    window.location.reload();
  };

  return (
    <>
      <AppBar position='sticky' color='transparent'>
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
            { !isMobile && 
              <>
                <Nav.Link style={{marginRight: "10px"}} href="/home"><h5 style={{ fontSize: "0.9rem"}}>หน้าหลัก</h5></Nav.Link>
              <Nav.Link style={{marginRight: "10px"}} href="/userstatus"><h5 style={{ fontSize: "0.9rem"}}>สถานะ</h5></Nav.Link>
              {!user && (
                <>
                  <Button href='/login' style={{marginRight: "10px", fontSize: "1rem"}} size="sm" variant="outline-success">Sign in</Button>
                  <Button href='/register' size="sm" variant="danger" style={{ fontSize: "1rem"}}>Sign up</Button>
                </>
              )}
              {user && (
                <div>
                  <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  sx={{ mr: 1 }}
                  onClick={() => setPopup(true)}
                >
                    <Avatar src={user.avatar}/>
                  </IconButton>
                  <Button href='/logout' size="sm" variant="danger" >Logout</Button>
                </div>
              )}
              </>
            }
            { isMobile &&
              <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
                <Nav className="me-auto">
          
                  {!user && (
                    <>
                      <Nav.Link style={{marginRight: "10px"}} href="/home"><h5 style={{ fontSize: "0.9rem"}}>หน้าหลัก</h5></Nav.Link>
                      <Nav.Link style={{marginRight: "10px"}} href="/userstatus" ><h5 style={{ fontSize: "0.9rem"}} >สถานะ</h5></Nav.Link>
                      <Button href='/login' style={{marginRight: "10px", fontSize: "1rem"}} size="sm" variant="outline-success">Sign in</Button>
                      <Button href='/register' size="sm" variant="danger" style={{ fontSize: "1rem"}}>Sign up</Button>
                                        
                    </>
                    
                  )}
                  {user && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        sx={{ mr: 1 }}
                        onClick={() => setPopup(true)}
                      >
                      <Avatar sx={{ width: 32, height: 32, mr: 1 }} src={user.avatar}/>
                      </IconButton>
                      <NavDropdown title={<FontAwesomeIcon icon={faBars} />} align="end">
                        <NavDropdown.Item style={{marginRight: "10px"}} href="/home"><h5 style={{ fontSize: "0.9rem"}}>หน้าหลัก</h5></NavDropdown.Item>
                        <NavDropdown.Item style={{marginRight: "10px"}} href="/userstatus"><h5 style={{ fontSize: "0.9rem"}}>สถานะ</h5></NavDropdown.Item>
                        <NavDropdown.Item href="/logout" style={{color:"red"}} >Logout</NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  )}
                </Nav>
              </>
            }
              <Dialog open={popup} onClose={() => setPopup(false)}>
                  <DialogTitle sx={{textAlign:"center", color:"black"}}>สวัสดี, {user.username}</DialogTitle>
                  <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Avatar sx={{ width: 128, height: 128 }} src={user.avatar} />
                    </Box>
                    <DialogTitle sx={{textAlign:"center", color:"black"}}>เปลี่ยนรูปโปรไฟล์</DialogTitle>
                    <Row className="text-center">
                      <Col>
                        <input type="file" className="form-control" id="customFile" onChange={handleFileChange} />
                      </Col>
                    </Row>
                  </DialogContent>
                  <DialogActions>
                    <Button variant='success' onClick={handleSaveClick}>Save</Button>
                    <Button variant='danger' onClick={() => setPopup(false)}>Cancel</Button>
                  </DialogActions>
              </Dialog>
          </Nav>
        </Container>
      </Navbar>
      </AppBar>
    </>
  );
}

export default UserNavbar;