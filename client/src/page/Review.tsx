import { Box, Container } from '@mui/system';
import Card from '@mui/joy/Card';
import Typography from '@mui/material/Typography/Typography';
import UserNavbar from '../components/UserNavbar';
import CardReview from '../components/CardReview';
import CardComment from '../components/CardComment';
import AppBar from '@mui/material/AppBar';
import Repo from '../repositories'
import Review from '../models/review';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Tours from '../models/tour';
import { userData } from '../helper';
import paymentStatus from '../models/paymentStatus';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Row, Col } from 'react-bootstrap';

const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tourdata, setTourdata] = useState<Tours[]>([]);
  const [paymentData,setPaymentData] = useState<paymentStatus[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewPerPage, setReviewPerPage] = useState(3);

  const user = userData();

  const params = useParams();

  const fetchData = async () => {
    try {
        const res = await Repo.Reviewdata.getReview(params.id as string);
        const res2 = await Repo.Tourdata.getTourById(params.id as string);
        let res3
        try {
          res3 = await Repo.Paymentdata.getPayment(user.username.trimEnd(),user.jwt)
        } catch {}
        if(res) {
            setReviews(res)
        }
        if(res2) {
            setTourdata(res2)
        }
        if(res3) {
            setPaymentData(res3)
        }
    } catch (error) {
        console.log(error)
    }
  }

  const IsPaid = paymentData.filter(
    payment => payment.attributes.status === true && payment.attributes.tour_name === tourdata[0].attributes.Title
  );

  useEffect(() => {
      fetchData();
  },[params.id]);

  const lastReviewIndex = currentPage * reviewPerPage;
  const firstReviewIndex = lastReviewIndex - reviewPerPage;
  const reviewData = reviews.sort((a, b) => b.id - a.id)
  const currentData = reviewData.slice(firstReviewIndex, lastReviewIndex);
  const paginateValue = Math.ceil(reviews.length/reviewPerPage);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      <UserNavbar/>
      <Box sx={{display: 'flex' ,justifyContent: 'center'}}>
        <Card variant="outlined" sx={{ width: 300 , marginTop:4, backgroundColor:'white', border:3}}>
          <Typography style={{ fontSize: 24, fontWeight: "bold", color: "black", textAlignLast: "center"}}>Review & Comment</Typography>
        </Card>
      </Box>
      <Grid container spacing={{ xs: 2, md: 0 }} columns={{ xs: 2, sm: 8, md: 12, lg: 15, xl: 10}} >
        {currentData.map((item, index) => 
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={index}>
            <CardReview reviewData={item} user={user}/>
          </Grid>
        )}
      </Grid>
      <Container>
        <Row>
          <Col>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" bgcolor="white" sx={{borderRadius: 8}} marginTop='1%' marginBottom='1%'>
            <Stack spacing={2}>
              <Pagination 
                  count={paginateValue} 
                  size="large" 
                  color="primary"
                  showFirstButton
                  showLastButton
                  page={currentPage}
                  onChange={handlePaginationChange} 
              />
            </Stack>
          </Box>
          </Col>
        </Row>
      </Container>
        {Array.isArray(IsPaid) && IsPaid.length > 0 &&
          <AppBar position="sticky" color='transparent' sx={{top: 'auto',bottom: 0}}>
            <CardComment tourdata={tourdata[0]} user={user} />
          </AppBar>
        }
    </React.Fragment>
  )
}

export default ReviewPage