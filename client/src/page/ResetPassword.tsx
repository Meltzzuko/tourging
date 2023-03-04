import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FigureImage from 'react-bootstrap/FigureImage'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom';
import { storeUser, userData } from '../helper';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Tour Ging
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();




const initialUser = {code:'', password: '',passwordConfirmation:''};

export default function ResetPasswordPage() {
    const [user, setUser] = useState(initialUser)
    const [passCheck, setPassCheck] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [resetdisabled, setResetDisabled] = useState(true)
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const code = search.get('code') as string
    const navigate = useNavigate();

    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = "http://localhost:1337/api/auth/reset-password"
        try {
          if (!user.password || !user.passwordConfirmation) {
            toast.error("Please fill in all the required fields", {
              hideProgressBar: true
            });
            return;
          }
      
          const {data} = await axios.post(url, user)
          console.log(data)
          if (data) {
            toast.success('Password has been reset', {
              hideProgressBar: true
            })
            setUser(initialUser)
            navigate('/login')
          }
        } catch (err) {
          toast.error('An error occurred while resetting the password', {
            hideProgressBar: true
          })
        }
    };
      
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({
          ...user,
          [name]: value,
          code:code
        });
      
        if (name === 'password') {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!regex.test(value)) {
            setPassCheck('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase, one special character, and one number');
            return;
          } else {
            setPassCheck('');
          }
        }
        
        if (name === 'passwordConfirmation') {
          if (value !== user.password) {
            setPassConfirm("Password and Confirm Password doesn't match");
          } else {
            setPassConfirm('');
            setResetDisabled(false);
          }
        }
    };
      

    useEffect(() => {
      const data = userData();
      if(data.jwt) {
        navigate('/')
      }
    });


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.imgur.com/JG2bi8I.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
                <FigureImage width={300} height={300} alt="171x180" src="logo.png" />
                <Box height={20} />
                <Typography component="h1" variant="h5">
                    Reset Your Password
                </Typography>
            </Box>
            <Box component="form" noValidate onSubmit={handleResetPassword} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="New Password"
                    type="password"
                    name="password"
                    autoComplete="password"
                    onChange={handleChange}
                    autoFocus
                />
                <Typography style={{fontSize:13, color:'red'}}>{passCheck}</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="passwordConfirmation"
                    label="New password confirmation"
                    type="password"
                    id="passwordConfirmation"
                    autoComplete="password"
                    onChange={handleChange}
                />
                <Typography style={{fontSize:13, color:'red'}}>{passConfirm}</Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={resetdisabled}
                >
                    Reset Password
                </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="login" variant="body2">
                    {'เข้าสู่ระบบ'}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="register" variant="body2">
                    {"สมัครสมาชิก"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}