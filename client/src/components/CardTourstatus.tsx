import { Box } from '@mui/system';
import Card from '@mui/joy/Card';
import Typography from '@mui/material/Typography/Typography';
import {Row,Col,Container, } from 'react-bootstrap';
import FigureImage from 'react-bootstrap/FigureImage'
import Button from '@mui/material/Button';
import paymentStatus from '../models/paymentStatus';

interface Props {
    payment_status: paymentStatus
}

function CardTourstatus(props: Props) {
    const paymentData = props.payment_status.attributes
    const tourimg = paymentData.image_url

    return(
        <>
            <Card variant='solid' sx={{ maxWidth: 1050,  backgroundColor:"white" }}>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                                <FigureImage  style={{ borderRadius: 20,  border: "2px solid black" }} width={400} height={300} alt="171x180" src={tourimg} /> 
                            </Box>
                        </Col>
                        <Col xs={5}>
                            <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "black"}}>{paymentData.tour_name}</Typography>
                            <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>รายละเอียดการจองทัวร์</Typography>
                            <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ประเภททัวร์ : {paymentData.tour_type}</Typography>
                            <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>จำนวนผู้จอง : {paymentData.quantity} ท่าน</Typography>
                            <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ระยะเวลา : {paymentData.tour_start}</Typography>
                            <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>กลับ : {paymentData.tour_end === null ? paymentData.tour_start : paymentData.tour_end }</Typography>
                            <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ราคารวม : {paymentData.total_price} บาท</Typography>
                            <Typography style={{ fontSize: 18, textAlign: "left", fontWeight: "bold", color: "red"}}>*หากไม่ยกเลิกการจองเกิน 3 วันก่อนเดินทางจะไม่มีการคืนค่าธรรมเนียม</Typography>
                        </Col>
                        <Col>
                            <Box 
                                display="flex" 
                                flexDirection="column" 
                                alignItems="center" 
                                justifyContent="center"
                                marginTop={10}
                            >
                                {paymentData.status ? 
                                    <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "green"}}>
                                    ชำระเงินเสร็จสิ้น
                                    </Typography>
                                    :
                                    <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "red"}}>
                                    กำลังยืนยันการชำระเงิน
                                    </Typography>
                                }
                                <Button 
                                    variant="contained" 
                                    color="error"
                                    style={{marginTop: 15}}
                                >
                                    ยกเลิกการจอง
                                </Button>
                            </Box>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>

    );
}

export default CardTourstatus;