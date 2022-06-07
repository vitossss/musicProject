import React from "react";
import {useState, useContext} from "react";
import {Context} from "../../index";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {observer} from "mobx-react-lite";

const CreateUser = () => {
    const [newUser, setNewUser] = useState({username: "", email: "", password: ""});
    const [error, setError] = useState({})
    const {store} = useContext(Context);
    const history = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewUser({...newUser, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Func was activated");
        store.register(newUser.username, newUser.email, newUser.password)
            .then((response) => {
                if (response.status === 201) {
                    setNewUser({username: "", email: "", password: ""})
                    history("/")
                } else {
                    const obj = {}
                    const data = response.response.data
                    const keys = Object.keys(data)
                    for (const e in keys){
                        obj[keys[e]] = data[keys[e]][0]
                    }
                    setError(obj)
                }
            })
    };

    // const validate = (values) => {
    //     const errors = {};
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     if (!values.username) {
    //         errors.username = "Username is required!";
    //     }
    //     if (!values.email) {
    //         errors.email = "Email is required!";
    //     } else if (!regex.test(values.email)) {
    //         errors.email = "This is not a valid email format!";
    //     }
    //     if (!values.password) {
    //         errors.password = "Password is required";
    //     } else if (values.password.length < 8) {
    //         errors.password = "Password must contains minimum 8 characters";
    //     }
    //     return errors;
    // };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{m: 1, backgroundColor: '#686de0'}}>
                    <AddCircleIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" noValidate sx={{mt: 3}}>
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
                                value={newUser.username}
                            />
                            <Typography
                                sx={{color: "red"}}
                                variant="body2"
                            >
                                {error?.username}
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
                                value={newUser.email}
                            />
                            <Typography
                                sx={{color: "red"}}
                                variant="body2"
                            >
                                {error?.email}
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
                                value={newUser.password}
                            />
                            <Typography
                                sx={{color: "red"}}
                                variant="body2"
                            >
                                {error?.password}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/auth/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default observer(CreateUser);
