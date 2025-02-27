import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Card, CardContent, TextField, type Theme, Typography, useTheme } from "@mui/material"
import { createStyles } from "@mui/styles"
import type { CSSProperties } from "react"
import { useForm } from "react-hook-form"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify";
import * as yup from "yup"
import {useLoginMutation} from "../services/api.ts";
import PasswordInput from "./PassworInput"

const validation = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(5, "Minimumn 5 chars are required")
        .max(16, "Miximumn 16 chars allowed"),
})

const useStyle = (theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 400,
            flex: 1,
            mx: "auto",
        },
        input: {
            mt: 2,
        },
        button: {
            my: 2,
        },
        link: {
            color: theme.palette.primary.main,
        },
    })

type FormData = typeof validation.__outputType

export default function LoginForm() {
    const theme = useTheme()
    const style = useStyle(theme)
    // const navigate = useNavigate();
    const [loginUser] = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(validation),
    })

    const onSubmit = async (data: FormData) => {
       try{
           await loginUser(data).unwrap();
           toast.success("User Logged in SuccessFully")
       }catch (err:any){
           const validationErrors = err.data;
           toast.error(validationErrors.message ?? "Something went Form");
       }
    }

    return (
        <Box height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center">
            <Card variant="outlined" sx={style.root}>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Box>
                            <Typography variant="h4" component="h1">
                                <b>Login</b>
                            </Typography>
                        </Box>
                        <TextField
                            sx={style.input}
                            fullWidth
                            type="text"
                            placeholder="Email"
                            label="Email"
                            {...register("email")}
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                        />
                        <PasswordInput
                            sx={style.input}
                            fullWidth
                            type="password"
                            placeholder="Password"
                            label="Password"
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            {...register("password")}
                        />
                        <Button type="submit" sx={style.button} variant="contained" fullWidth disabled={!isValid}>
                            Login
                        </Button>
                        <Typography>
                            Don't have an account?{" "}
                            <NavLink style={style.link as CSSProperties} to="/signup">
                                Sign up
                            </NavLink>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

