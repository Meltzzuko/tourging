import UserNavbar from '../components/UserNavbar';
import {Row,Col,Container, Button} from 'react-bootstrap';
import CardTour from '../components/CardTour';
import { useEffect,useState } from 'react';
import Tour from '../models/tour';
import { Grid } from '@mui/material';
import Repo from '../repositories'


const Homepage = () => {
  const [tourdata, setTourData] = useState<Tour[]>([]);

  const fetchData = async () => {
    const res = await Repo.Tourdata.getAll()
    if(res) {
        setTourData(res)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

    const onedaytrip = tourdata.filter(
      tour => tour.attributes.category.data.attributes.type === "One-day"
      );

    const manydaytrip = tourdata.filter(
      tour => tour.attributes.category.data.attributes.type === "Many-day"
    )

    return (
        <div>
            <UserNavbar/>
            <Container>
                <Row style={{ marginTop: "15px" }}>
                    <Col md={{ span: 6, offset: 4 }}>
                        <Button href='/genre/One-day' style={{ marginRight: "15px" , border: "2px solid black", }} variant="light">ทัวร์ภูเก็ต One Day Trip</Button>
                        <Button href='/genre/Many-day' variant="light" style = {{border: "2px solid black"}}>ทัวร์ภูเก็ตพร้อมที่พัก</Button>
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
                            textAlign: 'center',
                            border:"2px solid black"  }}>
                        ทัวร์ภูเก็ต One Day Trip
                    </Col>
                    <Col xs={6} md={9} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <hr style={{ height: "2px", width: "80%", marginLeft: "5px", borderWidth: "5px",borderRadius:"20px", }} />
                    </Col>
                </Row>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10}}>
                  {onedaytrip.map((item, index) => 
                      <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
                          <CardTour Tours={item} />
                      </Grid>
                  )}
                </Grid>
                <Row style={{ marginTop: "15px" , marginBottom: '15px'}}>
                    <Col xs={12} md={3} 
                        style={{ 
                            backgroundColor: "white", 
                            borderRadius: "10px", 
                            padding: "10px", 
                            fontSize: '18px',
                            fontWeight: "bold",
                            textAlign: 'center',
                            border:"2px solid black"  }}>
                        ทัวร์ภูเก็ตพร้อมที่พัก
                    </Col>
                    <Col xs={6} md={9} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <hr style={{ height: "2px", width: "80%", marginLeft: "5px", borderWidth: "5px",borderRadius:"20px" }} />
                    </Col>
                </Row>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10}}>
                  {manydaytrip.map((item, index) => 
                      <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
                          <CardTour Tours={item} />
                      </Grid>
                  )}
                </Grid>
            </Container>
        </div>

    )
}
export default Homepage;
