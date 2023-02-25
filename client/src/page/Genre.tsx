import UserNavbar from '../components/UserNavbar';
import {Row,Col,Container, Button} from 'react-bootstrap';
import CardTour from '../components/CardTour';
import { useEffect,useState } from 'react';
import Tour from '../models/tour';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import Repo from '../repositories'

const GenrePage = () => {
    const [data, setTourData] = useState<Tour[]>([]);
    const params = useParams()

    const fetchData = async () => {
        const res = await Repo.Tourdata.getCategory(params.type as string)
        if(res) {
            setTourData(res)
        }
    }

    useEffect(() => {
        fetchData()
    }, [params.type])

    const headtitle = params.type==="One-day" ? "ทัวร์ภูเก็ต One Day Trip" : "ทัวร์ภูเก็ตพร้อมที่พัก"

    return (
        <div>
            <UserNavbar/>
            <Container>
                <Row style={{ marginTop: "15px" }}>
                    <Col md={{ span: 6, offset: 4 }} style={{ display: "flex" }}>
                        <Button href='/genre/One-day' style={{ marginRight: "15px", border: "2px solid black",  borderRadius:"1.5rem", backgroundColor:"rgb(29, 63, 92)" , fontSize:"0.9rem" , boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.85)"}}>ทัวร์ภูเก็ต One Day Trip</Button>
                        <Button href='/genre/Many-day' style = {{border: "2px solid black",  borderRadius:"1.5rem",  backgroundColor:"rgb(29, 63, 92)" , fontSize:"0.9rem" , boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.85)"}}>ทัวร์ภูเก็ตพร้อมที่พัก</Button>
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
                        {headtitle}
                    </Col>
                    <Col xs={6} md={9} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <hr style={{ height: "2px", width: "80%", marginLeft: "5px", borderWidth: "5px",borderRadius:"20px" }} />
                    </Col>
                </Row>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10}}>
                  {data.map((item, index) => 
                      <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
                          <CardTour Tours={item} />
                      </Grid>
                  )}
                </Grid>
            </Container>
        </div>

    )
}
export default GenrePage;