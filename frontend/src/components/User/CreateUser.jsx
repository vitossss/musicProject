import React from "react";
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

import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: '#686de0'
        }
    }
});


const CreateUser = (user, setUser, createOneUser, userError, setUserError, isSubmit, setIsSubmit) => {

    const history = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    }

    const handleCreate = (e) => {
        e.preventDefault();
        console.log("Created!")
        // createOneUser();
        // setUser({username: '', email: '', password: ''})
        setUserError(validate(user));
        setIsSubmit(true);
    }

    // useEffect(() => {
    //     console.log(userError)
    //     if (Object.keys(userError).length === 0 && isSubmit) {
    //         console.log(user)
    //     }
    // }, [userError])

    const validate = (values) => {
        const errors = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!values.username) {
            errors.username = "Username is required"
        }
        if (!values.email) {
            errors.email = "Email is required"
        }
        if (!values.password) {
            errors.password = "Password is required"
        }
        return errors;
    }

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
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    autoFocus
                                    name="username"
                                    onChange={handleChange}
                                    value={user.username}
                                />
                                {/* <Typography variant="body1" children="span">{userError.username}</Typography> */}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    placeholder="simple@gmail.com"
                                    label="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={user.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={user.password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleCreate}
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
