import React from "react";
import { UserAPI } from "../../api/api"

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "#686de0",
        },
    },
});

const CreateUser = () => {
    const [createUser, setCreateUser] = useState({ username: "", email: "", password: "" });
    const [userError, setUserError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const history = useNavigate();

    async function createOneUser() {
        await UserAPI.createUser(createUser);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreateUser({ ...createUser, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Func was activated");
        setUserError(validate(createUser));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(userError).length === 0 && isSubmit) {
            createOneUser();
            setCreateUser({username: "", email: "", password: ""});
            // history("/")
        }
    }, [userError]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password must contains minimum 8 characters";
        }
        return errors;
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#686de0" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    autoFocus
                                    name="username"
                                    type="text"
                                    onChange={handleChange}
                                    value={createUser.username}
                                />
                                <Typography
                                    sx={{ color: "red" }}
                                    variant="body2"
                                >
                                    {userError.username}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    placeholder="simple@gmail.com"
                                    label="Email"
                                    name="email"
                                    type="text"
                                    onChange={handleChange}
                                    value={createUser.email}
                                />
                                <Typography
                                    sx={{ color: "red" }}
                                    variant="body2"
                                >
                                    {userError.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={createUser.password}
                                />
                                <Typography
                                    sx={{ color: "red" }}
                                    variant="body2"
                                >
                                    {userError.password}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default CreateUser;
