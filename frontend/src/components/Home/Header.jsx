import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

import {
    AppBar,
    Box, Grid,
    IconButton, Menu, MenuItem, TextField,
    Typography
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    DashboardBox,
    Search,
    SearchIconWrapper,
    StyledButton,
    StyledInputBase,
    StyledToolbar,
    UserBox
} from './CustomStyles';
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";

const Header = () => {
    const {store} = useContext(Context);

    const handleLogout = (popupState) => {
        store.logout()
        // eslint-disable-next-line no-unused-expressions
        popupState.close
    }

    return (
        <>
            {store.isAuth
                ? (
                    <AppBar
                        position="static"
                        sx={{bgcolor: "#000"}}
                    >
                        <StyledToolbar>
                            <IconButton
                                size="medium"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{mr: 2}}
                            >
                                <ArrowForwardIcon/>
                            </IconButton>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{"aria-label": "search"}}
                                />
                            </Search>
                            <UserBox>
                                <Typography
                                    variant="body1"
                                    sx={{marginRight: "5px"}}
                                >
                                    {/*{store.user.username}*/}
                                </Typography>
                                <AccountCircleIcon/>
                                <PopupState variant="popover" popupId="popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <IconButton
                                                color="inherit"
                                                size="small"
                                                {...bindTrigger(popupState)}
                                            >
                                                <ArrowDropDownIcon/>
                                            </IconButton>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </UserBox>
                        </StyledToolbar>
                    </AppBar>
                )
                : (
                    <DashboardBox
                        component="div"
                        sx={{bgcolor: "rgba(0, 0, 0, 0.9)"}}
                    >
                        <Box
                            component="div"
                            sx={{width: 300}}
                        >
                            <Grid container>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            color: "#fff",
                                            textAlign: "center",
                                            padding: 2
                                    }}
                                        variant="h2"
                                    >
                                        Welcome!
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#fff",
                                            textAlign: "center",
                                            mb: 6
                                        }}
                                        variant="h5"
                                    >
                                        Please login/register
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link to="/auth/register">
                                        <StyledButton
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            Register
                                        </StyledButton>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/auth/login">
                                        <StyledButton
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            Login
                                        </StyledButton>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </DashboardBox>
                )
            }
        </>
    );
};

export default observer(Header);
