import { Box } from '@mui/system';
import UserNavbar from '../components/UserNavbar';
import CardspaymentSimilan from '../components/Cardpaymentsimilan';
import FigureImage from 'react-bootstrap/FigureImage'
import Typography from '@mui/material/Typography/Typography';
import '../payment.css'

const PaymentPage = () => {
    return(
        <div>
            <UserNavbar/>
            <div className="flexbox" >
                <CardspaymentSimilan/>
                <div className="item">
                    <div className="content">
                    <Typography style={{ fontSize: 30, textAlign: "center", fontWeight: "700", marginTop: "30px" }} color='black'>สแกนเพื่อชำระเงิน</Typography>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <FigureImage  style={{ borderRadius: 10,  border: "2px solid black", marginTop: "30px" }} width={170} height={175}  src="QR-code.png" /> 
                    </Box>
                    <FigureImage  style={{ marginTop: "19px", paddingLeft: 70 }} width={375} height={300} alt="171x180" src="K-bank.png" /> 
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography style={{ fontSize: 24, textAlign: "center", fontWeight: "700", marginTop: "5px" }} color='black'>กรุณาโทรยืนยันเพื่อแจ้งการจอง</Typography>
                        <Typography style={{ fontSize: 24, textAlign: "center", fontWeight: "700", marginTop: "5px" }} color='black'>และการชำระเงิน</Typography>
                        <Typography style={{ fontSize: 24, textAlign: "center", fontWeight: "700", marginTop: "5px" }} color='black'>Tel : 020-599-6363</Typography>
                        <br/>
                    </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage