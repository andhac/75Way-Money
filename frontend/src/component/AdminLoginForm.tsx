import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, CardContent, TextField, Typography, useTheme, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import {useAdminLoginMutation} from "../services/api.ts";
import PasswordInput from "./PassworInput.tsx";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";

const validation = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").min(5, "Minimum 5 characters").max(16, "Maximum 16 characters"),
});

type FormData = typeof validation.__outputType;

export default function AdminLoginForm() {
    const navigate = useNavigate()
    const theme = useTheme();
    const [loginUser, { isLoading }] = useAdminLoginMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        defaultValues: { email: "", password: "" },
        resolver: yupResolver(validation),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await loginUser(data).unwrap();
            toast.success("Admin Logged in Successfully");
            navigate("/admin-paise/dashboard");
        } catch (err: any) {
            toast.error(err.data?.message ?? "Login failed");
        }
    };

    return (
        <Box height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center" bgcolor={theme.palette.background.default}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card sx={{ maxWidth: 400, p: 3, borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>Admin Login</Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                margin="normal"
                            />
                            <PasswordInput
                                fullWidth
                                label="Password"
                                variant="outlined"
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={!isValid || isLoading}>
                                {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </motion.div>
        </Box>
    );
}
