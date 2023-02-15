import CardTourstatus from "../components/CardTourstatus"
import UserNavbar from '../components/UserNavbar';
import {Row,Col,Container} from 'react-bootstrap';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

const UserStatusPage = () => {
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
                    fontSize: '45px',
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
                        <CardTourstatus/>
                        <hr style={{  height: "5px", width: "80%", marginLeft: "5px", borderWidth: "5px",borderRadius:"5px",color:"#002B5C" }} />
                        </Box> 
                </Col>
                </Row>
            </Container>   
        </div>
    )
}

export default UserStatusPage