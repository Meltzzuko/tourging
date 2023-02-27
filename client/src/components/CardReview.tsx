import Card from '@mui/joy/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography/Typography';
import StarIcon from '@mui/icons-material/Star';
import {Row,Col,Container} from 'react-bootstrap';
import Box from '@mui/system/Box/Box';
import Review from '../models/review';
import { DeleteForever, Close } from '@mui/icons-material';
import Repo from '../repositories'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material"
import { useState } from "react";
import FigureImage from 'react-bootstrap/esm/FigureImage';
import Button from '@mui/material/Button';

interface Props {
    reviewData: Review
    user : {
        username : string
        jwt: string
        avatar : string
    }
}

function CardReview(props: Props) {
    const [popup, setPopup] = useState(false);
    const reviewData = props.reviewData ? props.reviewData.attributes : null
    const avatar_img = reviewData?.avatar
    const user = props.user

    const handleDelete = async () => {
        await Repo.Reviewdata.deleteReview(props.reviewData.id,user.jwt)
        window.location.reload()
    }

    return (
        <Box sx={{ display: 'flex'}}>
            <Row style={{display:"flex", justifyContent:"center"}}>
                <Card  variant="outlined" sx={{ width: 270 , marginLeft:'4.65rem', marginTop:5, backgroundColor:'white', border:3 }} size='lg'>
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
                        <Col xs='3' className="ml-auto">
                            {user.username === reviewData?.author && 
                                <IconButton size='large' color="error" onClick={() => setPopup(true)}><DeleteForever/></IconButton>
                            }
                        </Col>
                    </Row>
                    <Row style={{marginBottom:"15px"}}>
                        <Typography>{reviewData?.comment}</Typography>
                    </Row>
                </Card>
            </Row>

            <Dialog PaperProps={{ sx: { width: "50%", maxHeight: "100%" , borderRadius: "30px"} }} open={popup} onClose={() => setPopup(false)}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography style={{ fontSize: 20, fontWeight: "bold", color: "black"}}>ยืนยันลบ Review</Typography>
                    <IconButton onClick={() => setPopup(false)}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography style={{ fontSize: 15, fontWeight: "bold", color: "black"}}>
                        คุณกำลังจะยกเลิก Review ซึ่งมีรายละเอียดดังนี้
                    </Typography>
                    <Container style={{ marginTop : 20}}>
                        <Row>
                            <Card  variant="outlined" sx={{ width: 270 , marginLeft: 15, backgroundColor:'white', border:3 }} size='lg'>
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
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant = "contained"
                        color="success"
                        onClick={handleDelete}
                        style={{marginRight: 20}}
                    >
                    ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default CardReview;