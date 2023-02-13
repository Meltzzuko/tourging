import UserNavbar from '../components/UserNavbar';
import {Row,Col,Container, Button} from 'react-bootstrap';
import Cardsimilan from '../components/CardTour';


const Homepage = () => {
    return (
        <div>
            <UserNavbar/>
            <Container>
                <Row style={{ marginTop: "15px" }}>
                    <Col md={{ span: 6, offset: 4 }}>
                        <Button href='/onedaytrip' style={{ marginRight: "15px" , border: "2px solid black" }} variant="light">ทัวร์ภูเก็ต One Day Trip</Button>
                        <Button href='/manydaytrip' variant="light" style = {{border: "2px solid black"}}>ทัวร์ภูเก็ตพร้อมที่พัก</Button>
                    </Col>
                </Row>
                <Row style={{ marginTop: "15px" , marginBottom: '15px'}}>
                    <Col xs={12} md={3} 
                        style={{ 
                            backgroundColor: "white", 
                            borderRadius: "10px", 
                            padding: "10px", 
                            fontSize: '18px',
                            fontWeight: "bold",
                            textAlign: 'center'  }}>
                        ทัวร์ภูเก็ต One Day Trip
                    </Col>
                    <Col xs={6} md={9} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <hr style={{ height: "2px", width: "80%", marginLeft: "5px", borderWidth: "5px",borderRadius:"20px" }} />
                    </Col>
                </Row>
                <Cardsimilan/>
                <Row style={{ marginTop: "15px" , marginBottom: '15px'}}>
                    <Col xs={12} md={3} 
                        style={{ 
                            backgroundColor: "white", 
                            borderRadius: "10px", 
                            padding: "10px", 
                            fontSize: '18px',
                            fontWeight: "bold",
                            textAlign: 'center'  }}>
                        ทัวร์ภูเก็ตพร้อมที่พัก
                    </Col>
                    <Col xs={6} md={9} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <hr style={{ height: "2px", width: "80%", marginLeft: "5px", borderWidth: "5px",borderRadius:"20px" }} />
                    </Col>
                </Row>
                <Cardsimilan/>
            </Container>
        </div>

    )
}
export default Homepage;
