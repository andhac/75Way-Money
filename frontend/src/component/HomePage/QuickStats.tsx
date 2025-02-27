import {Avatar, Box, Button, Grid, Paper, Typography} from "@mui/material";


function QuickStats () {
    return (
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
    )
}

export default QuickStats;