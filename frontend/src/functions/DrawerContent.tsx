import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {
    AccountBalanceWallet,
    Add,
    ArrowDownward,
    ArrowUpward,
    Dashboard,
    Logout,
    Person,
    Settings
} from "@mui/icons-material";

interface DrawerContentProps {
  onClick: () => void;
}
const drawerContent = ({onClick}:DrawerContentProps) => {
    return (
        <Box sx={{width: 250}} role="presentation" onClick={onClick}>
            <Box sx={{p: 2, display: "flex", alignItems: "center", gap: 1}}>
                <AccountBalanceWallet/>
                <Typography variant="h6">Money Transfer</Typography>
            </Box>
            <Divider/>
            <List> <ListItem disablePadding>
                <ListItemButton selected>
                    <ListItemIcon>
                        <Dashboard/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItemButton>
            </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Add/>
                        </ListItemIcon>
                        <ListItemText primary="Add Funds"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ArrowUpward/>
                        </ListItemIcon>
                        <ListItemText primary="Transfer"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ArrowDownward/>
                        </ListItemIcon>
                        <ListItemText primary="Withdraw"/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Person/>
                        </ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary="Settings"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Logout/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}


export default drawerContent;