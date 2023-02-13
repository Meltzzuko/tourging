import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';

function CardTour() {
  const navigate = useNavigate();

  return (
    <>
      <Card variant="outlined" sx={{ width: 250,backgroundColor: 'white' }}>
      <Typography level="h2" fontSize="xl" fontWeight="xl" color='primary' sx={{ mb: 0.5 }}>
        เกาะสิมิลัน
      </Typography>
      
      <AspectRatio minHeight="100px" maxHeight="150px" sx={{ my: 2 }}>
        <img
          src="https://i.imgur.com/i2yEcg4.png"
          srcSet="https://i.imgur.com/i2yEcg4.png 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography fontSize="lg" fontWeight="lg" color='success'>
            ราคา 1,900 บาท/ท่าน
          </Typography>
          <Typography level="body3" color='danger'>เหลือ 3 ที่</Typography>
        </div>
        <Button 
          href="similan"
          variant="outlined"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
          onClick={() => navigate('/detail/similan')}
        >
          รายละเอียด
        </Button>
      </Box>
    </Card>
    </>

  );
}

export default CardTour;
