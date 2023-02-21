import { Box } from '@mui/system';
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

const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tourdata, setTourdata] = useState<Tours[]>([]);

  const params = useParams();

  const fetchData = async () => {
    try {
        const res = await Repo.Reviewdata.getReview(params.id as string);
        const res2 = await Repo.Tourdata.getTourById(params.id as string);
        if(res) {
            setReviews(res)
        }
        if(res2) {
            setTourdata(res2)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
      fetchData();
  },[params.id]);

  return (
      <div style={{ minHeight: "100vh" }}>
      <UserNavbar/>
      <Box sx={{display: 'flex' ,justifyContent: 'center'}}>
        <Card variant="outlined" sx={{ width: 300 , marginLeft: 15, marginTop:4, backgroundColor:'white', border:3}}>
          <Typography style={{ fontSize: 24, fontWeight: "bold", color: "black", textAlignLast: "center"}}>Review & Comment</Typography>
        </Card>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10}}>
        {reviews.map((item, index) => 
            <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
                <CardReview reviewData={item}/>
            </Grid>
        )}
      </Grid>
      <AppBar position='sticky' color='transparent' sx={{ bottom: 0 }}>
        <CardComment tourdata={tourdata[0]}/>
      </AppBar>              
    </div>
  )
}

export default ReviewPage