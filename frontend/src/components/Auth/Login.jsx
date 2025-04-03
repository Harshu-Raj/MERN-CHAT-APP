import React, { useState } from 'react';
import {
  Grid,
  Alert,
  Container,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RestorePageOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';  // ✅ Import axios for API calls
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [error, setError] = useState({ status: false, msg: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ status: false, msg: "", type: "" });

    const data = new FormData(e.target);
    const actualData = {
      email: data.get("email").trim(),
      password: data.get("password"),
    };

    // Field validation
    if (!actualData.email || !actualData.password) {
      return setError({ status: true, msg: "All fields are required", type: "error" });
    }

    if (!validateEmail(actualData.email)) {
      return setError({ status: true, msg: "Please enter a valid email address", type: "error" });
    }

    try {
      setLoading(true);
    
      // ✅ Send login request to backend
      const response = await axios.post("http://localhost:5000/user/login", actualData);
      console.log(response);
    
      if (response.data.success) {
        // ✅ Store JWT token in localStorage
        localStorage.setItem("authToken", response.data.token);

    
        // ✅ Decode JWT to get userID
        const decodedToken = jwtDecode(response.data.token);
        console.log("Decoded Token:", decodedToken);
        
    
        if (!decodedToken.userID) {
          throw new Error("Invalid token: userID missing");
        }
    
        // ✅ Fetch user details from backend
        try {
          const user = await axios.get(`http://localhost:5000/user/${decodedToken.userID}`);
          console.log("User Data:", user.data);
          console.log("user:",user);
          sessionStorage.setItem("user", JSON.stringify(user.data));
    
          // ✅ Redirect after fetching user data
          setTimeout(() => navigate("/app", { state: user.data }), 1500);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
        
        // ✅ Show success message
        setError({ status: true, msg: "Login successful! Redirecting...", type: "success" });
      }
    } catch (err) {
      setError({
        status: true,
        msg: err.response?.data?.message || "Invalid credentials. Please try again.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  }    
    

    return (
      <Container
        maxWidth="xl"
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #FF8008 30%, #FFC837 90%)",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Grid container spacing={2} sx={{ boxShadow: 3, borderRadius: 3, overflow: "hidden", maxWidth: 1000 }}>

            {/* Left Side (Info Section) */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 4,
                textAlign: isSmallScreen ? "center" : "left",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FF8008", mb: 2 }}>
                CHAT APP
              </Typography>
              <Typography variant="body1" sx={{ color: "#444" }}>
                Login and start chatting with your friends today!
              </Typography>
            </Grid>

            {/* Right Side (Login Form) */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                backgroundColor: "#FFF3E0",
                padding: { xs: 3, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" sx={{ color: "#FF8008", fontWeight: "bold", textAlign: "center", mb: 3 }}>
                Login
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                autoFocus
                sx={{ mb: 2 }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 3 }}
              />

              <Button
                sx={{
                  py: 1.5,
                  backgroundColor: "#FF8008",
                  color: "white",
                  "&:hover": { backgroundColor: "#E65100" },
                }}
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>

              <Typography align="center" sx={{ mt: 2 }}>
                <NavLink to="/register" style={{ color: "#FF8008", textDecoration: "none", fontWeight: "bold" }}>
                  Don't have an account? Register here
                </NavLink>
              </Typography>

              {error.status && (
                <Alert severity={error.type} sx={{ mt: 2 }}>
                  {error.msg}
                </Alert>
              )}
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    );
  }
