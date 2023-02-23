import React, { useState } from 'react';
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
import { Col, Row } from 'react-bootstrap';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import '../UserNavbar.css'

function UserNavbar() {
  const user = userData();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
 
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      setImage(url);
    }
  };

  const handleSave = () => {
      console.log( `Image: ${image}`);
      setOpen(false);
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
                onClick={handleClick}
                sx={{ mr: 1 }}
              >
                  <Avatar src={user.avatar}/>
                </IconButton>
                <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{textAlign:"center", color:"black"}}>Profile Sitting</DialogTitle>
                <DialogContent>

                          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                              <Avatar sx={{ width: 128, height: 128 }} src={image} />
                          </Box>
                            <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                      <DialogTitle sx={{textAlign:"center", color:"black"}}>เปลี่ยนรูปโปรไฟล์</DialogTitle>
                      <label htmlFor="contained-button-file">
                        <Row>
                            <Col>
                            <UploadFileIcon style={{marginRight:"10"}}/>
                            <Button variant="secondary" onClick={handleClick} style={{ marginTop:'2' }}>
                              อัพโหลดรูปภาพ
                            </Button>
                          </Col>
                        </Row>
                      </label>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
  
                </Dialog>
                <Button href='/logout' size="sm" variant="danger" >Logout</Button>
              </div>
              
            )}
          </Nav>
        </Container>
      </Navbar>
      </AppBar>
    </>
  );
}

export default UserNavbar;