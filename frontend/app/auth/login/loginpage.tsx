'use client'

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton, colors } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as z from 'zod';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, db } from '../../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, query, where, setDoc, doc, updateDoc } from "firebase/firestore";
import Link from 'next/link'
import { googleLogin, loginUser } from '../../redux/slices/authSlice';
import { WidthFull } from '@mui/icons-material';






function Login() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false);
  const {error,isLoggedIn,loading,currentUser} = useSelector((state:RootState)=>state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const singupschema = z.object({
    email: z
      .string()
      .min(1, 'User Name is required')
      .email("This is not a valid email."),
    password: z
      .string()
      .trim()
      .min(1, 'Password is required')
      .min(4, 'Password must be at least 4 characters'),

  });const firebaseConfig = {

};
  type loginInterface = z.z.infer<typeof singupschema>

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInterface>({
    resolver: zodResolver(singupschema),
    defaultValues: {
      email: '',
      password: '',

    },
  });

useEffect(() => {
  if (isLoggedIn && currentUser) {
    router.push("/dashboard");
  }
}, [isLoggedIn, currentUser, router]);

const onSubmit = async (data: any) => {
  const res = await dispatch(loginUser(data));

  if (res.meta.requestStatus === "fulfilled") {
    enqueueSnackbar("Logged In Successfully", { variant: "success" });
    router.push("/dashboard");
  } else {
    enqueueSnackbar(res.payload || "Login Failed", { variant: "error" });
  }
};

const signInWithGoogle = async () => {
  const firebaseUser = (await signInWithPopup(auth, googleProvider)).user;

  const user = {
    email: firebaseUser.email,
    role: "user",
  };

  const res = await dispatch(googleLogin(user));

  if (res.meta.requestStatus === "fulfilled") {
    enqueueSnackbar("Signed in with Google!", { variant: "success" });
    router.push("/dashboard");
  } else {
    enqueueSnackbar(res.payload || "Google Login Failed", { variant: "error" });
  }
};


  return (
    <>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <img src='https://mir-s3-cdn-cf.behance.net/projects/404/6b48ca65212669.Y3JvcCwxMDg4LDg1MSwyNjMsMA.jpg' width={850}  />
        
        <Paper elevation={3} sx={{
          p: 4, width: '30%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          boxShadow: '2'

        }}>
          <Typography variant="h1" component="h2" fontSize="55px" sx={{ fontStyle: 'italic', m: 4 }} >
          FlipCart
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="filled"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="filled"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 2}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />


            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2 , height:'4vh',backgroundColor:'orangered'}}
            >
              Login
            </Button>
            <Typography variant="h4" component="h2" fontSize="25px" sx={{ fontStyle: 'italic', m: 2 ,display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',}} >
           or
          </Typography>
            <Button
              onClick={signInWithGoogle}
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2, height:'4vh',backgroundColor:'orangered'}}
            >
              Sign in with Google
            </Button>
          </form>
          <Typography variant="h4" component="h2" fontSize="20px" sx={{ fontStyle: 'italic', m: 4 }} >
            Already have accout  <Link  href="/auth/register">Singup</Link>
          </Typography>
        </Paper>
      </Box>

    </>
  );
}

export default Login