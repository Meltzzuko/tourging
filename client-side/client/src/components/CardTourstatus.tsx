import { Box } from '@mui/system';
import Card from '@mui/joy/Card';
import Typography from '@mui/material/Typography/Typography';
import {Row,Col,Container, } from 'react-bootstrap';
import FigureImage from 'react-bootstrap/FigureImage'
import Button from '@mui/material/Button';
import paymentStatus from '../models/paymentStatus';
import Repo from '../repositories';
import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material"
import { Close } from '@mui/icons-material';
import Tours from '../models/tour';
import Tourseat from '../models/tourseat';
import { userData } from '../helper';
import { updatePayment } from '../models/payment';
import '../UserStatus.css'
import { toast } from 'react-toastify';


interface Props {
    payment_status: paymentStatus
    onDeleted: () => void;
    onConfirmPayment: () => void;
}

function CardTourstatus(props: Props) {
    const [popup, setPopup] = useState(false);
    const [paymentPopup, setPaymentPopup] = useState(false);
    const [tourdata,setTourData] = useState<Tours[]>([])
    const [autoCancel, setAutoCancel] = useState(false);
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [noSeat, setNoSeat] = useState(false);
    const user = userData();

    const paymentData = props.payment_status.attributes
    const title = paymentData.tour_name
    const tourimg = paymentData.image_url

    const autoCancelDateString = paymentData.createdAt
    const autoCancelDate = new Date(autoCancelDateString)

    const bookingDateString = paymentData.tour_start
    const bookingDate = new Date(bookingDateString);

    const tour = tourdata.length > 0 ? tourdata[0].attributes : null
    
    let seat = tour?.available_seat as number + paymentData.quantity

    const updateSeat : Tourseat = {
        data : {
            available_seat: seat
        }
    }

    const fetchData = async () => {
        try {
            const res = await Repo.Tourdata.getTourByTitle(title);
            if(res) {
                setTourData(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const ConfirmCancel = async (paylaterCancel : boolean) => {
        await Repo.Paymentdata.deletePayment(props.payment_status.id,user.jwt)
        if (!paylaterCancel) {
            await Repo.Tourdata.updateTour(tourdata[0].id,updateSeat)
        }
        setPopup(false)
        props.onDeleted()
    };
    

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const currentDate = new Date();
        const timeDiff = bookingDate.getTime() - currentDate.getTime()         
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        setShowCancelButton(daysDiff > 2);

        const timeDiff_2 = currentDate.getTime() - autoCancelDate.getTime()
        const daysDiff_2 = timeDiff_2 / (1000 * 3600 * 24)
        setAutoCancel(daysDiff_2 > 1);     
      }, [bookingDate]);
    
    useEffect(() => {
        setNoSeat(tour?.available_seat === 0 || tour?.available_seat as number < paymentData.quantity)
        if (autoCancel && !paymentData.status){
            ConfirmCancel(false)
        }
    })

    const updatePaylater : updatePayment = {
        data : {
            paylater : false
        }
    }

    const ConfirmPayment = async () => {
        await Repo.Paymentdata.updatePayment(props.payment_status.id,updatePaylater,user.jwt)
        updateSeat.data.available_seat = tour?.available_seat as number - paymentData.quantity
        await Repo.Tourdata.updateTour(tourdata[0].id,updateSeat)
        setPaymentPopup(false)
        props.onConfirmPayment()
    }

    return(
        <>
            <Card variant='solid' sx={{ maxWidth: 1050,  backgroundColor:"white" }} className="card">
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                                <FigureImage  style={{ borderRadius: 20,  border: "2px solid black" }} width={400} height={300} alt="171x180" src={tourimg} /> 
                            </Box>
                        </Col>
                        <Col xs={5}>
                            <Typography style={{  textAlign: "left", fontWeight: "bold", color: "black"}}>{paymentData.tour_name}</Typography>
                            <Typography style={{  textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>รายละเอียดการจองทัวร์</Typography>
                            <Typography style={{  textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ประเภททัวร์ : {paymentData.tour_type}</Typography>
                            <Typography style={{  textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>จำนวนผู้จอง : {paymentData.quantity} ท่าน</Typography>
                            <Typography style={{  textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>เดินทาง : {paymentData.tour_start}</Typography>
                            <Typography style={{  textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>กลับ : {paymentData.tour_end === null ? paymentData.tour_start : paymentData.tour_end }</Typography>
                            <Typography style={{  textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ราคารวม : {paymentData.total_price.toLocaleString()} บาท</Typography>
                            <Typography style={{  textAlign: "left", fontWeight: "bold", color: "red"}}>*หากไม่ยกเลิกการจอง 3 วันก่อนเดินทางจะไม่มีการคืนค่าธรรมเนียมและไม่สามารถยกเลิกการจองได้</Typography>
                        </Col>
                        <Col>
                            <Box 
                                display="flex" 
                                flexDirection="column" 
                                alignItems="center" 
                                justifyContent="center"
                                marginTop={"5vw"}
                            >

                                {paymentData.status &&
                                    <div style={{ textAlign: 'center'}}>
                                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "green" , marginTop:'16%'}}>
                                        ชำระเงินเสร็จสิ้น
                                        </Typography>
                                        {showCancelButton && (
                                            <Button 
                                            variant="contained" 
                                            color="error"
                                            className="my-button"
                                            style={{marginTop: 15}}
                                            onClick={() => setPopup(true)}
                                            >
                                                ยกเลิกการจอง
                                            </Button>
                                        )}
                                    </div>
                                    
                                }

                                {!paymentData.status && paymentData.paylater && !noSeat &&
                                    <div style={{ textAlign:'center'}}>
                                        <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "red"}}>
                                        รอการชำระเงิน
                                        </Typography>

                                        <Button 
                                        variant="contained" 
                                        color="error"
                                        style={{marginTop: 15}}
                                        onClick={() => setPaymentPopup(true)}
                                        >
                                            ดำเนินการชำระเงิน
                                        </Button>
                                    </div>
                                }

                                {paymentData.paylater && noSeat && !paymentData.status &&
                                    <div style={{ textAlign:'center'}}>
                                        <Typography style={{ fontSize: 15, textAlign: "left", fontWeight: "bold", color: "red"}}>
                                        ทัวร์เต็มแล้วหรือจำนวนที่นั่งไม่เพียงพอสำหรับท่าน, กรุณาตรวจสอบอีกครั้งใหม่อีกครั้งค่ะ
                                        </Typography>

                                        <Button 
                                        variant="contained" 
                                        color="error"
                                        style={{marginTop: 15}}
                                        onClick={() => ConfirmCancel(true)}
                                        >
                                            ลบ
                                        </Button>
                                    </div>
                                }

                                {!paymentData.status && !paymentData.paylater &&
                                    <div style={{textAlign: 'center'}}>
                                        <Typography style={{ fontSize: 20,  textAlign: "left", fontWeight: "bold", color: "red"}}>
                                        กำลังยืนยันการชำระเงิน
                                        </Typography>
                                        <Typography style={{ fontSize: 13,  textAlign: "left", fontWeight: "bold", color: "blue"}}>
                                        (ยกเลิกการจองอัตโนมัติภายใน 48 ชม. หากไม่มีการยืนยัน)
                                        </Typography>

                                        <Button 
                                        variant="contained" 
                                        color="error"
                                        className="my-button"
                                        style={{marginTop: 15}}
                                        onClick={() => setPopup(true)}
                                        >
                                            ยกเลิกการจอง
                                        </Button>
                                    </div>
                                    
                                }                 
                                           
                            </Box>
                        </Col>
                    </Row>
                </Container>
            </Card>

            <Dialog className="dialog-cancel" PaperProps={{ sx: { width: { xs: "80%", sm: "60%", md: "40%", lg: "75%" }, maxHeight: "100%" , borderRadius: "30px"} }} open={popup} onClose={() => setPopup(false)}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography style={{ fontSize: 20, fontWeight: "bold", color: "black"}}>ยืนยันยกเลิกการจอง</Typography>
                    <IconButton onClick={() => setPopup(false)}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers className="card">
                    <Typography style={{ fontWeight: "bold", color: "black"}}>
                        คุณกำลังจะยกเลิกการจอง "{paymentData.tour_name}" ซึ่งมีรายละเอียดดังนี้
                    </Typography>
                    <Container style={{ marginTop : 20}}>
                        <Row>
                            <Col>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" >
                                    <FigureImage  style={{ borderRadius: 20,  border: "2px solid black" }} width={240} height={180} alt="171x180" src={tourimg} /> 
                                </Box>
                            </Col>
                            <Col>
                                <Typography style={{ textAlign: "left", fontWeight: "bold", color: "black"}}>{paymentData.tour_name}</Typography>
                                <Typography style={{ textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>รายละเอียดการจองทัวร์</Typography>
                                <Typography style={{ textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ประเภททัวร์ : {paymentData.tour_type}</Typography>
                                <Typography style={{ textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>จำนวนผู้จอง : {paymentData.quantity} ท่าน</Typography>
                                <Typography style={{ textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>เดินทาง : {paymentData.tour_start}</Typography>
                                <Typography style={{ textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>กลับ : {paymentData.tour_end === null ? paymentData.tour_start : paymentData.tour_end }</Typography>
                                <Typography style={{ textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ราคารวม : {paymentData.total_price} บาท</Typography>                
                            </Col>
                        </Row>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant = "contained"
                        color="error"
                        onClick={() => ConfirmCancel(false)}
                        style={{marginRight: 20}}
                    >
                    ยกเลิกการจอง
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog className="dialog-payment" PaperProps={{ sx: { width: { xs: "80%", sm: "60%", md: "40%", lg: "30%" }, maxHeight: "100%" , borderRadius: "30px"} }} open={paymentPopup} onClose={() => setPaymentPopup(false)}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography style={{ fontSize: 18, fontWeight: "bold", color: "black"}}>รายละเอียดการชำระเงิน</Typography>
                    <IconButton onClick={() => setPaymentPopup(false)}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Container style={{ marginTop : 20 ,textAlign : 'center'}}>
                        <Row>
                            <Col>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50%" >
                                    <FigureImage  style={{ borderRadius: 20,  border: "2px solid black" }} width={171} height={180} alt="171x180" src="/QR-code.png" /> 
                                </Box>
                                <FigureImage  style={{paddingLeft: 40 }} width={260} height={210} alt="171x180" src="/K-bank2.png" /> 
                                <Typography style={{ fontSize: 15, textAlign: "center", fontWeight: "700", marginTop: "5px" }} color='black'>กรุณาโทรยืนยันเพื่อแจ้งการจอง</Typography>
                                <Typography style={{ fontSize: 15, textAlign: "center", fontWeight: "700", marginTop: "5px" }} color='black'>และการชำระเงิน</Typography>
                                <Typography style={{ fontSize: 15, textAlign: "center", fontWeight: "700", marginTop: "5px", marginBottom: "10px" }} color='black'>Tel : 020-599-6363</Typography>
                            </Col>
                        </Row>
                    </Container>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button
                        variant = "contained"
                        color="success"
                        onClick={ConfirmPayment}
                    >
                    ชำระเงินเสร็จสิ้น
                    </Button>
                    <Button
                        variant = "contained"
                        color="error"
                        onClick={() => ConfirmCancel(true)}
                        style={{marginRight: 20}}
                    >
                    ยกเลิกการจอง
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CardTourstatus;