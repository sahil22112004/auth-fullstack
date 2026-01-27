'use client'

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as z from 'zod';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/firebase';
import Link from 'next/link'
import { googleLogin, loginUser } from '../../redux/slices/authSlice';
import './login.css';

function Login() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, currentUser } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  const singupschema = z.object({
    email: z.string().min(1, 'Email is required').email("Invalid email format."),
    password: z.string().trim().min(1, 'Password is required').min(4, 'Password must be at least 4 characters'),
  });

  type loginInterface = z.infer<typeof singupschema>

  const { control, handleSubmit, formState: { errors } } = useForm<loginInterface>({
    resolver: zodResolver(singupschema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, currentUser, router]);

  const onSubmit = async (data: any) => {
    const res = await dispatch(loginUser(data));
    console.log("dta login form mmm",res.payload)
    if (res.meta.requestStatus === "fulfilled") {
      enqueueSnackbar("Logged In Successfully", { variant: "success" });
      if(res.payload.role=='admin'){
        router.push("/admindashboard");
      }else{router.push("/dashboard");}
    } else {
      enqueueSnackbar(res.payload || "Login Failed", { variant: "error" });
    }
  };

  const signInWithGoogle = async () => {
    const firebaseUser = (await signInWithPopup(auth, googleProvider)).user;
    const user = { username:firebaseUser.displayName, email: firebaseUser.email, role: "customer" };
    const res = await dispatch(googleLogin(user));
    if (res.meta.requestStatus === "fulfilled") {
      enqueueSnackbar("Signed in with Google!", { variant: "success" });
      router.push("/dashboard");
    } else {
      enqueueSnackbar(res.payload || "Google Login Failed", { variant: "error" });
    }
  };

  return (
    <div className="login-outer">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">
          <Typography variant="h4" className="login-title">Login</Typography>
          <Typography className="login-subtitle">
            Get access to your Orders, Wishlist and Recommendations
          </Typography>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Email or Mobile"
                  variant="standard"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  className="login-input"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  variant="standard"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  className="login-input"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(p => !p)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />

            <Button type="submit" fullWidth className="login-btn">
              Login
            </Button>

            <Typography className="login-or">OR</Typography>

            <Button onClick={signInWithGoogle} fullWidth className="google-btn">
              Sign in with Google
            </Button>

            <Typography className="signup-text">
              New to Flipkart? <Link href="/auth/register">Create an account</Link>
            </Typography>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
