import Card from '@mui/joy/Card';
import Avatar from  '@mui/joy/Avatar';
import Typography from '@mui/material/Typography/Typography';
import UserNavbar from '../components/UserNavbar';
import StarIcon from '@mui/icons-material/Star';
import {Row,Col,Container, } from 'react-bootstrap';
import Box from '@mui/system/Box/Box';

function CardReview() {
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Row>
                    <Card  variant="outlined" sx={{ width: 250 , marginLeft: 15, marginTop:5, backgroundColor:'white', border:3 }} size='lg'>
                        <Row xs="2" style={{marginTop:"5px"}}>
                            <Col xs='3'>
                                <Avatar variant='outlined' sx={{}}>RE</Avatar>
                                <StarIcon style={{color:"yellow",marginTop:"6px", marginLeft:'15'}}/>
                            </Col>  
                            <Col xs='6'>
                                <Typography>re</Typography>
                                <Typography>2/17/2023</Typography>
                                <Typography style={{marginTop:"1px"}}>9/10 คะแนน</Typography>
                            </Col>
                        </Row>
                        <Row style={{marginBottom:"15px"}}>
                            <Typography>ชอบมาก อยากไปอีก บริการดี มากเลยครับ</Typography>
                        </Row>
                    </Card>
                </Row>
            </Box>
        </div>
    )
}

export default CardReview;