import React, { useState } from "react";
import { TextField, Button, Box, Link } from "@mui/material";
import { UserCredentials } from "../types";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoader(true);
    try {
      const response = await ApiService.loginUser(credentials);
      console.log("User created successfully:", response);
      if (response.access_token) {
        localStorage.setItem("jwtToken", response.access_token);
        setLoader(false);
        navigate("/tasks");
      }
    } catch (error) {
      alert("incorrect password or login");
      setLoader(false);
    }
  };
  if (loader) return "loading";
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "400px",
        alignItems: "center",
      }}
    >
      <TextField
        label="Username"
        name="username"
        variant="outlined"
        onChange={handleChange}
        value={credentials.username}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        onChange={handleChange}
        value={credentials.password}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <Link href="/sign-up" sx={{ fontSize: "20px" }}>
        sign up
      </Link>
    </Box>
  );
};

export default LoginPage;
