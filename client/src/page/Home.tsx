import UserNavbar from '../components/UserNavbar';
import {Row,Col,Container, Button} from 'react-bootstrap';
import CardTour from '../components/CardTour';
import { useEffect,useState } from 'react';
import Tour from '../models/tour';
import { Grid } from '@mui/material';
import Repo from '../repositories';
import '../Home.css';
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
  );
  return (
    <div className="homepage">
      <UserNavbar/>
      <Container>
        <Row>
          <center>
          <Col md={{ span: 8, offset: 4 }} style={{ display: "flex" }}>
            <Button href='/genre/One-day' className="homepage-button" style={{
                border: "0.4vh solid black",marginTop:'3vh',marginBottom:'3vh',borderRadius:"1.5rem", fontSize:"0.9rem" , boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.85)", backgroundColor:"rgb(29, 63, 92)" }}>ทัวร์ภูเก็ต One Day Trip</Button>
            <Button href='/genre/Many-day' className="homepage-button" style={{ marginLeft: '2vw',
                border: "0.4vh solid black",marginTop:'3vh',marginBottom:'3vh',borderRadius:"1.5rem", fontSize:"0.9rem", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.85)", backgroundColor:"rgb(29, 63, 92)" }}>ทัวร์ภูเก็ตพร้อมที่พัก</Button>
          </Col>
          </center>
        </Row>
        <center>
        <Row>
          <Col xs={11} md={3} className="section-title"style={{ marginBottom:'3vh' }}>
          <center>ทัวร์ภูเก็ต One Day Trip</center>
          </Col>
          <Col xs={5} md={9} className="section-line">
            <hr />
          </Col>
        </Row>
        </center>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10}}>
          {onedaytrip.map((item, index) => 
            <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
              <CardTour Tours={item} />
            </Grid>
          )}
        </Grid>
        <center>
      <Row style={{ marginTop: "15px" , marginBottom: '15px'}}>
          <Col xs={11} md={3} className="section-title"style={{ marginBottom:'3vh' }}>
            <center>ทัวร์ภูเก็ต พร้อมที่พัก</center>
          </Col>
          <Col xs={5} md={9} className="section-line">
            <hr />
          </Col>
      </Row>
      </center>
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
