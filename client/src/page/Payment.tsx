import { Box } from '@mui/system';
import UserNavbar from '../components/UserNavbar';
import CardPayment from '../components/CardPayment';
import FigureImage from 'react-bootstrap/FigureImage'
import Typography from '@mui/material/Typography/Typography';
import '../payment.css'
import { useLocation } from 'react-router-dom';


const PaymentPage = () => {
    const location = useLocation();
    const { tourdata ,selected_date ,quantity ,total} = location.state;

    const tourimg = `http://localhost:1337${tourdata.image.data.attributes.formats.thumbnail.url}`

    return(
        <div>
            <UserNavbar/>
            <div className="flexbox" >
                <div className="item">
                    <div className="content">
                        <Typography style={{ fontSize: 30, textAlign: "left", fontWeight: "800" }} color='black'>การชำระเงิน</Typography>
                        <Typography style={{ fontSize: 26, textAlign: "center", fontWeight: "bold", color: "#0147AB"}}>ทัวร์เกาะสิมิลัน</Typography>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <FigureImage  style={{ borderRadius: 10,  border: "2px solid black" }} width={300} height={300} alt="171x180" src={tourimg} /> 
                        </Box>
                        <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 10, fontWeight: "550", color: "#3c73a8" }} >
                            รายละเอียดการจอง
                        </Typography>
                        <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 10, fontWeight: "550" }} >
                            ประเภททัวร์ : {tourdata.category.data.attributes.type === "One-day" ? "ทัวร์ภูเก็ต One Day Trip" : "ทัวร์ภูเก็ตพร้อมที่พัก"}
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
                            ราคารวม : {total} บาท
                        </Typography>
                        <br/>
                    </div>
                </div>
                <div className="item">
                    <div className="content">
                    <Typography style={{ fontSize: 24, textAlign: "center", fontWeight: "700", marginTop: "10px" }} color='black'>สแกนเพื่อชำระเงิน</Typography>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <FigureImage  style={{ borderRadius: 10,  border: "2px solid black", marginTop: "10px" }} width={170} height={175}  src="../../public/QR-code.png" /> 
                    </Box>
                    <FigureImage  style={{ marginTop: "19px", paddingLeft: 70 }} width={260} height={210} alt="171x180" src="../../public/K-bank.png" /> 
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography style={{ fontSize: 16, textAlign: "center", fontWeight: "700", marginTop: "5px" }} color='black'>กรุณาโทรยืนยันเพื่อแจ้งการจอง</Typography>
                        <Typography style={{ fontSize: 16, textAlign: "center", fontWeight: "700", marginTop: "5px" }} color='black'>และการชำระเงิน</Typography>
                        <Typography style={{ fontSize: 16, textAlign: "center", fontWeight: "700", marginTop: "5px", marginBottom: "10px" }} color='black'>Tel : 020-599-6363</Typography>
                    </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage