import React, { useState } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import {useAddFundMutation} from "../services/api.ts";
import {toast} from "react-toastify";


interface AddFundProps {
    open: boolean;
    onClose: () => void;
}

const AddFund: React.FC<AddFundProps> = ({ open, onClose}) => {
    const [amount, setAmount] = useState("");
    const [addFund,{isLoading}] = useAddFundMutation()

    const handleSubmit = async () => {
        const enteredAmount = Number(amount);
        if(enteredAmount > 0){
            try{
                await addFund({ amount: enteredAmount })
                toast.success("Add Fund Request Send SuccessFully")
                onClose();
            }catch (err){
                toast.error("SomeThing is Wrong")
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
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" mb={2}>
                    Enter Amount to Add
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
                    disabled={!amount || Number(amount) <= 0 ||isLoading}
                >
                    {isLoading ? "Processing" : "Add Fund"}
                </Button>
            </Box>
        </Modal>
    );
};

export default AddFund;
