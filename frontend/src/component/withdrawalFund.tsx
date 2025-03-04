import React, { useState } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { useWithdrawFundMutation } from "../services/api";
import { toast } from "react-toastify";
interface WithdrawFundProps {
    open: boolean;
    onClose: () => void;
}
const WithdrawFund: React.FC<WithdrawFundProps> = ({ open, onClose }) => {
    const [amount, setAmount] = useState("");
    const [withdrawFund, { isLoading }] = useWithdrawFundMutation();
    const handleSubmit = async () => {
        const enteredAmount = Number(amount);
        if (enteredAmount > 0) {
            try {
                await withdrawFund({ amount: enteredAmount }).unwrap();
                toast.success("Withdraw Fund Successfully");
                onClose();
                window.location.reload();
            } catch (err) {
                toast.error("Something went wrong");
            }
        }
    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 350,
                    bgcolor: "background.paper",
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Enter Amount to Withdraw
                </Typography>
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
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={!amount || Number(amount) <= 0 || isLoading}
                >
                    {isLoading ? "Processing" : "Withdraw Fund"}
                </Button>
            </Box>
        </Modal>
    );
};
export default WithdrawFund;






