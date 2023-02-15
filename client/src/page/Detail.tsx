import UserNavbar from "../components/UserNavbar"
import { useEffect } from 'react';
import { Autocomplete, Button, requirePropFactory } from '@mui/material';
import { Box, margin } from '@mui/system';
import '../index.css'
import FigureImage from 'react-bootstrap/FigureImage'
import Typography from '@mui/material/Typography/Typography';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container} from "react-bootstrap";
import { Grid } from "@mui/material";
import Card from "@mui/joy/Card/Card";


const Detailpage = () => {
    return (
        <div>
            <UserNavbar/>
            <Container>
            <Row>
                <Col xs={6} md={4} >
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="45%" marginTop="50px" marginBottom = "30px" padding-left = "50px" padding-right = "50px">
                        <FigureImage  style={{ borderRadius: 20,  border: "2px solid black" }} width={400} height={250} alt="171x180" src="similan.png" /> 
                    </Box>
                    <Box>
                        <Card variant='outlined' sx = {{backgroundColor: 'white'}}>
                            <Col>
                                <Typography style={{ fontSize: 30, textAlign: "left", fontWeight: "bold", color: "black", textAlignLast: "center"}}>รายละเอียด</Typography>
                                <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>จำนวนสูงสุด: 10</Typography>
                                <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>จำนวนคงเหลือ: 3</Typography>
                                <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>วิธีการเดินทางระหว่างท่องเที่ยว: เรือ</Typography>
                                <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ราคาต่อท่าน: 1900 บาท</Typography>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "30px"}}>
                                    <Button variant="contained" style={{ backgroundColor: "black", color: "white" }} >Review/Coments</Button>
                                </div>
                            </Col>
                        </Card>
                    </Box>
                </Col>
                <Col xs={6} md={8}>
                    <Card variant='outlined' sx = {{backgroundColor: 'white', marginTop: "56px"}}  padding-left = "50px" padding-right = "50px">
                        <Typography style={{ fontSize: 30, textAlign: "left", fontWeight: "bold", color: "black", textAlignLast: "center"}}>รายละเอียด</Typography>
                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>จำนวนสูงสุด: 10</Typography>
                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>จำนวนคงเหลือ: 3</Typography>
                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>วิธีการเดินทางระหว่างท่องเที่ยว: เรือ</Typography>
                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ราคาต่อท่าน: 1900 บาท</Typography>
                        <Typography>.</Typography>
                        <Typography>.</Typography>
                        <Typography>.</Typography>
                        <Typography>.</Typography>
                        <Typography>.</Typography>
                        <Typography>.</Typography>
                        <Typography>.</Typography>
                        <Typography>.</Typography>
                        <Typography>.</Typography>
                        <Typography>.</Typography>
                    </Card>
                </Col>
            </Row>
            </Container>              
        </div>
        
    )
}

export default Detailpage