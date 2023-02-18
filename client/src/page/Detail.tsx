import UserNavbar from "../components/UserNavbar"
import { useEffect,useState } from 'react';
import {Button} from '@mui/material';
import { Box} from '@mui/system';
import '../index.css'
import FigureImage from 'react-bootstrap/FigureImage'
import Typography from '@mui/material/Typography/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Container, Form} from "react-bootstrap";
import Card from "@mui/joy/Card/Card";
import Tours from "../models/tour";
import Repo from '../repositories'
import ReactMarkdown from "react-markdown";


const Detailpage = () => {
    const [tourdata,setTourData] = useState<Tours[]>([]);
    const [selectedTourDate, setSelectedTourDate] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const fetchData = async () => {
        try {
            const res = await Repo.Tourdata.get(params.id as string);
            if(res) {
                setTourData(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [params.id])
    
    const handleTourDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTourDate(e.target.value)
        setIsValid(Boolean(e.target.value))
    }
    
    const data = tourdata.length > 0 ? tourdata[0].attributes : null;
    const tourimg = `http://localhost:1337${data?.image.data.attributes.formats.thumbnail.url}`

    const LinkToReview = () => {
        navigate(`/detail/${params.id}/review`);
    } 
    const LinkToPayment = () => {
        navigate(`/detail/${params.id}/payment`,
        {state: {
            tourdata: data,
            selected_date : selectedTourDate,
            quantity : quantity,
            total: total_price,
        }}
        )
    } 

    const total_price = data?.price as number * quantity;

    return (
        <div>
            <UserNavbar/>
            <Container>
            <Row>
                <Col xs={6} md={4} >
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="45%" marginTop="30px" marginBottom = "30px" padding-left = "50px" padding-right = "50px" >
                        <FigureImage  style={{ borderRadius: 20,  border: "2px solid black" }} width={400} height={250} alt="171x180" src={tourimg} /> 
                    </Box>
                    <Box>
                        <Card variant='outlined' sx = {{backgroundColor: 'white'}}>
                            <Col>
                                <Typography style={{ fontSize: 30, textAlign: "left", fontWeight: "bold", color: "black", textAlignLast: "center"}}>รายละเอียด</Typography>
                                <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>จำนวนคงเหลือ: {data?.available_seat}</Typography>
                                <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>วิธีการเดินทางระหว่างท่องเที่ยว: {data?.vehicle}</Typography>
                                <Typography style={{ fontSize: 20, textAlign: "left", fontWeight: "bold", color: "#0147AB"}}>ราคาต่อท่าน: {data?.price} บาท</Typography>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "30px"}}>
                                    <Button onClick={LinkToReview} variant="contained" style={{ backgroundColor: "black", color: "white" }} >Review/Coments</Button>
                                </div>
                            </Col>
                        </Card>
                    </Box>
                </Col>
                <Col xs={6} md={8}>
                <Card variant='outlined' sx = {{backgroundColor: 'white', marginTop: "35px"}}  padding-left = "50px" padding-right = "50px">
                        <Typography style={{ fontSize: 30, textAlign: "left", fontWeight: "bold", color: "black", textAlignLast: "center"}}>รายละเอียด</Typography>
                        <ReactMarkdown>{data?.Longdescription as string}</ReactMarkdown>
                       
                        <Row xs={6} md={2} lg={3} style={{marginLeft: "70px"}}>
                            <Col>
                                <Typography style={{ fontSize: 22, textAlign: "left", fontWeight: "bold", color: "black", textAlignLast: "right",marginTop:"10px"}}>วันเดินทาง</Typography>
                            </Col>
                            <Col>
                                <Form.Select
                                    value={selectedTourDate}
                                    onChange={handleTourDateChange}
                                    required
                                >
                                    <option value="" disabled hidden>
                                        เลือกวันเดินทาง
                                    </option> 
                                    <option value={data?.tour_date?.data?.attributes.first_trip}>
                                        {data?.tour_date?.data?.attributes.first_trip}
                                    </option>
                                    <option value={data?.tour_date?.data?.attributes.second_trip}>
                                        {data?.tour_date?.data?.attributes.second_trip}
                                    </option>
                                </Form.Select>
                            </Col>
                        </Row>

                        {data?.category.data.attributes.type === "Many-day" &&
                            <Row 
                                xs="auto" 
                                style={{ marginLeft: '100px'}}
                            >
                                <Col>
                                    <Typography 
                                        style={{ 
                                            fontSize: 22, 
                                            fontWeight: "bold", 
                                            color: "black",
                                            marginTop:"5px" ,
                                            marginRight:"8px"
                                        }}>เดินทางกลับ
                                    </Typography>
                                </Col>
                                <Col>
                                    <Form.Control 
                                    type="text" 
                                    placeholder={(selectedTourDate ? 
                                    (selectedTourDate === data?.tour_date?.data?.attributes.first_trip ? data?.tour_date?.data?.attributes.first_trip_end : data?.tour_date?.data?.attributes.second_trip_end)
                                    : "" ) as string}
                                    readOnly />
                                </Col>
                            </Row>
                        }

                        <Row xs="auto" style={{marginLeft: '8px'}} className="justify-content-md-center">
                            <Col>
                                <Typography style={{ fontSize: 22, textAlign: "left", fontWeight: "bold", color: "black", textAlignLast: "right",marginTop:"10px" ,marginRight:"8px"}}>
                                    จำนวนคน
                                </Typography>
                            </Col>
                            <Col maginTop="10px">
                                <Box marginTop={2}>
                                    <input 
                                        type="number" 
                                        min="1"
                                        placeholder="1" 
                                        max={data?.available_seat}
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        onBlur={(e) => {
                                            if (e.target.value === '') {
                                                setQuantity(1);
                                            }
                                        }}
                                    />
                                </Box>
                            </Col>
                            <Col>
                                <Typography style={{ fontSize: 22,  fontWeight: "bold", color: "black", marginTop:"10px"}}>
                                คน
                                </Typography>
                            </Col>
                            <Col>
                                <Typography style={{ fontSize: 22,  fontWeight: "bold", color: "red", marginTop:"10px"}}>
                                    {Number.isNaN(total_price) ? "0" : total_price } บาท
                                </Typography>
                            </Col>
                        </Row>
                        <Row xs="auto" style={{marginTop: "25px"}} className="justify-content-md-center">
                            <Col >
                                <Button disabled={!isValid} onClick={LinkToPayment} variant="contained" color="primary" size="large">
                                    จอง package
                                </Button>
                            </Col>
                        </Row>
                        <br/>                       
                    </Card>
                </Col>
            </Row>
            </Container>              
        </div>
        
    )
}

export default Detailpage