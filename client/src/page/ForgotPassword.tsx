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
import { useCallback,useState, useEffect,} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate,} from 'react-router-dom';
import {  userData } from '../helper';


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

const initialUser = { email: ''};

export default function ForgotPasswordPage() {
    const [user, setUser] = useState(initialUser)
    const [disabled, setDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const navigate = useNavigate();

    const handleSendMail = useCallback(async () => {
        const url = "http://localhost:1337/api/auth/forgot-password";
        try {
          if (user.email) {
            const res = await axios.post(url, user);
            if (res.data.ok) {
              toast.success("Link for reset password has been send to your email", {
                hideProgressBar: true,
              });
              setUser(initialUser);
            }
          }
        } catch (err) {
          toast.error("Something wrong", {
            hideProgressBar: true,
          });
        }
      }, [user]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = event.target;
          setUser({
            ...user,
            [name]: value,
          });
        },
        [user]
      );

    useEffect(() => {
      const data = userData();
      if(data.jwt) {
        navigate('/')
      }
    });
  
    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (disabled && countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else if (disabled && countdown === 0) {
        setDisabled(false);
        setCountdown(60);
      }
      return () => clearTimeout(timer);
    }, [disabled, countdown]);
  
    const handleClick = useCallback(() => {
        setDisabled(true);
        handleSendMail();
      }, [handleSendMail]);


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
                    Forgot your password?
                </Typography>
            </Box>
            <Box component="form" noValidate onSubmit={handleSendMail} sx={{ mt: 1 }}>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={disabled}
                    onClick={handleClick}
                    >
                    {disabled ? `Resend in ${countdown}s` : "Send Email for reset password"}
                </Button>
            <Grid container>
                <Grid item xs>
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