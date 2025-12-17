import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import icon_logo from "../../assets/icon-logo.svg";
import icon_home from "../../assets/icon_home.svg";
import icon_book from "../../assets/icon_book.svg";

const navItems = [
  { label: "Home", icon: icon_home, path: "/" },
  { label: "Projects", icon: icon_book, path: "/projects" },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#2d2d2d",
          borderBottom: "1px solid rgba(212, 43, 238, 0.08)",
          boxShadow: "0 2px 20px #f8648e89",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              component="img"
              src={icon_logo}
              alt="logo"
              sx={{ width: 36, height: 36 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                letterSpacing: 1,
                color: "#fff",
                fontSize: { xs: 16, sm: 18 },
              }}
            >
              白开水不爱喝开水
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
            }}
          >
            {navItems.map((item) => {
              const active = pathname === item.path;

              return (
                <Box
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    textDecoration: "none",
                    color: active
                      ? "#ec4899"
                      : "rgba(255,255,255,0.7)",
                    fontSize: 14,
                    position: "relative",
                    transition: "all 0.3s ease",

                    "&:hover": { color: "#ec4899" },

                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -6,
                      width: active ? "100%" : 0,
                      height: "2px",
                      backgroundColor: "#ec4899",
                      transition: "width 0.3s ease",
                    },

                    "&:hover::after": { width: "100%" },
                  }}
                >
                  <Box
                    component="img"
                    src={item.icon}
                    alt={item.label}
                    sx={{ width: 20, height: 20 }}
                  />
                  <Typography
                    component="span"
                    sx={{ fontWeight: active ? 600 : 400 }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#fff",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: "#1f1f1f",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          {navItems.map((item) => {
            const active = pathname === item.path;

            return (
              <Box
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setOpen(false)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  textDecoration: "none",
                  color: active ? "#ec4899" : "#fff",
                  fontSize: 16,
                  fontWeight: active ? 600 : 400,
                }}
              >
                <Box
                  component="img"
                  src={item.icon}
                  alt={item.label}
                  sx={{ width: 22, height: 22 }}
                />
                {item.label}
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </>
  );
};
