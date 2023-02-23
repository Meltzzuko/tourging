import { Button } from '@mui/material';
import { Box } from '@mui/system';
import UserNavbar from '../components/UserNavbar';
import '../index.css'
import FigureImage from 'react-bootstrap/FigureImage'
import Typography from '@mui/material/Typography/Typography';
import { useNavigate } from 'react-router-dom';

const Indexpage = () => {

    const navigate = useNavigate()

    return (
        <div >
            <UserNavbar/>
            <div>
                <video autoPlay loop muted className='back-video' 
                style={{
                    height: '140%',
                    width: '100%',
                    left: '50%',
                    top: '50%',
                    objectFit: 'cover',
                    transform: 'translate(-50% , -50%)' ,
                    position: 'absolute' }}>
                    <source src="Phuket.mp4" type="video/mp4"/>
                </video>
            <div className="box-container mt-5 border-dark">
                <Box display="flex" flexDirection="column" alignItems="center">
                    <FigureImage width={400} height={600} alt="171x180" src="logo.png" />
                        <Box height={30} />
                    <Typography component="h1" variant="h5">
                        หากคุณกำลังหาบริษัทที่จัดทำทัวร์ท่องเที่ยวในภูเก็ต 
                        และต้องการได้รับบริการที่ดี สถานที่พักคุณภาพ วิวสวยๆในราคา
                        ย่อมเยาละก็ เราขอเสนอ บริษัท Tourging ซึ่งทำเกี่ยวกับการท่องเที่ยวในภูเก็ต
                        พร้อมมีทีมงานคุณภาพคอยดูแลการท่องเที่ยว ซึ่งจะมอบประสบการณ์ที่ดีในการเที่ยว
                        ของคุณแน่นอน
                    </Typography>
                </Box>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button style={{ backgroundColor: 'rgb(135, 206, 250, 0.9)' }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                        navigate('/home')
                    }}
                >
                    เข้าสู่หน้าเว็บไซต์
                </Button>
            </div>
            </div>
        </div>
    )
};
export default Indexpage
