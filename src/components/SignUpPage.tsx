import React, { useState } from "react";
import { TextField, Button, Box, Link } from "@mui/material";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setError(null); // Сбрасываем ошибку при изменении поля
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Валидация на минимальную длину пароля
    if (userData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await ApiService.createUser(userData);
      console.log("User created successfully:", response);
      if (response.access_token) {
        localStorage.setItem("jwtToken", response.access_token.jwt);
        navigate("/tasks");
      }
    } catch (error) {
      alert("Failed to create user:");
      console.error("Failed to create user:", error);
      setError("Failed to create user.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="login"
        name="username"
        variant="outlined"
        onChange={handleChange}
        value={userData.username}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        onChange={handleChange}
        value={userData.email}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        onChange={handleChange}
        value={userData.password}
        required
        error={!!error}
        helperText={error}
      />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
      <Link href="/login" sx={{ fontSize: "20px" }}>
        login
      </Link>
    </Box>
  );
};

export default SignUpPage;
