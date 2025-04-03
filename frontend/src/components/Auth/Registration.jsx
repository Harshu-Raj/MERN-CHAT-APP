import React, { useState } from "react";
import { 
  Grid, 
  Alert, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress, 
  IconButton, 
  InputAdornment 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Register() {
  const [error, setError] = useState({ status: false, msg: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ status: false, msg: "", type: "" });
  
    const data = new FormData(e.target);
    const actualData = {
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };
  
    // Basic Validation
    if (!actualData.name || !actualData.email || !actualData.password || !actualData.confirmPassword) {
      return setError({ status: true, msg: "All fields are required", type: "error" });
    }
  
    if (!validateEmail(actualData.email)) {
      return setError({ status: true, msg: "Invalid email format", type: "error" });
    }
  
    if (!validatePassword(actualData.password)) {
      return setError({ 
        status: true, 
        msg: "Password must be at least 8 characters long.", 
        type: "error" 
      });
    }
  
    if (actualData.password !== actualData.confirmPassword) {
      return setError({ status: true, msg: "Passwords do not match!", type: "error" });
    }
  
    try {
      setLoading(true);
      
      console.log("Sending request to backend...");
      const response = await axios.post('http://localhost:5000/user/register', actualData, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Response received:", response);
  
      if (response.status === 201 || response.data.success) {
        setError({ status: true, msg: "Registration successful! Redirecting...", type: "success" });
  
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      } else {
        throw new Error(response.data.message || "Unexpected response from server.");
      }
    } catch (err) {
      console.error("Registration error:", err);
  
      setError({ 
        status: true, 
        msg: err.response?.data?.message || "Registration failed. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };
  
  

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
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FF8008", mb: 2 }}>
              WELCOME
            </Typography>
            <Typography variant="body1" sx={{ color: "#444" }}>
              Create an account and start chatting with your friends today!
            </Typography>
          </Grid>

          {/* Right Side (Register Form) */}
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
              Register
            </Typography>

            <TextField margin="normal" required fullWidth id="name" name="name" label="Full Name" autoFocus sx={{ mb: 2 }} />

            <TextField margin="normal" required fullWidth id="email" name="email" label="Email" type="email" sx={{ mb: 2 }} />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              helperText="Must be at least 8 characters, 1 uppercase, 1 number"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              sx={{
                mt: 1,
                mb: 2,
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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              <NavLink to="/login" style={{ color: "#FF8008", textDecoration: "none", fontWeight: "bold" }}>
                Already have an account? Login here
              </NavLink>
            </Typography>

            {error.status && <Alert severity={error.type} sx={{ mt: 2 }}>{error.msg}</Alert>}
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}
