import { useState } from "react";
import { Box, Button, Container, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { useGetBalanceQuery } from "../services/api.ts";
import SendMoney from "./SendNow.tsx";
import AddFund from "./AddFund.tsx";
import WithdrawFund from "./withdrawalFund.tsx";
import backgroundImage from "../assets/finance-bg.jpg";

const Home = () => {
    const { data, isLoading } = useGetBalanceQuery();
    const [openSendMoney, setOpenSendMoney] = useState(false);
    const [openAddFund, setOpenAddFund] = useState(false);
    const [withdrawFund, setWithdrawFund] = useState(false);

    if (isLoading) {
        return (
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress size={60} />
            </Container>
        );
    }
    const balance = data?.data?.balance || 0;


    return (
        <Container>
            <Box textAlign="center" py={10}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <Typography variant="h2" fontWeight={700} gutterBottom color="#1976d2">
                        Welcome to <span style={{ color: "#FFD700" }}>Paise Bhejo</span>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        The ultimate way to send, add, and withdraw money securely.
                    </Typography>
                </motion.div>
            </Box>


            <Box sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 4,
                textAlign: "center",
                py: 6,
                color: "white",
                boxShadow: 3,
            }}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                    <AccountBalanceWalletIcon sx={{ fontSize: 80, color: "#fff" }} />
                    <Typography variant="h4" fontWeight={600}>
                        Your Balance: ₹{balance}
                    </Typography>
                </motion.div>
            </Box>

            {/* Action Section */}
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
                {[{ icon: <SendIcon sx={{ fontSize: 60, color: "#1E90FF" }} />, title: "Send Money", text: "Instant and secure fund transfer.", action: () => setOpenSendMoney(true), color: "primary" },
                    { icon: <AddCircleIcon sx={{ fontSize: 60, color: "#32CD32" }} />, title: "Add Funds", text: "Top-up your wallet easily.", action: () => setOpenAddFund(true), color: "success" },
                    { icon: <MoneyOffIcon sx={{ fontSize: 60, color: "#FF4500" }} />, title: "Withdraw", text: "Withdraw your money anytime.", action: () => setWithdrawFund(true), color: "secondary" }].map((item, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Paper elevation={10} sx={{ p: 4, textAlign: "center", background: "#f9f9f9", borderRadius: 4, transition: "0.3s", '&:hover': { background: "#e3f2fd" } }}>
                                {item.icon}
                                <Typography variant="h5" fontWeight={600}>{item.title}</Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>{item.text}</Typography>
                                <Button variant="contained" color={item.color as "primary" | "secondary" | "success"} fullWidth onClick={item.action} sx={{ mt: 2, borderRadius: "20px" }}>
                                    {item.title}
                                </Button>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <SendMoney balance={balance} open={openSendMoney} onClose={() => setOpenSendMoney(false)} />
            <AddFund onClose={() => setOpenAddFund(false)} open={openAddFund} />
            <WithdrawFund onClose={() => setWithdrawFund(false)} open={withdrawFund} />
        </Container>
    );
};

export default Home;
