import {
    Button,
    Grid,
    Paper,
    Typography,
} from "@mui/material"
import {
    Add,
    ArrowUpward,
    ArrowDownward,
    Person,
} from "@mui/icons-material"
import { JSX } from "react"


function QuickAction(): JSX.Element {

    return (
        <Grid item xs={12}>
            <Grid container spacing={3}>
                {/* Quick Actions */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Quick Actions
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<Add/>}
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
                                    startIcon={<ArrowUpward/>}
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
                                    startIcon={<Person/>}
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
                                    startIcon={<ArrowDownward/>}
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
            </Grid>
        </Grid>
    )
}

export default QuickAction

