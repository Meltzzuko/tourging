import { Box } from '@mui/system';
import {Button} from '@mui/material';
import UserNavbar from '../components/UserNavbar';
import FigureImage from 'react-bootstrap/FigureImage'
import Typography from '@mui/material/Typography/Typography';
import '../payment.css'
import { useNavigate,useLocation } from 'react-router-dom';
import Repo from '../repositories'
import payment from '../models/payment';
import { userData } from '../helper';
import Tourseat from '../models/tourseat';
import { Row, Col } from 'react-bootstrap';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userdata = userData();

    let username:string = userdata.username
    username = username ? username.trimEnd() : username

    const {tour_id ,tourdata ,selected_date ,quantity ,total} = location.state;

    const tour_end = (selected_date === tourdata.tour_date.data.attributes.first_trip ? 
                    tourdata.tour_date.data.attributes.first_trip_end : tourdata.tour_date.data.attributes.second_trip_end)
    
    const tourimg = `http://localhost:1337${tourdata.image.data.attributes.formats.thumbnail.url}`
    const tour_type = tourdata.category.data.attributes.type === "One-day" ? "ทัวร์ภูเก็ต One Day Trip" : "ทัวร์ภูเก็ตพร้อมที่พัก"

    const newPayment: payment = {
        data : {
          status: false,
          paylater: false,
          user: username,
          tour_name: tourdata.Title,
          tour_type: tour_type,
          tour_start: selected_date,
          tour_end: tour_end,
          quantity: quantity,
          total_price: total,
          image_url: tourimg
        }
      }

    const available_seat = tourdata.available_seat - quantity

    const updateSeat : Tourseat = {
        data : {
            available_seat: available_seat
        }
    }

    const handleBooking  = async () => {
        await Repo.Paymentdata.createPayment(newPayment,userdata.jwt)
        await Repo.Tourdata.updateTour(tour_id,updateSeat)
        navigate(`/userstatus`)
    }

    const handlePayLater = async () => {
        newPayment.data.paylater = true
        await Repo.Paymentdata.createPayment(newPayment,userdata.jwt)
        navigate(`/userstatus`)
    }

    return(
        <div>
            <UserNavbar/>
            <div className="flexbox" >
                <div className="item">
                    <div className="content">
                        <Typography style={{ fontSize: 30, textAlign: "center", fontWeight: "800" }} color='black'>การชำระเงิน</Typography>
                        <Typography style={{ fontSize: 26, textAlign: "center", fontWeight: "bold", color: "#0147AB"}}>{tourdata.Title}</Typography>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <FigureImage  style={{ borderRadius: 10,  border: "2px solid black" }} width={300} height={300} alt="171x180" src={tourimg} /> 
                        </Box>
                        <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 10, fontWeight: "550", color: "#3c73a8" }} >
                            รายละเอียดการจอง
                        </Typography>
                        <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 10, fontWeight: "550" }} >
                            ประเภททัวร์ : {tour_type}
                        </Typography>
                        <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 10, fontWeight: "550" }} >
                            จำนวนผู้จอง : {quantity} ท่าน
                        </Typography>
                        <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 10, fontWeight: "550" }} >
                            วันเดินทาง : {selected_date}
                        </Typography>
                        {tourdata?.category.data.attributes.type === "Many-day" &&
                            <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 10, fontWeight: "550" }} >
                                เดินทางกลับ : {(selected_date ? 
                                            (selected_date === tourdata.tour_date.data.attributes.first_trip ? 
                                            tourdata.tour_date.data.attributes.first_trip_end : tourdata.tour_date.data.attributes.second_trip_end)
                                            : "" ) as string}
                            </Typography>
                        }
                        <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 10, fontWeight: "550" }} >
                            ราคารวม : {total.toLocaleString()} บาท
                        </Typography>
                        <br/>
                    </div>
                </div>
                <div className="item">
                    <div className="content">
                    <Typography style={{ fontSize: 24, textAlign: "center", fontWeight: "700", marginTop: "10px" }} color='black'>สแกนเพื่อชำระเงิน</Typography>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <FigureImage  style={{ borderRadius: 10,  border: "2px solid black", marginTop: "10px" }} width={170} height={175}  src="/QR-code.png" /> 
                    </Box>
                    <center>
                    <FigureImage style={{paddingLeft: 40 }} width={260} height={210} alt="171x180" src="/K-bank2.png" /> 
                    </center>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography style={{ fontSize: 16, textAlign: "center", fontWeight: "700", marginTop: "5px" }} color='black'>กรุณาโทรยืนยันเพื่อแจ้งการจอง</Typography>
                        <Typography style={{ fontSize: 16, textAlign: "center", fontWeight: "700", marginTop: "5px" }} color='black'>และการชำระเงิน</Typography>
                        <Typography style={{ fontSize: 16, textAlign: "center", fontWeight: "700", marginTop: "5px", marginBottom: "10px" }} color='black'>Tel : 020-599-6363</Typography>
                        <Row>
                            <Col md='auto'>
                            <Button onClick={handleBooking}style={{marginRight:"2vw" }} variant="contained" color="primary" size="small">
                                ยืนยันการจอง
                            </Button>
                            <Button onClick={handlePayLater} variant="contained" color="primary" size="small">
                                จ่ายภายหลัง
                            </Button>
                            </Col>
                        </Row>
                    </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage