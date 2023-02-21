import Card from '@mui/joy/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography/Typography';
import UserNavbar from '../components/UserNavbar';
import StarIcon from '@mui/icons-material/Star';
import {Row,Col,Container, } from 'react-bootstrap';
import Box from '@mui/system/Box/Box';
import Review from '../models/review';

interface Props {
    reviewData: Review
}

function CardReview(props: Props) {
    const reviewData = props.reviewData ? props.reviewData.attributes : null
    const avatar_img = reviewData?.avatar

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Row>
                    <Card  variant="outlined" sx={{ width: 270 , marginLeft: 15, marginTop:5, backgroundColor:'white', border:3 }} size='lg'>
                        <Row xs="2" style={{marginTop:"5px"}}>
                            <Col xs='3'>
                                <Avatar src={avatar_img}/>
                                <StarIcon style={{color:"yellow",marginTop:"6px", marginLeft:'15'}}/>
                            </Col>  
                            <Col xs='6'>
                                <Typography style={{fontWeight: "bold", color: "black"}}>{reviewData?.author}</Typography>
                                <Typography>{reviewData?.date}</Typography>
                                <Typography style={{marginTop:"1px"}}>{reviewData?.score}/10 คะแนน</Typography>
                            </Col>
                        </Row>
                        <Row style={{marginBottom:"15px"}}>
                            <Typography>{reviewData?.comment}</Typography>
                        </Row>
                    </Card>
                </Row>
            </Box>
        </div>
    )
}

export default CardReview;