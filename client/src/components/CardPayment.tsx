import { Box } from '@mui/system';
import FigureImage from 'react-bootstrap/FigureImage'
import Typography from '@mui/material/Typography/Typography';
import '../payment.css'

function CardPayment() {
    return(
        <div className="item">
            <div className="content">
                <Typography style={{ fontSize: 30, textAlign: "left", fontWeight: "800" }} color='black'>การชำระเงิน</Typography>
                <Typography style={{ fontSize: 26, textAlign: "center", fontWeight: "bold", color: "#0147AB"}}>ทัวร์เกาะสิมิลัน</Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <FigureImage  style={{ borderRadius: 10,  border: "2px solid black" }} width={300} height={300} alt="171x180" src="similan.png" /> 
                </Box>
                <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 75, fontWeight: "550", color: "#3c73a8" }} >
                    รายละเอียดการจอง
                </Typography>
                <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 75, fontWeight: "550", color: "#3c73a8"}} >
                    ประเภททัวร์ ทัวร์รายวัน
                </Typography>
                <Typography style={{fontSize : 20, textAlign : "left", paddingLeft: 75, fontWeight: "550", color: "#3c73a8" }} >
                    จำนวนผู้จอง 1 ท่าน
                </Typography>
                <br/>
            </div>
        </div>
    )
}

export default CardPayment;