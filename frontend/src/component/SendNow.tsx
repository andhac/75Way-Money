import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Paper,
    Avatar,
    CircularProgress
} from "@mui/material";
import { useGetUserByNumberQuery, useSendMoneyMutation } from "../services/api.ts";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface SendMoneyProps {
    balance: number;
    open: boolean;
    onClose: () => void;
}

const SendMoney: React.FC<SendMoneyProps> = ({ balance, open, onClose }) => {
    const [phone, setPhone] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [amount, setAmount] = useState("");
    const [fetchUser, setFetchUser] = useState(false);

    const [sendMoney, { isLoading }] = useSendMoneyMutation();
    const { data } = useGetUserByNumberQuery(phone, { skip: !fetchUser });

    const handlePhoneSubmit = () => {
        setFetchUser(true);
    };

    const handleSendMoney = async () => {
        if (!selectedUser || !amount) return;
        try {
            await sendMoney({ amount: Number(amount), receiverId: selectedUser._id });
            toast.success("Money Sent Successfully");
            handleClose();
        } catch (error) {
            toast.error("Error in sending money");
        }
    };

    const handleClose = () => {
        onClose();
        setPhone("");
        setSelectedUser(null);
        setAmount("");
        setFetchUser(false);
    };

    useEffect(() => {
        if (data) {
            setSelectedUser(data?.data);
            setFetchUser(false);
        }
    }, [data]);

    return (
        <Modal open={open} onClose={handleClose}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 420,
                        bgcolor: "background.paper",
                        p: 4,
                        boxShadow: 24,
                        borderRadius: 3,
                        textAlign: "center"
                    }}
                >
                    {!selectedUser ? (
                        <>
                            <Typography variant="h5" mb={2} fontWeight={600}>
                                Enter Recipient's Phone Number
                            </Typography>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handlePhoneSubmit}
                                disabled={!phone}
                            >
                                Find User
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" mb={2} fontWeight={600}>
                                Sending to:
                            </Typography>
                            <Paper
                                elevation={4}
                                sx={{ display: "flex", alignItems: "center", p: 2, mb: 2, borderRadius: 2 }}
                            >
                                <Avatar sx={{ width: 56, height: 56, backgroundColor: "#1976d2" }}>
                                    {selectedUser?.fullName?.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box ml={2}>
                                    <Typography fontWeight={600}>{selectedUser?.fullName}</Typography>
                                    <Typography color="textSecondary">{selectedUser.phone}</Typography>
                                </Box>
                            </Paper>
                            <TextField
                                fullWidth
                                label="Amount"
                                variant="outlined"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                onClick={handleSendMoney}
                                disabled={Number(amount) > balance || !amount || isLoading}
                            >
                                {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Send Money"}
                            </Button>
                        </>
                    )}
                </Box>
            </motion.div>
        </Modal>
    );
};

export default SendMoney;
