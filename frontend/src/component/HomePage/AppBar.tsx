import { AppBar, Avatar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import DrawerContent from "../../functions/DrawerContent.tsx";

function AppDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Money Transfer App
                    </Typography>
                    <IconButton color="inherit">
                        <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <DrawerContent onClick={toggleDrawer(false)} />
            </Drawer>
        </Box>
    );
}

export default AppDrawer;
