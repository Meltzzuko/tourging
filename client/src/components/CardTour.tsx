import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';
import Tour from '../models/tour';


interface Props {
  Tours: Tour;
}


const CardTour = (props: Props) => {
  const navigate = useNavigate();
  const item = props.Tours.attributes;
  const tourimg = `http://localhost:1337${item.image.data.attributes.formats.thumbnail.url}`;
  return (
    <Card variant="outlined" sx={{ width: '100%', maxWidth: 400,backgroundColor: 'white' }}>
      <Typography level="h2" fontSize="xl" fontWeight="xl" color="primary" sx={{ mb: 0.5 }}>
        {item.Title}
      </Typography>
      <AspectRatio minHeight="100px" maxHeight="150px" sx={{ my: 2 }}>
        <img src={tourimg} loading="lazy" alt="" />
      </AspectRatio>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography fontSize="lg" fontWeight="lg" color="success" sx={{ mt: 2 }}>
          ราคา {item.price} บาท/ท่าน
        </Typography>
        <Typography level="body3" color="danger" sx={{ mt: 1, mb: 2 }}>
          เหลือ {item.available_seat} ที่
        </Typography>
        <Button
          href="similan"
          variant="outlined"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ mb: 2, fontWeight: 600 }}
          onClick={() => navigate(`/detail/${props.Tours.id}`)}
        >
          รายละเอียด
        </Button>
      </Box>
    </Card>
  );
};
export default CardTour;
