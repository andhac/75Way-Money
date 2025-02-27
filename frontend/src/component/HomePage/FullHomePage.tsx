import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,

    Grid,

    Paper,

    Typography,
} from "@mui/material"
import {
    AccountBalanceWallet,
    Add,
    ArrowUpward,
    ArrowDownward,

    History,

    Person,
    Settings,

} from "@mui/icons-material"
import {useState} from "react";

const FullHomePage = () => {
    const [balance] = useState(1250.75)
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            <Grid container spacing={3}>
                {/* Balance Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                Your Balance
                            </Typography>
                            <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                                ${balance.toFixed(2)}
                            </Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary" startIcon={<Add />} fullWidth size="small">
                                        Add
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="secondary" startIcon={<ArrowUpward />} fullWidth size="small">
                                        Send
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="outlined" startIcon={<ArrowDownward />} fullWidth size="small">
                                        Withdraw
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Quick Stats */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography variant="body2" color="text.secondary">
                                    Pending Transfers
                                </Typography>
                                <Typography variant="h5" color="warning.main">
                                    1
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 2 }}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Quick Transfer
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={8}>
                                    <Typography variant="body2" color="text.secondary">
                                        Recent Recipients
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                        <Avatar>J</Avatar>
                                        <Avatar>S</Avatar>
                                        <Avatar>M</Avatar>
                                        <Avatar>+</Avatar>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button variant="contained" fullWidth>
                                        New Transfer
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>

                {/* Quick Actions and Information Cards */}
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        {/* Quick Actions */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Quick Actions
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<Add />}
                                            sx={{
                                                p: 2,
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography variant="body1">Add Money</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Instant deposit to wallet
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<ArrowUpward />}
                                            sx={{
                                                p: 2,
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography variant="body1">Send Money</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Transfer to another user
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<Person />}
                                            sx={{
                                                p: 2,
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography variant="body1">Add Contact</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Save new recipient
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<ArrowDownward />}
                                            sx={{
                                                p: 2,
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography variant="body1">Withdraw</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Transfer to bank
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Information Cards */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Account Information
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                border: "1px solid",
                                                borderColor: "divider",
                                                borderRadius: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    bgcolor: "primary.main",
                                                    color: "white",
                                                    p: 1,
                                                    borderRadius: 1,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <AccountBalanceWallet />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Account Status
                                                </Typography>
                                                <Typography variant="body1" color="success.main">
                                                    Active
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                border: "1px solid",
                                                borderColor: "divider",
                                                borderRadius: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    bgcolor: "secondary.main",
                                                    color: "white",
                                                    p: 1,
                                                    borderRadius: 1,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Settings />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Transfer Limit
                                                </Typography>
                                                <Typography variant="body1">$10,000 / day</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                border: "1px solid",
                                                borderColor: "divider",
                                                borderRadius: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    bgcolor: "warning.main",
                                                    color: "white",
                                                    p: 1,
                                                    borderRadius: 1,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <History />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Next Scheduled Transfer
                                                </Typography>
                                                <Typography variant="body1">No scheduled transfers</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
export default FullHomePage