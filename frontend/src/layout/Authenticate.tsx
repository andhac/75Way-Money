import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { motion } from "framer-motion";


export default function Authenticated() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (route?: "profile" | "logout") => () => {
        setAnchorEl(null);
        if (route) {
            navigate(`/${route}`);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#1e1e2f", boxShadow: "none" }}>
                <Toolbar>
                    <Box
                        display="flex"
                        gap={2}
                        alignItems="center"
                        component={Link}
                        to="/"
                        sx={{ textDecoration: "none" }}
                    >
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <Typography color="white" variant="h5" fontFamily="'Poppins', sans-serif" fontWeight={600}>
                                Paisa Bhejo
                            </Typography>
                        </motion.div>
                    </Box>
                    {isAuthenticated && (
                        <Box marginLeft="auto">
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <IconButton
                                    size="large"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle sx={{ fontSize: 32 }} />
                                </IconButton>
                            </motion.div>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                keepMounted
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose()}
                            >
                                <MenuItem onClick={handleClose("profile")}>
                                    <Typography fontFamily="'Poppins', sans-serif">Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose("logout")}>
                                    <Typography fontFamily="'Poppins', sans-serif">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    );
}
