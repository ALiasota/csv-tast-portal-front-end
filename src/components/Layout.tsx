import React, { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ApiService from "../services/ApiService";
import { Box, Button } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const signOutAction = () => {
    navigate("/login");
    localStorage.removeItem("jwtToken");
  };
  useEffect(() => {
    const checkAuth = async () => {
      const response = await ApiService.getUser();
      if (!response) {
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/sign-up"
        ) {
          navigate("/login");
        }

        setAuth(false);
      } else {
        setAuth(true);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            task manager
          </Typography>
          {auth && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => signOutAction()}
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px",
        }}
      >
        <main>{children}</main>
      </Container>
    </Box>
  );
};

export default Layout;
