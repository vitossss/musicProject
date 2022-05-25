import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

import {
    AppBar,
    Box,
    IconButton, Menu, MenuItem,
    Typography
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Search, SearchIconWrapper, StyledButton, StyledInputBase, StyledToolbar, UserBox} from './CustomStyles';
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";

const Header = () => {
    const {store} = useContext(Context);

    const handleLogout = (popupState) => {
        store.logout()
        // eslint-disable-next-line no-unused-expressions
        popupState.close
    }

    return (
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
                {store.isAuth
                    ? (
                        <UserBox>
                            <Typography
                                variant="body1"
                                sx={{marginRight: "5px"}}
                            >
                                {store.user.username}
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
                    )
                    : <Box sx={{display: {xs: "none", md: "flex"}}}>
                        <Link to="/auth/registration">
                            <StyledButton
                                variant="outlined"
                                color="secondary"
                                sx={{mr: 2}}
                            >
                                Register
                            </StyledButton>
                        </Link>
                        <Link to="/auth/login">
                            <StyledButton
                                variant="outlined"
                                color="secondary"
                            >
                                Login
                            </StyledButton>
                        </Link>
                    </Box>
                }
            </StyledToolbar>
        </AppBar>
    );
};

export default observer(Header);
