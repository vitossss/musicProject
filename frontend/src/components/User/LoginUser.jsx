import React from "react";
import {useState, useContext} from "react";
import {Context} from "../../index";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
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
import AccountCircle from "@mui/icons-material/AccountCircle";

const LoginUser = () => {
    const {store} = useContext(Context);
    const [loginUser, setLoginUser] = useState({email: "", password: ""});
    const [userError, setUserError] = useState({});
    const history = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginUser({...loginUser, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Func was activated");
        store.login(loginUser.email, loginUser.password)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    setLoginUser({email: "", password: ""})
                    history("/home")
                } else {
                    const obj = {}
                    const data = response.response.data
                    const keys = Object.keys(data)
                    for (const e in keys) {
                        obj[keys[e]] = data[keys[e]][0]
                    }
                    setUserError(obj)
                }
            })
    };
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
                    <AccountCircle/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                placeholder="simple@gmail.com"
                                label="Email"
                                name="email"
                                type="text"
                                onChange={handleChange}
                                value={loginUser.email}
                            />
                            <Typography
                                sx={{color: "red"}}
                                variant="body2"
                            >
                                {userError?.email}
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
                                value={loginUser.password}
                            />
                            <Typography
                                sx={{color: "red"}}
                                variant="body2"
                            >
                                {userError?.password}
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
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/auth/register">
                                Sign up.
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default observer(LoginUser);
