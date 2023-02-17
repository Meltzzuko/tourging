import Typography from '@mui/material/Typography';
import { Box} from '@mui/system';
import Card from "@mui/joy/Card/Card";
import { Row, Col, Container} from "react-bootstrap";
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Star from "@mui/icons-material/Star";
import {AppBar} from '@mui/material';



function CardComment() {
    return(
        <div>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Card variant="outlined" sx={{ width: 1100,backgroundColor: 'white',marginTop:'330px',  }}>
                        <Container>
                            <Row>
                                <Col xs={3} md={4}>
                                <Typography style={{ fontSize: 22, fontWeight: "bold", color: "black", textAlignLast: "left",marginLeft:"20px",marginBottom:"10px"}}>โปรดให้คะแนนเกี่ยวกับประสบการณ์ที่คุณได้รับ</Typography>
                                <Row>
                                    <Col xs="auto">
                                        <StarIcon style={{color:"yellow", marginLeft: '10px',marginTop:'10px'}}/>
                                    </Col>
                                    <Col>
                                    <Typography style={{ fontSize: 22, fontWeight: "bold", color: "black", textAlignLast: "left"}}>
                                        คะแนนเต็ม 10 :  
                                        <input type="number" min="5" max="10" style={{width: "50px",marginLeft:"10px"}} />
                                        </Typography> 
                                    </Col>
                                </Row>
                                </Col>
                                <Col xs={2} md={6}>
                                <TextField
                                    id="filled-multiline-static"
                                    sx={{ width: 550 }}
                                    multiline
                                    rows={4}
                                    label="เพิ่มความคิดเห็นของคุณ"
                                    variant="filled"/>
                                </Col>
                                    <Col xs={3} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button variant="contained" color="primary" size="large" sx={{marginTop:"45px"}}>โพส</Button>
                                        </Box>
                                    </Col>
                            </Row>
                        </Container>
                    </Card>
                </Box>
        </div>
        
        );
}

export default CardComment;