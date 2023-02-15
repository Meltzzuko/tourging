import { Box } from '@mui/system';
import Card from '@mui/joy/Card';
import Typography from '@mui/material/Typography/Typography';
import {Row,Col,Container, } from 'react-bootstrap';
import FigureImage from 'react-bootstrap/FigureImage'
import Button from '@mui/material/Button';


function CardTourstatus() {
    return(
        <>
            <Card variant='solid' sx={{ maxWidth: 1050,  backgroundColor:"white" }}>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                                <FigureImage  style={{ borderRadius: 20,  border: "2px solid black" }} width={400} height={300} alt="171x180" src="https://i.imgur.com/JAMlaNo.png" /> 
                            </Box>
                        </Col>
                        <Col xs={12} md={8}>
                        <Typography style={{ fontSize: 30, textAlign: "left", fontWeight: "bold", color: "black"}}>ทัวร์เกาะสิมิลัน</Typography>
                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>รายละเอียดการจองทัวร์</Typography>
                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ประเภททัวร์ : ทัวร์รายวัน</Typography>
                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>จำนวนผู้จอง : 1 ท่าน</Typography>
                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>เดินทาง : 13/2/2566</Typography>
                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>กลับ : 13/2/2566</Typography>
                        <Row xs={1} md={2} lg={3}>
                            <Col><Typography style={{ fontSize: 22, textAlign: "left", fontWeight: "bold", color: "green"}}>ชำระเงินเสร็จสิ้น</Typography></Col>
                            <Col>
                                <Button variant="contained" color="error">ยกเลิกการจอง</Button>
                            </Col>
                        </Row>
                        <Typography style={{ fontSize: 18, textAlign: "left", fontWeight: "bold", color: "red"}}>*หากไม่ยกเลิกการจองเกิน 3 วันก่อนเดินทางจะไม่มีการคืนค่าธรรมเนียม</Typography>


                        </Col>
                    </Row>
                </Container>
            </Card>
        </>

    );
}

export default CardTourstatus;