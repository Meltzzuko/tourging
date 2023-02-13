import { useEffect } from 'react';
import { Button, requirePropFactory } from '@mui/material';
import { Box } from '@mui/system';
import UserNavbar from '../components/UserNavbar';
import FigureImage from 'react-bootstrap/FigureImage'
import Typography from '@mui/material/Typography/Typography';
import '../payment.css'

function CardspaymentSimilan() {
    return(
        <div className="item">
            <div className="content">
                <Typography style={{ fontSize: 50, textAlign: "left", fontWeight: "800" }} color='black'>การชำระเงิน</Typography>
                <Typography style={{ fontSize: 35, textAlign: "center", fontWeight: "bold", color: "#0147AB"}}>ทัวร์เกาะสิมิลัน</Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <FigureImage  style={{ borderRadius: 10,  border: "2px solid black" }} width={400} height={600} alt="171x180" src="similan.png" /> 
                </Box>
                <Typography style={{fontSize : 26, textAlign : "left", paddingLeft: 75, fontWeight: "550", color: "#3c73a8" }} >
                    รายละเอียดการจอง
                </Typography>
                <Typography style={{fontSize : 26, textAlign : "left", paddingLeft: 75, fontWeight: "550", color: "#3c73a8"}} >
                    ประเภททัวร์ ทัวร์รายวัน
                </Typography>
                <Typography style={{fontSize : 26, textAlign : "left", paddingLeft: 75, fontWeight: "550", color: "#3c73a8" }} >
                    จำนวนผู้จอง 1 ท่าน
                </Typography>
                <br/>
            </div>
        </div>
    )
}

export default CardspaymentSimilan;