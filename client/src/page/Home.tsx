import UserNavbar from '../components/UserNavbar';
import {Row,Col,Container, Button} from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import CardTour from '../components/CardTour';
import { useEffect,useState } from 'react';
import Tour from '../models/tour';
import { Box, Grid } from '@mui/material';
import Repo from '../repositories';
import '../Home.css';


const Homepage = () => {
  const [tourdata, setTourData] = useState<Tour[]>([]);
  const [currentOnedayPage, setCurrentOneDayPage] = useState(1);
  const [currentManydayPage, setCurrentManyDayPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(4);
  
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

  const lastOneDayIndex = currentOnedayPage * dataPerPage;
  const firstOneDayIndex = lastOneDayIndex - dataPerPage;;
  const lastManyDayIndex = currentManydayPage * dataPerPage;
  const firstManyDayIndex = lastManyDayIndex - dataPerPage;
  
  const OneDayData = onedaytrip.slice(firstOneDayIndex, lastOneDayIndex);
  const ManyDayData = manydaytrip.slice(firstManyDayIndex, lastManyDayIndex)

  const paginateOneValue = Math.ceil(onedaytrip.length/dataPerPage);
  const paginateManyValue = Math.ceil(manydaytrip.length/dataPerPage); 

  const handlePaginationOneChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentOneDayPage(value);
  };

  const handlePaginationManyChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentManyDayPage(value);
  };


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
          {OneDayData.map((item, index) => 
            <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
              <CardTour Tours={item} />
            </Grid>
          )}
        </Grid>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" bgcolor="white" sx={{borderRadius: 8}} marginTop='1%' marginBottom='1%'>
          <Stack spacing={2}>
                <Pagination 
                    count={paginateOneValue} 
                    size="large" 
                    color="primary"
                    showFirstButton
                    showLastButton
                    page={currentOnedayPage}
                    onChange={handlePaginationOneChange} 
                />
            </Stack>
        </Box>
        <center>
      <Row style={{ marginTop: "70px" , marginBottom: '15px'}}>
          <Col xs={11} md={3} className="section-title"style={{ marginBottom:'3vh' }}>
            <center>ทัวร์ภูเก็ต พร้อมที่พัก</center>
          </Col>
          <Col xs={5} md={9} className="section-line">
            <hr />
          </Col>
      </Row>
      </center>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10}}>
        {ManyDayData.map((item, index) => 
          <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
            <CardTour Tours={item} />
          </Grid>
        )}
      </Grid>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" bgcolor="white" sx={{borderRadius: 8}} marginTop='1%' marginBottom='1%'>
          <Stack spacing={2}>
                <Pagination 
                    count={paginateManyValue} 
                    size="large" 
                    color="primary"
                    showFirstButton
                    showLastButton
                    page={currentManydayPage}
                    onChange={handlePaginationManyChange} 
                />
            </Stack>
        </Box>
      </Container>
    </div>
    )
}
export default Homepage;
