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
import { useNavigate } from 'react-router-dom';
import { userData } from '../helper';
import conf from '../conf'


function Copyright(props: any) {
  const navigate = useNavigate();
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" onClick={() => navigate('/')}>
        Tour Ging
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const initialUser = { email: '', password: '', username: '' };

export default function RegisterPage() {
    const [user, setUser] = useState(initialUser)
    const [checkPassword, setCheckPassword] = useState('')
    const [checkEmail, setCheckEmail] = useState('')
    const [passValid, setPassValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const navigate = useNavigate();

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = `${conf.apiPrefix}/api/auth/local/register`;
        try {
          if (passValid && emailValid) {
            if (user.email && user.password && user.username) {
              await axios.post(url, user)
              toast.success('Registion Successfully', {
                hideProgressBar: true
              })
              navigate('/login', { replace: true })
          }
        }
      }catch(err) {
        toast.error("Username or Email has already exist.", {
          hideProgressBar: true
        })
      }}

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const trimmedValue = value.trim();
      setUser({
        ...user,
        [name]: trimmedValue,
      });
      if(name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(trimmedValue)) {
          setEmailValid(false)
          setCheckEmail('Email is not valid')
        }else {
          setEmailValid(true)
          setCheckEmail('')
        }
      }  
      if(name === 'password') {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passRegex.test(trimmedValue)) {
          setPassValid(false)
          setCheckPassword(`Password must contain
            ,At least 8 characters
            ,At least one uppercase letter
            ,At least one lowercase letter
            ,At least one special character
            ,At least one number`);
        } else {
          setPassValid(true)
          setCheckPassword('')
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
                    Register
                </Typography>
            </Box>
            <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    inputProps={{
                      maxLength: 15,
                      pattern: "^[a-zA-Z0-9]+([.][a-zA-Z0-9]+)*$",
                    }}
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    autoFocus
                />
                <Typography style={{fontSize:13, color:'red'}}>{checkEmail}</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <Typography style={{fontSize:13, color:'red'}}>{checkPassword}</Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!passValid || !emailValid}
                >
                    สมัครสมาชิก
                </Button>
                <Grid container>
                <Grid item xs>
                  <Link href="forgot_password" variant="body2">
                    ลืมรหัสผ่าน?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="login" variant="body2">
                    เข้าสู่ระบบ
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