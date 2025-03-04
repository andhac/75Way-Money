import { Box, Button, CircularProgress, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useGetPendingFundTransactionQuery, useApproveFundingMutation } from "../services/api.ts";

const FundingApproval = () => {
    const { data, isLoading } = useGetPendingFundTransactionQuery();
    const [approveFund] = useApproveFundingMutation();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        if (data?.data) {
            setTransactions(data.data);
        }
    }, [data]);

    const handleUpdateStatus = async (transactionId:string) => {
        await approveFund(transactionId);
        toast.success(`Funding Approved`);
        setTransactions((prev) => prev.filter((transaction:Transaction) => transaction._id !== transactionId));
    };

    if (isLoading) {
        return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
    }

    return (
        <Box>
            {transactions.length === 0 ? (
                <Typography textAlign="center" color="#666">No pending funding requests</Typography>
            ) : (
                <Grid container spacing={3} justifyContent="center">
                    {transactions.map((transaction) => (
                        <Grid item xs={12} sm={6} md={4} key={transaction._id}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Card sx={{ borderRadius: 3, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
                                    <CardContent>
                                        <Typography fontWeight={600} color="#444">FUNDING</Typography>
                                        <Typography color="#777"><strong>Amount:</strong> {transaction.amount} {transaction.currency}</Typography>
                                        <Typography color="#777"><strong>Status:</strong> {transaction.status}</Typography>
                                        <Typography color="#777"><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</Typography>
                                        <Box display="flex" justifyContent="space-between" mt={3}>
                                            <motion.div whileTap={{ scale: 0.9 }}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleUpdateStatus(transaction._id)}
                                                    sx={{ borderRadius: 2 }}
                                                >
                                                    Approve
                                                </Button>
                                            </motion.div>
                                            <motion.div whileTap={{ scale: 0.9 }}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    sx={{ borderRadius: 2 }}
                                                >
                                                    Reject
                                                </Button>
                                            </motion.div>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default FundingApproval;
