'use client'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton,MenuItem } from "@mui/material";
import * as z from "zod";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, signInWithPopup, } from "firebase/auth";
import { auth, googleProvider, db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Link from "next/link";
import { register, siginwithgoogle } from "@/app/service/authApi";
import { Password } from "@mui/icons-material";
import { useRouter } from 'next/navigation'


function Register() {
//   const navigate = useNavigate();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const signupSchema = z.object({
    userName: z.string().min(1, "User Name is required"),
    role:z
    .string()
    .min(1, { message: "This field has to be filled." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email("Invalid email address."),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
  });

  type SignupForm = z.infer<typeof signupSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      role:''
    },
  });

  // const onSubmit = async (user: SignupForm) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       user.email,
  //       user.password
  //     );


  //     const firebaseUser = userCredential.user;
  //     console.log(firebaseUser)

  //     // Save user to Firestore
  //     await setDoc(doc(db, "users", firebaseUser.uid), {
  //       id: firebaseUser.uid,
  //       userName: user.userName,
  //       email: firebaseUser.email,
  //       photoUrl: firebaseUser.photoURL || null,
  //       provider: "email",
  //       createdAt: serverTimestamp(),
  //     });



  //     enqueueSnackbar("Registered Successfully!", { autoHideDuration: 3000 });
  //   //   navigate("/");
  //   } catch (error: any) {
  //     console.error(error);
  //     enqueueSnackbar(error.message, { autoHideDuration: 3000 });
  //   }
  // };

  const onSubmit = async (user:any)=>{
    try{
      const User = {
      id:Date.now(),
      username:user.userName,
      email:user.email,
      Password:user.password,
      role:user.role
    }
    const response = await register(User)
    if(response.message=="user register sucessfully"){
      router.push('/auth/login')
    }
    console.log(response)
  }catch(error:any){
    console.log("error is as ",error)
    }

  }
  const signInWithGoogle = async () => {
    try {
      const firebaseResponse = await signInWithPopup(auth, googleProvider);
      const firebaseUser = firebaseResponse.user;
      console.log(firebaseUser)

      const User = {
        id:Date.now(),
        username:firebaseUser.displayName||null,
        email:firebaseUser.email,
        Password:'password',
        role:'user'
      }

      const response = await siginwithgoogle(User)
      console.log(response)
      if(response.message){
        router.push('/dashboard')
      }
      enqueueSnackbar("Signed in with Google!", { autoHideDuration: 3000 });
    } catch (error: any) {
      console.error("Google Sign-in Error:", error);
      enqueueSnackbar(error.message, { autoHideDuration: 3000 });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
      <img src='https://mir-s3-cdn-cf.behance.net/projects/404/6b48ca65212669.Y3JvcCwxMDg4LDg1MSwyNjMsMA.jpg' width={850}  />

        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            boxShadow: "2",
          }}
        >
          <Typography
            variant="h1"
            component="h2"
            fontSize="55px"
            sx={{ fontStyle: "italic", m: 4 }}
          >
            FlipCart
          </Typography>
          

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="User Name"
                  variant="filled"
                  fullWidth
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

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
                  type={showPassword ? "text" : "password"}
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
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field} 
                  select
                  label="Role"
                  variant="filled"
                  fullWidth
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  sx={{ mb: 2 }} 
                >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
                </TextField>
              )}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 ,height:'4vh',backgroundColor:'orangered'}}>
              Sign Up
            </Button>
             <Typography
            variant="h4"
            component="h2"
            fontSize="25px"
            sx={{ fontStyle: "italic", m: 2 ,display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'}}
          >
            or
          </Typography>

            <Button
              onClick={signInWithGoogle}
              variant="contained"
              fullWidth
              sx={{ mt: 2, height:'4vh',backgroundColor:'orangered'}}
            >
              Sign in with Google
            </Button>
          </form>

          <Typography
            variant="h4"
            component="h2"
            fontSize="20px"
            sx={{ fontStyle: "italic", m: 4 }}
          >
            Already have an account?  <Link
              href="/auth/login"
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}

export default Register;