'use client'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, InputAdornment, IconButton, MenuItem } from "@mui/material";
import * as z from "zod";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { googleLogin, registerUser } from "@/app/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import './register.css';

function Register() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, currentUser } = useSelector((state: RootState) => state.auth);

  const signupSchema = z.object({
    username: z.string().min(1, "User Name is required"),
    role: z.string().min(1, { message: "Role is required." }),
    email: z.string().min(1, { message: "Email is required." }).email("Invalid email address."),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
  });

  type SignupForm = z.infer<typeof signupSchema>;

  const { control, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "", role: "" },
  });

  const onSubmit = async (data: any) => {
    console.log(data)
    const res = await dispatch(registerUser(data));
    if (res.meta.requestStatus === "fulfilled") {
      enqueueSnackbar("Registered Successfully!", { variant: "success" });
      router.push("/auth/login");
    } else {
      enqueueSnackbar(res.payload || "Registration Failed", { variant: "error" });
    }
  };

  const googleSign = async () => {
    const firebaseUser = (await signInWithPopup(auth, googleProvider)).user;
    const user = { username:firebaseUser.displayName, email: firebaseUser.email, password: 'password', role: "customer" };
    const res = await dispatch(googleLogin(user));
    if (res.meta.requestStatus === "fulfilled") {
      enqueueSnackbar("Google Login Success!", { variant: "success" });
      router.push("/dashboard");
    } else {
      enqueueSnackbar(res.payload || "Google Login Failed", { variant: "error" });
    }
  };

  return (
    <div className="register-outer">
      <div className="register-container">

        <div className="register-left">
          <Typography variant="h4" className="register-title">Looks like you're new here!</Typography>
          <Typography className="register-subtitle">
            Sign up with your email to get started
          </Typography>

        </div>

        <div className="register-right">
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Username"
                  variant="standard"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  className="register-input"
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Email"
                  variant="standard"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  className="register-input"
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
                  className="register-input"
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

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  placeholder="Select Role"
                  variant="standard"
                  fullWidth
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  className="register-input"
                >
                  <MenuItem value="seller">Seller</MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                </TextField>
              )}
            />

            <Button type="submit" fullWidth className="register-btn">
              Sign Up
            </Button>

            <Typography className="register-or">OR</Typography>

            <Button
              onClick={googleSign}
              fullWidth
              className="google-btn"
            >
              Sign in with Google
            </Button>

            <Typography className="register-login-text">
              Already have an account? <Link href="/auth/login">Login</Link>
            </Typography>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;
