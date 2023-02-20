import CardTourstatus from "../components/CardTourstatus"
import UserNavbar from '../components/UserNavbar';
import {Row,Col,Container} from 'react-bootstrap';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import Repo from "../repositories"
import paymentStatus from "../models/paymentStatus";
import { useState, useEffect } from "react";
import { userData } from "../helper";

const UserStatusPage = () => {
    const [paymentStatus, setPaymentStatus] = useState<paymentStatus[]>([]);
    const userdata = userData();

    let username:string = userdata.username
    username = username ? username.trimEnd() : username

    const fetchData = async () => {
        try {
            const res = await Repo.Paymentdata.getPayment(username);
            if(res) {
                setPaymentStatus(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div>
            <UserNavbar/>
            <Container>
                <Row style={{ marginTop: "15px",marginBottom: '15px'}}>
                <Col xs={12} md={3}
                style={{ 
                    backgroundColor: "white", 
                    borderRadius: "10px", 
                    padding: "10px", 
                    fontSize: '20px',
                    fontWeight: "bold",
                    textAlign: 'center',
                    border:"2px solid black"  }}>
                        สถานะการจอง                        
                </Col>
                    <Col xs={6} md={9} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <hr style={{ height: "2px", width: "80%", marginLeft: "5px", borderWidth: "5px",borderRadius:"20px", }} />
                    </Col>
                </Row>
                <Row>
                <Col md={{ span: 12, offset: 12 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" bgcolor="white" sx={{borderRadius: 8}}>
                    {paymentStatus.sort((a, b) => b.id - a.id).map((item) => (
                        <div key={item.id}>
                            <CardTourstatus payment_status={item} />
                            <hr style={{  height: "5px", width: "80%", marginLeft: "5px", borderWidth: "5px",borderRadius:"5px",color:"#002B5C" }} />
                        </div>
                    ))}
                        </Box> 
                </Col>
                </Row>
            </Container>   
        </div>
    )
}

export default UserStatusPage