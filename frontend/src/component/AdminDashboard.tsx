import { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import FundingApproval from "./FundingApproval";
import TransferApproval from "./TransferApproval";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#eef2f7" }}>
            <Typography variant="h4" fontWeight={700} textAlign="center" mb={4} color="#333">
                Admin Dashboard
            </Typography>

            <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                centered
                sx={{
                    background: "#fff",
                    borderRadius: 2,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    mb: 3,
                }}
            >
                <Tab label="Funding Approvals" />
                <Tab label="Transfer Approvals" />
            </Tabs>

            {activeTab === 0 && <FundingApproval />}
            {activeTab === 1 && <TransferApproval />}
        </Box>
    );
};

export default AdminDashboard;
