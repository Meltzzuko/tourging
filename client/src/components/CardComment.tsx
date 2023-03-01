import { Box } from '@mui/system';
import {ChangeEvent, useState} from 'react';
import Card from '@mui/joy/Card/Card';
import StarIcon from '@mui/icons-material/Star';
import { Col, Container, Row } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import Repo from '../repositories';
import Postreview from '../models/postreview';
import { format } from 'date-fns';
import Tours from '../models/tour';
import './CardComment.css';


interface Props {
    tourdata : Tours
    user : {
        username : string
        jwt : string
        avatar : string
    }
}

function CardComment(props: Props) {
    const [commentText, setCommentText] = useState('');
    const [scoreReview, setScoreReview] = useState(1);
    const tour_data = props.tourdata ? props.tourdata : null
    const user = props.user

    const handleCommentText = (e : ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    }

    const handleScoreReview = (e : ChangeEvent<HTMLInputElement>) => {
        setScoreReview(parseInt(e.target.value));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await Repo.Reviewdata.createReview(newReview,user.jwt)
        window.location.reload()
    }

    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');

    const newReview : Postreview = {
        data: {
            tour_id : tour_data?.id as number,
            tour_name: tour_data?.attributes.Title as string,
            author: user.username,
            score: scoreReview,
            avatar : user.avatar,
            comment : commentText,
            date: formattedDate
        }
    }

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
        <Card variant="outlined" sx={{ width: "90%", maxWidth: 1100, backgroundColor: 'white'}}>
            <Container>
                <form onSubmit={handleSubmit}>
                    <Row sx={{ flexDirection: { xs: "column", md: "row" } }}>
                        <Col xs={12} md={4} sx={{ order: { xs: 2, md: 1 } }}>
                            <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: "bold", color: "black", textAlignLast: "left", marginLeft: { xs: "20px", md: "0px" }, marginBottom:"10px"}}>โปรดให้คะแนนเกี่ยวกับประสบการณ์ที่คุณได้รับ</Typography>
                            <Row>
                                <Col xs="auto">
                                    <StarIcon style={{color:"yellow", marginLeft: '5px',marginTop:'10px'}}/>
                                </Col>
                                <Col>
                                    <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: "bold", color: "black", textAlignLast: "left"}}>
                                    คะแนนเต็ม 10 :  
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max="10" 
                                        placeholder='1'
                                        value={scoreReview}
                                        onChange={handleScoreReview}
                                        style={{width: "50px",marginLeft:"10px"}}
                                        onBlur={(e) => {
                                            if (e.target.value === '') {
                                                setScoreReview(1);
                                            } else if (parseInt(e.target.value) > 10) {
                                                setScoreReview(10);
                                            }
                                        }}
                                        required  
                                    />
                                    </Typography> 
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                            <TextField
                                id="filled-multiline-static"
                                sx={{ width: "100%" }}
                                multiline
                                rows={4}
                                label="เพิ่มความคิดเห็นของคุณ"
                                variant="filled"
                                value={commentText}
                                onChange={handleCommentText}
                                required
                                />
                        </Col>
                        <Col xs={12} md={2} sx={{ order: { xs: 3, md: 3 }, display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type="submit" variant="contained" color="primary" size="large" sx={{marginTop: { xs: "15px", md: "45px" }}} >โพสต์</Button>
                            </Box>
                        </Col>
                    </Row>
                </form>
            </Container>
        </Card>
    </Box>    
    );
}

export default CardComment;